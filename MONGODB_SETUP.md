# 🔧 MongoDB Connection Setup Guide

## ⚠️ Common Issue: "bad auth : authentication failed"

Yeh error usually is wajah se aata hai:

### 1. Password Placeholder Not Replaced

Agar `.env` file mein aapka connection string yeh hai:
```env
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=your_password_here
```

To ensure karo ki:
- ✅ `MONGO_PASSWORD` set hai
- ✅ Password placeholder `<db_password>` connection string mein hai
- ✅ Password correct hai (MongoDB Atlas se verify karo)

### 2. Correct .env File Format

**Option 1: Using Placeholder (Recommended)**
```env
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=your_actual_password_here
MONGO_DB=voter_db
```

**Option 2: Direct Connection String**
```env
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:your_password_here@cluster0.ezzkjmw.mongodb.net/voter_db?appName=Cluster0
MONGO_DB=voter_db
```

### 3. Check MongoDB Atlas Settings

1. **Database Access:**
   - MongoDB Atlas Dashboard → Database Access
   - Verify username: `hosteluser`
   - Reset password if needed

2. **Network Access:**
   - MongoDB Atlas Dashboard → Network Access
   - Add IP Address: `0.0.0.0/0` (allows all IPs)
   - Ya phir apna specific IP add karo

3. **Connection String:**
   - MongoDB Atlas Dashboard → Database → Connect
   - Copy the connection string
   - Ensure format is correct

### 4. Password Special Characters

Agar password mein special characters hain (`@`, `#`, `%`, etc.):
- Placeholder method use karo (automatic URL encoding)
- Ya manually URL encode karo

Example:
```
Password: My@Pass#123
Encoded: My%40Pass%23123
```

### 5. Debug Steps

Server start karo aur check karo:

```bash
npm start
```

Expected output:
```
🔌 Connecting to MongoDB...
🔐 Password placeholder replaced
📂 Database name added: voter_db
📍 Host: cluster0.ezzkjmw.mongodb.net/voter_db?appName=Cluster0
✅ MongoDB connected successfully
```

Agar yeh warning aaye:
```
⚠️ WARNING: Password placeholder <db_password> not replaced!
```

To `.env` file check karo - `MONGO_PASSWORD` missing hai.

### 6. Quick Test

```bash
# .env file check karo
cat .env | grep MONGO

# Expected output:
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@...
MONGO_PASSWORD=your_password
MONGO_DB=voter_db
```

### 7. Still Not Working?

1. **Reset MongoDB Password:**
   - Atlas Dashboard → Database Access
   - Edit user → Reset password
   - New password copy karo
   - `.env` file update karo

2. **Check IP Whitelist:**
   - Atlas Dashboard → Network Access
   - Add `0.0.0.0/0` for all IPs (development only)

3. **Verify Connection String:**
   - Atlas Dashboard → Connect
   - "Connect your application" option
   - Copy connection string
   - Check format matches your `.env`

4. **Test Connection:**
   ```bash
   # Restart server
   npm start
   
   # Check logs for connection messages
   ```

### ✅ Success Indicators

- ✅ `🔐 Password placeholder replaced` message aata hai
- ✅ `✅ MongoDB connected successfully` message aata hai
- ✅ No authentication errors

### ❌ Failure Indicators

- ❌ `bad auth : authentication failed`
- ❌ `⚠️ WARNING: Password placeholder not replaced`
- ❌ `❌ MongoDB connection error`

---

**Need Help?** Check MongoDB Atlas logs or contact support.

