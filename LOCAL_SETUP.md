# 🚀 Local Setup Guide - Project Kaise Chalaye

## 📋 Prerequisites (Pehle yeh chahiye)

1. **Docker & Docker Compose** (Recommended method)
   - Download: https://www.docker.com/products/docker-desktop
   - Install karke verify karo: `docker --version` aur `docker-compose --version`

2. **Ya phir Manual Setup:**
   - PHP 8.0+ (`php --version`)
   - Composer (`composer --version`)
   - MySQL (agar MySQL use karna hai)
   - MongoDB (local ya Atlas)

---

## 🎯 Method 1: Docker se Chalana (Easiest - Recommended)

### Step 1: .env File Setup

`.env` file already bana di hai. Ab update karo:

```bash
# .env file edit karo
nano .env
# ya
code .env
```

**Important Values Update Karo:**

```env
# MySQL (agar MySQL use karein)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234          # Apna password dalo
DB_NAME=voter_new

# MongoDB Atlas (Recommended)
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=your_mongodb_password_here  # ⚠️ Apna actual password dalo
MONGO_DB=voter_db

# Server Port
HTTP_PORT=8080
```

### Step 2: Dependencies Install Karo

```bash
# Composer dependencies install karo
composer install
```

### Step 3: Docker Containers Start Karo

```bash
# Sabhi services start karo (PHP, Nginx, MongoDB)
docker-compose up -d

# Status check karo
docker-compose ps
```

### Step 4: Project Access Karo

**Browser mein kholo:**
```
http://localhost:8080
```

**Ya test endpoint:**
```
http://localhost:8080/health.php
http://localhost:8080/simple_test.php
```

---

## 🛠️ Method 2: Manual Setup (Docker ke bina)

### Step 1: PHP Built-in Server

```bash
# Project root directory mein jao
cd /Users/ashishpimple/Desktop/voter_api_project

# PHP server start karo
php -S localhost:8080 -t public
```

**Ya phir Nginx/Apache configure karo:**
- Document root: `/Users/ashishpimple/Desktop/voter_api_project/public`
- Port: `8080`

### Step 2: Dependencies Install Karo

```bash
composer install
```

### Step 3: MongoDB Setup

**Option A: MongoDB Atlas (Cloud - Recommended)**
- `.env` file mein `MONGO_CONNECTION_STRING` aur `MONGO_PASSWORD` set karo
- IP whitelist mein `0.0.0.0/0` add karo (all IPs allow)

**Option B: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install mongodb
sudo systemctl start mongodb
```

`.env` file mein update karo:
```env
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USER=
MONGO_PASSWORD=
MONGO_DB=voter_db
```

### Step 4: MySQL Setup (Agar MySQL use karein)

```bash
# MySQL start karo
brew services start mysql  # macOS
# ya
sudo systemctl start mysql  # Linux
```

Database create karo:
```sql
CREATE DATABASE voter_new;
```

### Step 5: Project Run Karo

```bash
# PHP server start karo
php -S localhost:8080 -t public

# Browser mein open karo
open http://localhost:8080
```

---

## ✅ Verification - Kaam Kar Raha Hai Kya?

### Test Endpoints:

1. **Health Check:**
   ```
   http://localhost:8080/health.php
   ```

2. **API Info:**
   ```
   http://localhost:8080/
   ```

3. **MongoDB Test:**
   ```
   http://localhost:8080/fetch_voter_data_mongo
   ```

---

## 🐛 Common Issues & Solutions

### Issue 1: Port Already in Use

```bash
# Port 8080 already use ho rahi hai
# Solution: .env file mein different port set karo
HTTP_PORT=8081
```

### Issue 2: MongoDB Connection Failed

**Check karo:**
- `.env` file mein `MONGO_PASSWORD` correct hai?
- MongoDB Atlas mein IP whitelist allow hai?
- Connection string mein `<db_password>` placeholder hai?

### Issue 3: Docker Containers Start Nahi Ho Raha

```bash
# Containers stop karo
docker-compose down

# Phir start karo
docker-compose up -d

# Logs check karo
docker-compose logs
```

### Issue 4: Composer Dependencies Install Fail

```bash
# Cache clear karo
composer clear-cache

# Phir install karo
composer install --no-cache
```

---

## 📝 Quick Commands Summary

### Docker Method:
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Logs dekho
docker-compose logs -f

# Restart
docker-compose restart
```

### Manual Method:
```bash
# PHP server start
php -S localhost:8080 -t public

# Dependencies install
composer install

# .env file edit
nano .env
```

---

## 🎯 Recommended Setup

**Best for Development:**
1. Docker Compose use karo (easiest)
2. MongoDB Atlas use karo (cloud - no local setup)
3. MySQL optional (agar zarurat ho)

**Production ke liye:**
- Use Render.com ya similar platform
- Environment variables properly set karo
- MongoDB Atlas connection string configure karo

---

## ✨ Success!

Agar sab kuch sahi hai to browser mein yeh dikhna chahiye:

```json
{
  "status": "success",
  "message": "Voter API is running",
  "version": "1.0",
  "endpoints": {...}
}
```

**Happy Coding! 🚀**


