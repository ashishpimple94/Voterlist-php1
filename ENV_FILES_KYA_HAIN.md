# .env Files - Complete Guide (Hindi/English)

## 🤔 .env Files क्या हैं? (What are .env files?)

`.env` files आपके **secret passwords और configuration settings** store करने के लिए होती हैं।

## 💡 Real Example (आसान भाषा में)

### ❌ बिना .env file (गलत तरीका):

```php
<?php
// Password directly code mein - BAD! ❌
$password = "1234";
$db_host = "localhost";
?>
```

**Problem:**
- Password code mein visible होता है
- Git में commit होने पर सबको दिखेगा
- Production में change करना मुश्किल
- Security risk

### ✅ .env file के साथ (सही तरीका):

**Step 1: `.env` file बनाएं:**
```env
DB_PASSWORD=1234
DB_HOST=localhost
```

**Step 2: Code में use करें:**
```php
<?php
require_once 'env_load.php';
$password = env('DB_PASSWORD');  // .env से लेगा
$db_host = env('DB_HOST');
?>
```

**Benefits:**
- Password code से अलग ✅
- Git में commit नहीं होता ✅
- Easy to change ✅
- Secure ✅

## 📝 .env File में क्या लिखें?

### Database Passwords:
```env
DB_PASSWORD=your_mysql_password
MONGO_PASSWORD=your_mongodb_password
```

### Connection Strings:
```env
DB_HOST=localhost
DB_USER=root
DB_NAME=voter_new
```

### API Keys (अगर हो तो):
```env
API_KEY=abc123xyz
SECRET_KEY=xyz789abc
```

## 🔒 Security - क्यों Important है?

### Problem without .env:
```
GitHub pe code push kiya
→ Password code mein hai
→ Sabko dikh gaya ❌
→ Hacker ko mil gaya ❌
→ Database hack ho gaya ❌
```

### Solution with .env:
```
.env file locally hai
→ .gitignore mein add ki
→ Git mein commit nahi hua ✅
→ Password secure ✅
→ Database safe ✅
```

## 🛠️ Kaise Use Karein? (3 Steps)

### Step 1: .env File बनाएं
```bash
cp env.example .env
```

### Step 2: अपने Values डालें
```env
DB_PASSWORD=mera_password_123
MONGO_PASSWORD=mongo_pass_456
```

### Step 3: PHP में Use करें
```php
<?php
require_once 'env_load.php';

// .env से value लेगा
$password = env('DB_PASSWORD');
?>
```

## 📋 Real Working Example

### Before (बिना .env):
```php
<?php
// Hardcoded - BAD!
$conn = new mysqli('localhost', 'root', '1234', 'voter_new');
?>
```

### After (`.env` के साथ):

**.env file:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=voter_new
```

**PHP code:**
```php
<?php
require_once 'env_load.php';

$host = env('DB_HOST', 'localhost');
$user = env('DB_USER', 'root');
$pass = env('DB_PASSWORD');  // .env से
$db = env('DB_NAME', 'voter_new');

$conn = new mysqli($host, $user, $pass, $db);
?>
```

## 🎯 कब Use करें?

### ✅ Use करें जब:
- Passwords store करना हो
- Different environments (dev/prod)
- API keys और secrets
- Configuration settings

### ❌ Use न करें जब:
- Public information (जो सबको दिखना चाहिए)
- Code dependencies

## 🔍 Common Questions

### Q1: .env file कहाँ होनी चाहिए?
**Answer:** Project की root directory में, `composer.json` के साथ।

### Q2: .env को Git में commit करना चाहिए?
**Answer:** ❌ **नहीं!** हमेशा `.gitignore` में add करें।

### Q3: .env.example क्यों है?
**Answer:** Template के लिए - दूसरों को पता चले कि कौन सी variables चाहिए।

### Q4: Production में कैसे use करें?
**Answer:** Render/Railway जैसे platforms पर Environment Variables tab में directly add करें।

## 📊 Comparison Table

| Aspect | बिना .env | .env के साथ |
|--------|-----------|-------------|
| Password Security | ❌ Code में visible | ✅ अलग file में |
| Git Safety | ❌ Commit हो जाता | ✅ Ignore होता |
| Easy to Change | ❌ Code edit करना | ✅ File edit करना |
| Multiple Environments | ❌ Code change | ✅ Different .env files |
| Team Sharing | ❌ Password share | ✅ Structure share |

## 🚀 Quick Setup (30 seconds)

```bash
# 1. File बनाएं
cp env.example .env

# 2. Edit करें
nano .env
# अपना password डालें

# 3. Use करें
# PHP files में env_load.php include करें
```

## 💻 Complete Example

**File: `.env`**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=MySecurePass123
DB_NAME=voter_new
```

**File: `db_connect.php`**
```php
<?php
require_once __DIR__ . '/env_load.php';

$host = env('DB_HOST', 'localhost');
$user = env('DB_USER', 'root');
$pass = env('DB_PASSWORD');  // ← यहाँ .env से आएगा
$db = env('DB_NAME', 'voter_new');

$conn = new mysqli($host, $user, $pass, $db);
?>
```

## ✅ Checklist

- [ ] `.env` file exists
- [ ] Passwords set correctly
- [ ] `.env` in `.gitignore`
- [ ] `env_load.php` included in PHP files
- [ ] Using `env()` function to get values

## 🎉 Summary

**.env files = Secret Storage Box** 🗝️

- Passwords secure रखने के लिए
- Code से अलग रखने के लिए  
- Easy to change के लिए
- Security के लिए

**Simple rule:** जो sensitive है, वो .env में! 🔒

