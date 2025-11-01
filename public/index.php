<?php
// Ultra simple - no dependencies
header('Content-Type: application/json');
echo json_encode(['status' => 'ok', 'message' => 'Working!']);
exit;
