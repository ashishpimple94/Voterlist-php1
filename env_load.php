<?php
/**
 * env_load.php
 * Helper function to load environment variables from .env file
 * Use this in your PHP files to load .env variables
 */

function loadEnv($envFile = null) {
    if ($envFile === null) {
        $envFile = __DIR__ . '/.env';
    }
    
    if (!file_exists($envFile)) {
        return false;
    }
    
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Skip lines without =
        if (strpos($line, '=') === false) {
            continue;
        }
        
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        
        // Remove quotes if present
        if ((substr($value, 0, 1) === '"' && substr($value, -1) === '"') ||
            (substr($value, 0, 1) === "'" && substr($value, -1) === "'")) {
            $value = substr($value, 1, -1);
        }
        
        if (!empty($key)) {
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
    
    return true;
}

// Auto-load if .env exists
if (file_exists(__DIR__ . '/.env')) {
    loadEnv();
}

// Helper functions to get env variables with defaults
function env($key, $default = null) {
    $value = getenv($key);
    
    if ($value === false) {
        $value = $_ENV[$key] ?? $default;
    }
    
    // Convert string booleans
    if ($value === 'true' || $value === 'TRUE') {
        return true;
    }
    if ($value === 'false' || $value === 'FALSE') {
        return false;
    }
    
    return $value;
}

?>

