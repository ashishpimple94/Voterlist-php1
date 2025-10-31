# Render Deployment Guide

## 🚀 Deploy on Render - Step by Step

### Prerequisites
- GitHub account
- Render account (free at render.com)
- Your code pushed to GitHub

## 📋 Deployment Steps

### Step 1: Push Code to GitHub

```bash
# Initialize git if not already
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for Render deployment"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/voter_api_project.git

# Push to GitHub
git push -u origin main
```

### Step 2: Create New Web Service on Render

1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub account
5. Select your repository: `voter_api_project`

### Step 3: Configure Service

**Basic Settings:**
- **Name:** `voter-api` (or any name)
- **Region:** Choose closest region
- **Branch:** `main` (or your branch)
- **Root Directory:** Leave empty (or `/`)

**Build & Deploy:**
- **Runtime:** `PHP`
- **Build Command:**
  ```bash
  composer install --no-dev --optimize-autoloader
  ```
- **Start Command:**
  ```bash
  php -S 0.0.0.0:$PORT -t public public/index.php
  ```
  OR simply:
  ```bash
  php -S 0.0.0.0:$PORT -t public
  ```

### Step 4: Environment Variables

Add these environment variables in Render Dashboard:

**MySQL Database:**
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=voter_new
```

**MongoDB Atlas:**
```
MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=your_mongodb_password
MONGO_DB=voter_db
```

**Application:**
```
APP_ENV=production
APP_DEBUG=false
PHP_VERSION=8.2
```

### Step 5: Deploy!

Click **"Create Web Service"** and Render will:
1. Clone your repo
2. Install dependencies (composer)
3. Start your PHP server
4. Your API will be live! 🎉

## 🔗 Your API URLs

After deployment, you'll get:
- **Main URL:** `https://voter-api.onrender.com`
- **API Endpoints:**
  - `https://voter-api.onrender.com/fetch_voter_data`
  - `https://voter-api.onrender.com/get_voter_by_id?id=EPIC123`
  - `https://voter-api.onrender.com/upload_xlsx_to_json`
  - `https://voter-api.onrender.com/fetch_voter_data_mongo`

## 📝 Important Notes

### 1. Database Setup
- **MySQL:** Use Render's PostgreSQL service OR external MySQL (like Railway, PlanetScale, etc.)
- **MongoDB:** Use MongoDB Atlas (already configured)

### Step 4a: Add MySQL Database on Render (Optional)

If you want to use Render's database:

1. Go to Dashboard → **"New +"** → **"PostgreSQL"**
2. Create database
3. Get connection string
4. Update environment variables in your web service

### 2. File Structure
Your project should have:
```
voter_api_project/
├── public/
│   ├── index.php      # Entry point
│   └── .htaccess      # Apache config (optional)
├── composer.json      # Dependencies
├── render.yaml        # Render config
├── env_load.php       # Environment loader
└── [your PHP API files]
```

### 3. Using render.yaml (Alternative)

If you use `render.yaml`, Render will auto-configure everything:

1. Push `render.yaml` to your repo
2. Select **"Apply render.yaml"** option
3. Render will read the config automatically

## 🔧 Troubleshooting

### Problem: 500 Internal Server Error
**Solution:**
- Check logs in Render Dashboard
- Verify all environment variables are set
- Check PHP version compatibility

### Problem: Dependencies not installing
**Solution:**
- Ensure `composer.json` exists
- Check build logs in Render Dashboard
- Verify PHP version is correct

### Problem: API endpoints not found
**Solution:**
- Ensure `public/index.php` exists
- Check routing in `index.php`
- Verify file paths are correct

### Problem: Database connection failed
**Solution:**
- Verify environment variables are set correctly
- Check database is accessible from Render's servers
- For MongoDB Atlas, ensure IP whitelist allows all (0.0.0.0/0)

## 🎯 Quick Commands

### Check Deployment Logs
- Go to Render Dashboard → Your Service → Logs

### Re-deploy
- Push new code to GitHub
- Render auto-deploys on push
- Or click "Manual Deploy" in Dashboard

### View Environment Variables
- Render Dashboard → Your Service → Environment

## 💡 Tips

1. **Free Tier Limits:**
   - Services sleep after 15 mins of inactivity
   - First request after sleep takes ~30-50 seconds
   - Upgrade to paid for always-on

2. **Custom Domain:**
   - Settings → Custom Domains
   - Add your domain
   - Update DNS records

3. **Health Checks:**
   - Add `/health` endpoint
   - Configure in Settings → Health Check Path

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `composer.json` exists
- [ ] `public/index.php` exists
- [ ] `render.yaml` created (optional)
- [ ] Environment variables set in Render
- [ ] Database credentials configured
- [ ] Service deployed successfully
- [ ] API endpoints tested

## 🎉 Success!

Your Voter API is now live on Render! 🚀

