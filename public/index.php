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
    'health' => 'health.php',
    'simple_test' => 'simple_test.php',
];

// Default route
if (empty($path) || $path === '/') {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'Voter API is running',
        'version' => '1.0',
        'endpoints' => [
            '/' => 'GET - API status',
            '/health' => 'GET - Health check',
            '/simple_test' => 'GET - Simple test endpoint',
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Check if route exists
$routeFound = false;
foreach ($routes as $route => $file) {
    if ($path === $route || strpos($path, $route . '/') === 0) {
        $routeFound = true;
        // Routes are in same directory as index.php
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

