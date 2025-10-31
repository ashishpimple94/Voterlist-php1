# Environment Variables Setup Guide (Hindi/English)

## 🔧 Environment Variables क्या हैं?

Environment Variables आपके application के configuration settings होते हैं जो code में hardcode करने के बजाय files में store किए जाते हैं।

## 📋 Setup Steps (कैसे Setup करें)

### Step 1: .env File बनाएं

```bash
# .env.example से copy करें
cp .env.example .env
```

### Step 2: .env File को Edit करें

`.env` file खोलें और अपने actual values डालें:

```env
# MySQL Database
DB_HOST=localhost          # आपका MySQL host
DB_USER=root              # MySQL username
DB_PASSWORD=1234          # MySQL password (अपना password डालें)
DB_NAME=voter_new         # Database name

# MongoDB Atlas
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=your_actual_password  # यहाँ अपना actual password डालें
MONGO_DB=voter_db
```

### Step 3: Values Update करें

**Important Values जो आपको change करने हैं:**

1. **MySQL Password:**
   ```env
   DB_PASSWORD=आपका_MySQL_पासवर्ड
   ```

2. **MongoDB Password:**
   ```env
   MONGO_PASSWORD=आपका_MongoDB_पासवर्ड
   ```

3. **Database Names** (अगर चाहें):
   ```env
   DB_NAME=voter_new
   MONGO_DB=voter_db
   ```

## 🚨 Security Important Points

### ✅ DO (करें):
- `.env` file को **कभी commit न करें** Git में
- Strong passwords use करें
- Production में different passwords use करें

### ❌ DON'T (न करें):
- `.env` file को public repository में push न करें
- Weak passwords use न करें
- `.env` file को share न करें

## 📝 Environment Variables List

### Database Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL host address | `localhost` या `mysql` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `your_password` |
| `DB_NAME` | MySQL database name | `voter_new` |

### MongoDB Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_CONNECTION_STRING` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster...` |
| `MONGO_PASSWORD` | MongoDB password | `your_password` |
| `MONGO_DB` | MongoDB database name | `voter_db` |

### Server Ports

| Variable | Description | Default |
|----------|-------------|---------|
| `HTTP_PORT` | Web server port | `8080` |
| `PHPMYADMIN_PORT` | phpMyAdmin port | `8081` |
| `MONGO_EXPRESS_PORT` | Mongo Express port | `8082` |

## 🔍 How to Use in PHP Code

### Example: db_connect.php में

```php
<?php
// .env file से variables read करें
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_user = getenv('DB_USER') ?: 'root';
$db_password = getenv('DB_PASSWORD') ?: '';
$db_name = getenv('DB_NAME') ?: 'voter_new';

// Connection बनाएं
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);
?>
```

## 🐳 Docker में Environment Variables

### docker-compose.yml में:

```yaml
environment:
  - DB_HOST=${DB_HOST:-localhost}
  - DB_USER=${DB_USER:-root}
  - DB_PASSWORD=${DB_PASSWORD:-}
  - DB_NAME=${DB_NAME:-voter_new}
```

यह `.env` file से automatically values लेगा।

## ✅ Testing (कैसे Check करें)

### 1. Check करें कि .env file exists:
```bash
ls -la .env
```

### 2. Check करें values:
```bash
# Linux/Mac
cat .env

# Windows
type .env
```

### 3. PHP में test करें:
```php
<?php
echo "DB Host: " . getenv('DB_HOST') . "\n";
echo "DB User: " . getenv('DB_USER') . "\n";
?>
```

## 🆘 Troubleshooting

### Problem: Variables नहीं मिल रहे
**Solution:** 
- `.env` file exist करती है कि नहीं check करें
- `.env` file में syntax correct है कि नहीं check करें
- File में spaces या quotes की problem check करें

### Problem: Password काम नहीं कर रहा
**Solution:**
- Password में special characters हैं तो quotes में रखें
- Password में spaces नहीं होने चाहिए
- MongoDB Atlas password URL encoded होना चाहिए

### Problem: MongoDB connection fail हो रहा है
**Solution:**
- `MONGO_PASSWORD` correctly set है कि नहीं check करें
- Connection string में `<db_password>` properly replace हो रहा है कि नहीं check करें
- Network/Internet connection check करें

## 📚 Quick Reference

### Quick Setup Commands:

```bash
# 1. .env file बनाएं
cp .env.example .env

# 2. Edit करें
nano .env
# या
vim .env
# या कोई भी text editor

# 3. Values update करें और save करें

# 4. Test करें
php -r "echo getenv('DB_HOST');"
```

## 💡 Tips

1. **Development vs Production:**
   - Development: `APP_DEBUG=true`
   - Production: `APP_DEBUG=false`

2. **Different Environments:**
   - `.env.development`
   - `.env.production`
   - `.env.local`

3. **Backup:**
   - `.env` file का backup रखें (secure location में)
   - Production passwords को safely store करें

---

**Note:** `.env` file को `.gitignore` में add करना ensure करें ताकि Git में accidentally commit न हो जाए।

