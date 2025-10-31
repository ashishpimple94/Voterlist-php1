# Quick Start - Environment Variables Setup

## 🚀 3 Simple Steps

### Step 1: .env File बनाएं
```bash
cp .env.example .env
```

### Step 2: .env File में अपने Values डालें
```env
DB_PASSWORD=आपका_MySQL_पासवर्ड
MONGO_PASSWORD=आपका_MongoDB_पासवर्ड
```

### Step 3: PHP Files में Use करें
```php
<?php
require_once 'env_load.php';

$db_host = env('DB_HOST', 'localhost');
$db_user = env('DB_USER', 'root');
$db_password = env('DB_PASSWORD');
$db_name = env('DB_NAME', 'voter_new');
?>
```

## ✅ Example Files

### db_connect.php Example:
```php
<?php
require_once __DIR__ . '/env_load.php';

$servername = env('DB_HOST', 'localhost');
$username = env('DB_USER', 'root');
$password = env('DB_PASSWORD', '1234');
$dbname = env('DB_NAME', 'voter_new');

$conn = new mysqli($servername, $username, $password, $dbname);
?>
```

### MongoDB Connection Example:
```php
<?php
require_once __DIR__ . '/env_load.php';

$mongo_connection_string = env('MONGO_CONNECTION_STRING');
$mongo_password = env('MONGO_PASSWORD');

// Replace password in connection string
if ($mongo_password) {
    $mongo_connection_string = str_replace('<db_password>', $mongo_password, $mongo_connection_string);
}

$mongoClient = new MongoDB\Client($mongo_connection_string);
?>
```

## 📋 Must Update Values

1. **DB_PASSWORD** - Your MySQL password
2. **MONGO_PASSWORD** - Your MongoDB Atlas password

## 🎯 That's It!

अब आप environment variables use कर सकते हैं! 🎉

