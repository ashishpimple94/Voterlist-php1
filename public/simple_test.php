<?php
/**
 * Simple Test Endpoint
 * Use this to verify deployment is working
 */

header('Content-Type: application/json');

$response = [
    'status' => 'success',
    'message' => 'API is working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION,
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'request_uri' => $_SERVER['REQUEST_URI'] ?? '/',
];

// Check if env_load.php exists
if (file_exists(__DIR__ . '/../env_load.php')) {
    require_once __DIR__ . '/../env_load.php';
    $response['env_loaded'] = true;
    
    // Check environment variables
    $response['env_check'] = [
        'DB_HOST' => env('DB_HOST') ? 'set' : 'not set',
        'DB_USER' => env('DB_USER') ? 'set' : 'not set',
        'DB_PASSWORD' => env('DB_PASSWORD') ? 'set (hidden)' : 'not set',
    ];
} else {
    $response['env_loaded'] = false;
    $response['error'] = 'env_load.php not found';
}

echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

