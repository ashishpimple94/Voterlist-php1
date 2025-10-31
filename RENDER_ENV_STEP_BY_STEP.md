# Render Environment Variables - Step by Step Guide

## 🎯 Render Dashboard mein Add Karne ka Process

### Step 1: Render Dashboard kholo
- https://render.com pe jao
- Apne service pe click karo (voter-api)

### Step 2: Environment Variables Section
- Left sidebar mein **"Environment"** click karo
- Ya **"Environment Variables"** tab pe click karo

### Step 3: Variables Add Karo

Neeche diye gaye sab variables ko add karo:

---

## 📋 Variables List (Yeh Sab Add Karo)

### 1. MySQL Database Variables

| Variable Name | Variable Value | Notes |
|--------------|----------------|-------|
| `DB_HOST` | `localhost` | Ya apna MySQL host |
| `DB_USER` | `root` | Ya apna MySQL username |
| `DB_PASSWORD` | `[TUMHARA_PASSWORD]` | ⚠️ Apna actual password |
| `DB_NAME` | `voter_new` | Ya apna database name |

### 2. MongoDB Variables

| Variable Name | Variable Value |
|--------------|----------------|
| `MONGO_CONNECTION_STRING` | `mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0` |
| `MONGO_PASSWORD` | `[TUMHARA_MONGO_PASSWORD]` ⚠️ |
| `MONGO_DB` | `voter_db` |

### 3. Application Settings

| Variable Name | Variable Value |
|--------------|----------------|
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `PHP_VERSION` | `8.2` |

---

## 🔧 Add Karne ka Process

### Method 1: Manual Add (One by One)

1. **"Add Environment Variable"** button click karo
2. **Variable Name** field mein: `DB_HOST`
3. **Variable Value** field mein: `localhost`
4. Repeat har variable ke liye

### Method 2: Quick Copy-Paste Format

Agar "Add from .env" option hai, to yeh format use karo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tumhara_mysql_password
DB_NAME=voter_new
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=tumhara_mongodb_password
MONGO_DB=voter_db
APP_ENV=production
APP_DEBUG=false
PHP_VERSION=8.2
```

---

## ✅ Complete Variables List (Ready to Copy)

### Copy this and fill your passwords:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=[YOUR_MYSQL_PASSWORD_HERE]
DB_NAME=voter_new
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=[YOUR_MONGODB_PASSWORD_HERE]
MONGO_DB=voter_db
APP_ENV=production
APP_DEBUG=false
PHP_VERSION=8.2
```

---

## 🔐 Important Notes

### ⚠️ Password Fields:
- **DB_PASSWORD** = Apna MySQL password dalo (actual)
- **MONGO_PASSWORD** = Apna MongoDB Atlas password dalo (actual)

### ✅ Security:
- Values masked rahengi (dots se dikhengi) - Yeh normal hai
- Render secure hai, values encrypt hoti hain
- Production passwords use karo

### 📝 Tips:
- Variable names exactly same rakhna (uppercase/lowercase matter karta hai)
- Values mein quotes nahi dalna
- Spaces avoid karo values mein

---

## 🎯 Quick Reference

### Minimum Required Variables:
```
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
MONGO_CONNECTION_STRING
MONGO_PASSWORD
MONGO_DB
```

### Optional but Recommended:
```
APP_ENV=production
APP_DEBUG=false
PHP_VERSION=8.2
```

---

## ✅ Verification

Deploy ke baad check karo:
1. Logs mein database connection errors nahi aane chahiye
2. API endpoints work karne chahiye
3. Health check pass hona chahiye

---

## 🆘 Troubleshooting

### Problem: Database connection failed
- Check karo DB_HOST, DB_USER, DB_PASSWORD correct hai
- Verify database exists and accessible hai

### Problem: MongoDB connection failed  
- MONGO_PASSWORD correct hai kya check karo
- MongoDB Atlas mein IP whitelist check karo (0.0.0.0/0 allow karo)

### Problem: Variables not working
- Variable names exactly match karo (case-sensitive)
- No spaces in values
- Quotes remove karo agar hai

---

## 🎉 Done!

Jab sab variables add ho jayein:
1. Save karo
2. Service redeploy hoga automatically
3. Ya manually "Deploy" button click karo
4. 2-3 minutes wait karo
5. API live ho jayega! 🚀

