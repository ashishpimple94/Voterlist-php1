# 🚨 Quick Deployment Fix

## Problem: Deployment Nahi Ho Raha?

### ✅ Immediate Fix Steps:

## Step 1: Check Render Dashboard

1. **Service Status:**
   - Render Dashboard → Your Service
   - Status kya hai? (Building, Live, Error?)

2. **Logs Check Karo:**
   - Click "Logs" tab
   - Build Logs dekho - kya error aaya?
   - Runtime Logs dekho - service start hui?

---

## Step 2: Common Fixes

### Fix A: Build Command Issue

Render Dashboard → Settings → Build Command:
```
composer install --no-dev --optimize-autoloader
```

Ya simpler:
```
composer install --no-dev
```

### Fix B: Start Command Issue

Render Dashboard → Settings → Start Command:
```
php -S 0.0.0.0:$PORT -t public
```

Ya try this:
```
cd public && php -S 0.0.0.0:$PORT
```

### Fix C: MongoDB Extension Issue (Common!)

Render free tier mein MongoDB extension nahi milta.

**Temporary Fix:** 
`composer.json` se MongoDB remove karo:

```json
{
  "require": {
    "php": "^8.0",
    "phpoffice/phpspreadsheet": "^1.29"
  }
}
```

**Note:** MongoDB code comment out kar do temporarily.

---

## Step 3: Test Simple Deployment

### Minimal Test Setup:

**File: `public/index.php`**
```php
<?php
echo json_encode(['status' => 'ok', 'message' => 'Working!']);
```

### Deploy karo:
1. Simple file se start karo
2. Agar work kare, phir gradually features add karo

---

## Step 4: Verify Files

Ensure these exist:
```
✅ composer.json
✅ public/index.php
✅ render.yaml (optional)
```

---

## Step 5: Check Environment Variables

Render Dashboard → Environment:

Minimum required:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=voter_new
```

---

## 🔍 Debugging Commands

### Check Build Logs:
1. Render Dashboard → Logs
2. "Build Logs" tab
3. Error message copy karo

### Check Runtime:
1. "Runtime Logs" tab  
2. Service started message hai?
3. PHP errors?

---

## 🎯 Quick Checklist

- [ ] GitHub pe code pushed?
- [ ] Render service "Web Service" type?
- [ ] Repository connected correctly?
- [ ] Build command correct?
- [ ] Start command correct?
- [ ] Environment variables added?
- [ ] Logs check kiye?

---

## 🆘 Still Not Working?

### Share Ye Details:

1. **Build Logs Screenshot** - last 20-30 lines
2. **Runtime Logs Screenshot** - kya error dikha raha hai?
3. **Settings Screenshot** - Build/Start commands
4. **Error Message** - exact text

### Common Error Messages:

**Error: "composer: command not found"**
→ Solution: Render PHP runtime automatically provides composer

**Error: "Port already in use"**
→ Solution: Use `$PORT` variable in start command

**Error: "File not found"**
→ Solution: Check file paths in index.php

**Error: "MongoDB extension not loaded"**
→ Solution: Remove MongoDB from composer.json temporarily

---

## ✅ Working Configuration

### render.yaml (Minimal):
```yaml
services:
  - type: web
    name: voter-api
    runtime: php
    plan: free
    buildCommand: composer install --no-dev
    startCommand: php -S 0.0.0.0:$PORT -t public
```

### public/index.php (Simple):
```php
<?php
require_once __DIR__ . '/../env_load.php';

if ($_SERVER['REQUEST_URI'] === '/') {
    echo json_encode(['status' => 'ok']);
    exit;
}

// Add your routing here
```

---

**Quick Test:**
Deploy ke baad visit:
```
https://your-service.onrender.com/simple_test.php
```

Yeh simple response dega - verify karo ki basic setup work kar raha hai.

