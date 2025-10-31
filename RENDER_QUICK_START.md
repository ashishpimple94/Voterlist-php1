# 🚀 Render Deployment - Quick Start

## ✅ 3 Steps to Deploy

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Render"
git push origin main
```

### Step 2: Create Service on Render
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select repo
4. Click **"Create Web Service"**

### Step 3: Add Environment Variables
In Render Dashboard → Environment → Add:

```
DB_HOST=your_mysql_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=voter_new
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=your_mongo_password
MONGO_DB=voter_db
```

**Done!** 🎉 Your API will be live in 2-3 minutes.

---

## 📝 Important Files Created

✅ `render.yaml` - Auto configuration  
✅ `public/index.php` - Entry point  
✅ `composer.json` - Dependencies  
✅ `.gitignore` - Git ignore rules  

## 🔗 After Deployment

Your API will be at:
- `https://your-service-name.onrender.com/fetch_voter_data`
- `https://your-service-name.onrender.com/get_voter_by_id`
- `https://your-service-name.onrender.com/upload_xlsx_to_json`

---

**Full Guide:** See `RENDER_DEPLOY.md` for detailed instructions.

