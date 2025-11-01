<?php
header('Content-Type: application/json');

echo json_encode([
    'status' => 'ok',
    'timestamp' => date('Y-m-d H:i:s'),
    'service' => 'Voter API',
    'version' => '1.0'
], JSON_PRETTY_PRINT);
