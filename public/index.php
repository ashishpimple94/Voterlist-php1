<?php
/**
 * Render Deployment Entry Point
 * Routes requests to appropriate API endpoints
 */

// Load environment variables
require_once __DIR__ . '/../env_load.php';

// Set error reporting based on environment
if (env('APP_DEBUG', false) === true || env('APP_DEBUG', false) === 'true') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Get the request URI
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Remove query string
$path = parse_url($requestUri, PHP_URL_PATH);
$path = trim($path, '/');

// Route to appropriate API file
$routes = [
    'fetch_voter_data' => '../fetch_voter_data.php',
    'get_voter_by_id' => '../get_voter_by_id.php',
    'upload_xlsx_to_json' => '../upload_xlsx_to_json.php',
    'fetch_voter_data_mongo' => '../fetch_voter_data_mongo.php',
];

// Default route
if (empty($path) || $path === '/') {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'Voter API is running',
        'version' => '1.0',
        'endpoints' => [
            '/fetch_voter_data' => 'GET/POST - Fetch voter data',
            '/get_voter_by_id?id=EPIC123' => 'GET - Get voter by ID',
            '/upload_xlsx_to_json' => 'POST - Upload Excel/CSV',
            '/fetch_voter_data_mongo' => 'GET/POST - Fetch voter data (MongoDB)',
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Check if route exists
$routeFound = false;
foreach ($routes as $route => $file) {
    if ($path === $route || strpos($path, $route . '/') === 0) {
        $routeFound = true;
        $filePath = __DIR__ . '/' . $file;
        
        if (file_exists($filePath)) {
            // Preserve query string
            parse_str($_SERVER['QUERY_STRING'] ?? '', $queryParams);
            foreach ($queryParams as $key => $value) {
                $_GET[$key] = $value;
            }
            
            // Include the API file
            require_once $filePath;
            exit;
        }
    }
}

// 404 Not Found
if (!$routeFound) {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Endpoint not found',
        'path' => $path,
        'available_endpoints' => array_keys($routes)
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

