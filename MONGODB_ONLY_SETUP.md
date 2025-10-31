# MongoDB Only Setup - Render Environment Variables

## 🎯 Sirf MongoDB ke liye Environment Variables

MySQL ki zarurat nahi! Sirf MongoDB use karein.

---

## 📋 Required Variables (3)

### 1. MONGO_CONNECTION_STRING
```
mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
```

### 2. MONGO_PASSWORD
```
[YOUR_MONGODB_ATLAS_PASSWORD]
```

### 3. MONGO_DB
```
voter_db
```

---

## 🔧 Render Dashboard mein Add Karo:

| Variable Name | Variable Value |
|--------------|----------------|
| `MONGO_CONNECTION_STRING` | `mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0` |
| `MONGO_PASSWORD` | `[YOUR_ACTUAL_PASSWORD]` ⚠️ |
| `MONGO_DB` | `voter_db` |

---

## ✅ Step by Step:

1. **Render Dashboard** → Your Service
2. **Environment** section click
3. **"Add Environment Variable"** button
4. Add these 3 variables one by one:

**Variable 1:**
- Name: `MONGO_CONNECTION_STRING`
- Value: `mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0`

**Variable 2:**
- Name: `MONGO_PASSWORD`
- Value: `your_actual_mongodb_password`

**Variable 3:**
- Name: `MONGO_DB`
- Value: `voter_db`

---

## 🎯 Minimum Required (Must Have)

Sirf yeh 2 variables zaroori hain:

1. ✅ `MONGO_CONNECTION_STRING`
2. ✅ `MONGO_PASSWORD`

`MONGO_DB` optional hai (code mein default hai: `voter_db`)

---

## 💡 Important Notes:

- **MONGO_PASSWORD** mein apna actual MongoDB Atlas password dalo
- Connection string mein `<db_password>` placeholder hai - code automatically replace karega
- MySQL variables add karne ki zarurat nahi
- Sirf MongoDB connection use hoga

---

## ✅ Verification:

Deploy ke baad test karo:
```
https://your-service.onrender.com/fetch_voter_data_mongo
```

---

**That's it!** Sirf MongoDB use karega, MySQL nahi. 🎉

