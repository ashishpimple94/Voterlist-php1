<?php
header('Content-Type: application/json');

$response = [
    'status' => 'success',
    'message' => 'API is working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION,
];

// Try to load env if exists
if (file_exists(__DIR__ . '/../env_load.php')) {
    try {
        require_once __DIR__ . '/../env_load.php';
        if (function_exists('env')) {
            $response['env_loaded'] = true;
        }
    } catch (Exception $e) {
        $response['env_error'] = $e->getMessage();
    }
}

echo json_encode($response, JSON_PRETTY_PRINT);
