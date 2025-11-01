<?php
/**
 * Render Deployment Entry Point - Simplified Version
 */

header('Content-Type: application/json');

// Load environment if exists
$envFile = dirname(__DIR__) . '/env_load.php';
if (file_exists($envFile)) {
    require_once $envFile;
}

// Get request path
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = trim(parse_url($requestUri, PHP_URL_PATH), '/');

// Simple routing
if (empty($path) || $path === '/') {
    echo json_encode([
        'status' => 'success',
        'message' => 'Voter API is running',
        'version' => '1.0',
        'endpoints' => ['/', '/health', '/simple_test']
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Route to health
if ($path === 'health' || $path === 'health.php') {
    require_once __DIR__ . '/health.php';
    exit;
}

// Route to simple_test
if ($path === 'simple_test' || $path === 'simple_test.php') {
    require_once __DIR__ . '/simple_test.php';
    exit;
}

// 404
http_response_code(404);
echo json_encode([
    'status' => 'error',
    'message' => 'Endpoint not found',
    'path' => $path
], JSON_UNESCAPED_UNICODE);
