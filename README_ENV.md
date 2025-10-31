# Environment Variables - Quick Guide

## 🎯 क्या करना है? (What to Do)

### Step 1: .env File बनाएं
```bash
cp env.example .env
```

### Step 2: .env में अपने Values डालें
```env
DB_PASSWORD=आपका_पासवर्ड
MONGO_PASSWORD=आपका_पासवर्ड
```

### Step 3: PHP में Use करें
```php
require_once 'env_load.php';
$db_host = env('DB_HOST');
```

## 📝 Important Variables

| Variable | क्या है | Example |
|----------|---------|---------|
| `DB_PASSWORD` | MySQL password | `1234` |
| `MONGO_PASSWORD` | MongoDB password | `your_pass` |
| `DB_NAME` | Database name | `voter_new` |
| `DB_HOST` | MySQL host | `localhost` |

## ✅ Complete Example

### 1. Create .env file:
```bash
cp env.example .env
```

### 2. Edit .env and add your passwords:
```
DB_PASSWORD=MySecurePassword
MONGO_PASSWORD=MongoSecurePass
```

### 3. In PHP code:
```php
<?php
require_once 'env_load.php';

// MySQL
$db_host = env('DB_HOST', 'localhost');
$db_pass = env('DB_PASSWORD');

// MongoDB  
$mongo_pass = env('MONGO_PASSWORD');
$mongo_conn = env('MONGO_CONNECTION_STRING');
?>
```

## 🔒 Security

- ✅ `.env` file को Git में commit न करें
- ✅ Strong passwords use करें
- ✅ `.env` file को share न करें

## 🆘 Help

अधिक जानकारी के लिए `ENV_SETUP_GUIDE.md` देखें।

