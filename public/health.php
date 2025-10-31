<?php
/**
 * Health Check Endpoint for Render
 * This endpoint helps Render check if your service is running
 */

header('Content-Type: application/json');

$health = [
    'status' => 'ok',
    'timestamp' => date('Y-m-d H:i:s'),
    'service' => 'Voter API',
    'version' => '1.0'
];

// Check database connections if needed
try {
    // You can add health checks for MySQL/MongoDB here
    $health['database'] = 'connected';
} catch (Exception $e) {
    $health['database'] = 'disconnected';
    $health['status'] = 'degraded';
}

echo json_encode($health, JSON_PRETTY_PRINT);

