# Render Deployment Troubleshooting Guide

## 🚨 Common Problems & Solutions

### Problem 1: Build Failed / Composer Error

**Symptoms:**
- Build logs mein `composer` error
- "Package not found" error

**Solutions:**

#### Solution A: Update composer.json
```json
{
  "require": {
    "php": "^8.0",
    "phpoffice/phpspreadsheet": "^1.29"
  }
}
```

MongoDB extension might not work on Render free tier. Temporarily remove it:
```json
{
  "require": {
    "php": "^8.0",
    "phpoffice/phpspreadsheet": "^1.29"
  }
}
```

#### Solution B: Check Build Command
Render Dashboard → Settings → Build Command:
```bash
composer install --no-dev --optimize-autoloader || true
```

---

### Problem 2: Service Won't Start

**Symptoms:**
- Build successful but service not running
- "Failed to start" error

**Solutions:**

#### Solution A: Fix Start Command
Render Dashboard → Settings → Start Command:

**Option 1 (Recommended):**
```bash
php -S 0.0.0.0:$PORT -t public
```

**Option 2 (If Option 1 doesn't work):**
```bash
cd public && php -S 0.0.0.0:$PORT
```

**Option 3 (Alternative):**
```bash
php -S 0.0.0.0:$PORT public/index.php
```

---

### Problem 3: 404 Error / Routes Not Working

**Symptoms:**
- Service running but API endpoints return 404
- "Not Found" error

**Solutions:**

#### Solution A: Check public/index.php exists
```bash
ls -la public/index.php
```

#### Solution B: Verify file paths in index.php
Routes should point to correct locations.

---

### Problem 4: Environment Variables Not Working

**Symptoms:**
- Database connection failed
- "Undefined variable" errors

**Solutions:**

#### Solution A: Verify env_load.php works
Add this to public/index.php temporarily:
```php
require_once __DIR__ . '/../env_load.php';
var_dump(env('DB_HOST')); // Check if working
```

#### Solution B: Check Variable Names
- Exact match (case-sensitive)
- No spaces
- No quotes in values

---

### Problem 5: MongoDB Extension Missing

**Symptoms:**
- "MongoDB extension not loaded"
- Fatal error about MongoDB class

**Solution:**
Render free tier doesn't support MongoDB PHP extension.

**Option A:** Remove MongoDB code temporarily
**Option B:** Use MongoDB REST API instead
**Option C:** Upgrade to paid plan

---

## 🔧 Quick Fixes

### Fix 1: Simplified render.yaml

Update your `render.yaml`:

```yaml
services:
  - type: web
    name: voter-api
    runtime: php
    plan: free
    buildCommand: composer install --no-dev --optimize-autoloader
    startCommand: php -S 0.0.0.0:$PORT -t public
    envVars:
      - key: PHP_VERSION
        value: 8.2
```

### Fix 2: Simple public/index.php

If routing isn't working, simplify:

```php
<?php
require_once __DIR__ . '/../env_load.php';

// Simple health check
if ($_SERVER['REQUEST_URI'] === '/' || $_SERVER['REQUEST_URI'] === '') {
    echo json_encode(['status' => 'ok', 'message' => 'API Running']);
    exit;
}

// Route to files
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

// Direct file routing
$fileMap = [
    'fetch_voter_data' => __DIR__ . '/../fetch_voter_data.php',
    'get_voter_by_id' => __DIR__ . '/../get_voter_by_id.php',
];

if (isset($fileMap[$path]) && file_exists($fileMap[$path])) {
    require $fileMap[$path];
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}
```

### Fix 3: Check Logs

Render Dashboard → Logs section:
1. Check Build Logs - kya error aaya?
2. Check Runtime Logs - service start hui?

---

## ✅ Step-by-Step Debugging

### Step 1: Check Build Logs
```
Render Dashboard → Your Service → Logs → Build Logs
```
- Composer install hua?
- Any errors?

### Step 2: Check Runtime Logs
```
Render Dashboard → Your Service → Logs → Runtime Logs
```
- Service started?
- Any PHP errors?

### Step 3: Test Basic Endpoint
```
https://your-service.onrender.com/
```
Should show:
```json
{"status": "ok", "message": "API Running"}
```

### Step 4: Check Environment Variables
```
Render Dashboard → Environment
```
All variables set correctly?

---

## 🎯 Minimal Working Setup

### Minimum Files Needed:

```
voter_api_project/
├── composer.json       ✅
├── render.yaml         ✅
├── public/
│   └── index.php      ✅
├── env_load.php        ✅
└── [your API files]   ✅
```

### Minimum render.yaml:

```yaml
services:
  - type: web
    name: voter-api
    runtime: php
    plan: free
    buildCommand: composer install --no-dev
    startCommand: php -S 0.0.0.0:$PORT -t public
```

### Minimum public/index.php:

```php
<?php
echo json_encode(['status' => 'ok']);
```

---

## 🆘 Still Not Working?

### Check These:

1. **Git Repository:**
   - Code GitHub pe pushed hai?
   - Render connected to correct repo?

2. **Service Type:**
   - "Web Service" selected? (not Background Worker)

3. **Runtime:**
   - PHP selected?
   - Version: 8.2

4. **Build & Deploy:**
   - Auto-deploy enabled?
   - Manual deploy try kiya?

5. **Logs:**
   - Latest logs check kiye?
   - Error messages kya bol rahe hain?

---

## 🔗 Test Commands

### After Deployment, Test:

```bash
# Health check
curl https://your-service.onrender.com/

# API endpoint
curl https://your-service.onrender.com/fetch_voter_data
```

---

## 💡 Pro Tips

1. **Start Simple:**
   - Pehle basic "Hello World" deploy karo
   - Phir gradually features add karo

2. **Check Logs First:**
   - Always check logs before asking for help
   - Logs mein exact error dikhega

3. **Remove MongoDB (Temporary):**
   - Free tier pe MongoDB extension nahi milta
   - Pehle MySQL se deploy karo
   - Baad mein MongoDB add karo

4. **Environment Variables:**
   - Build time pe check nahi hote
   - Runtime pe available hote hain

---

## ✅ Deployment Checklist

- [ ] Code GitHub pe pushed
- [ ] Render service created (Web Service type)
- [ ] Repository connected
- [ ] Build command set correctly
- [ ] Start command set correctly
- [ ] Environment variables added
- [ ] Build logs checked (no errors)
- [ ] Runtime logs checked (service started)
- [ ] Test endpoint accessed
- [ ] API working

---

**If still stuck, share:**
1. Build logs screenshot
2. Runtime logs screenshot  
3. Error message exact text
4. What you tried already

