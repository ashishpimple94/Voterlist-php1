# Render Environment Variables - Complete List

## 📋 Copy-Paste Ready Format

Render Dashboard mein yeh sab variables add karo:

---

## Variable Name → Variable Value

| Variable Name | Variable Value |
|--------------|----------------|
| `DB_HOST` | `localhost` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | `[YOUR_MYSQL_PASSWORD]` ⚠️ |
| `DB_NAME` | `voter_new` |
| `MONGO_CONNECTION_STRING` | `mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0` |
| `MONGO_PASSWORD` | `[YOUR_MONGODB_PASSWORD]` ⚠️ |
| `MONGO_DB` | `voter_db` |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `PHP_VERSION` | `8.2` |

---

## 🔧 How to Add in Render Dashboard

1. Go to **Render Dashboard**
2. Click on your service (voter-api)
3. Click **"Environment"** in left sidebar
4. Click **"Add Environment Variable"** button
5. For each variable:
   - **Variable Name:** Left field (e.g., `DB_HOST`)
   - **Variable Value:** Right field (e.g., `localhost`)
6. Click **Save** or it auto-saves
7. Repeat for all variables

---

## 📝 Detailed Values

### MySQL Database:
```
DB_HOST = localhost
DB_USER = root
DB_PASSWORD = your_mysql_password_here
DB_NAME = voter_new
```

### MongoDB:
```
MONGO_CONNECTION_STRING = mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD = your_mongodb_password_here
MONGO_DB = voter_db
```

### Application:
```
APP_ENV = production
APP_DEBUG = false
PHP_VERSION = 8.2
```

---

## ⚠️ Important Notes

1. **Replace Passwords:**
   - `[YOUR_MYSQL_PASSWORD]` → Your actual MySQL password
   - `[YOUR_MONGODB_PASSWORD]` → Your actual MongoDB Atlas password

2. **No Quotes:**
   - Values mein quotes mat dalo
   - Just direct value: `localhost` not `"localhost"`

3. **Case Sensitive:**
   - Variable names exactly same rakhna
   - `DB_HOST` not `db_host`

4. **Spaces:**
   - Variable names mein spaces nahi
   - Values mein leading/trailing spaces avoid karo

---

## ✅ Quick Checklist

- [ ] DB_HOST added
- [ ] DB_USER added
- [ ] DB_PASSWORD added (with actual password)
- [ ] DB_NAME added
- [ ] MONGO_CONNECTION_STRING added
- [ ] MONGO_PASSWORD added (with actual password)
- [ ] MONGO_DB added
- [ ] APP_ENV added
- [ ] APP_DEBUG added
- [ ] PHP_VERSION added

---

## 🎯 Minimum Required (Must Have)

If you want to start simple, add at least these:

1. `DB_HOST` = `localhost`
2. `DB_USER` = `root`
3. `DB_PASSWORD` = `[your password]`
4. `DB_NAME` = `voter_new`

---

## 💡 Example Screenshot Format

In Render Dashboard, it will look like:

```
Environment Variables
┌─────────────────────┬─────────────────────────────┐
│ Variable Name       │ Variable Value              │
├─────────────────────┼─────────────────────────────┤
│ DB_HOST             │ localhost                   │
│ DB_USER             │ root                        │
│ DB_PASSWORD         │ ••••••••••                  │
│ DB_NAME             │ voter_new                   │
└─────────────────────┴─────────────────────────────┘
```

**Note:** Password values will show as dots (masked) - this is normal and secure.

