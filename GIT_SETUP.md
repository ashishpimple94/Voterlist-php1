# Git Setup Guide - Project ko GitHub pe Push Karo

## 🚀 Step by Step Instructions

### Step 1: Git Initialize Karo

```bash
cd /Users/ashishpimple/Downloads/voter_api_project
git init
```

### Step 2: .gitignore Check Karo

`.gitignore` file already hai aur yeh files ignore karega:
- `.env` (passwords)
- `vendor/` (dependencies)
- Logs aur temporary files

### Step 3: Files Add Karo

```bash
git add .
```

### Step 4: Commit Karo

```bash
git commit -m "Initial commit: Voter API project with MongoDB support"
```

### Step 5: GitHub Repository Banao

1. GitHub.com pe jao
2. Login karo
3. Click **"New"** repository
4. Name: `voter-api-project` (ya koi aur naam)
5. **Public** ya **Private** select karo
6. **"Create repository"** click karo

### Step 6: Remote Add Karo

GitHub pe repository banane ke baad:

```bash
git remote add origin https://github.com/YOUR_USERNAME/voter-api-project.git
```

**Replace `YOUR_USERNAME`** apne GitHub username se.

### Step 7: Push Karo

```bash
git branch -M main
git push -u origin main
```

---

## ⚠️ Important: .env File

**.env file ko commit mat karna!**

`.gitignore` mein already add hai, but verify karo:

```bash
# Check .gitignore
cat .gitignore | grep .env
```

Agar `.env` already commit ho gaya ho, to:

```bash
git rm --cached .env
git commit -m "Remove .env from git"
```

---

## ✅ Quick Commands (Copy-Paste)

```bash
# Step 1: Initialize
cd /Users/ashishpimple/Downloads/voter_api_project
git init

# Step 2: Add files
git add .

# Step 3: Commit
git commit -m "Initial commit: Voter API project"

# Step 4: Add remote (GitHub repository URL)
git remote add origin https://github.com/YOUR_USERNAME/voter-api-project.git

# Step 5: Push
git branch -M main
git push -u origin main
```

---

## 🔒 Security Checklist

Before pushing, verify:

- [ ] `.env` file `.gitignore` mein hai
- [ ] Passwords code mein nahi hain
- [ ] `env.example` hai (but `.env` nahi)
- [ ] `composer.lock` ignore ho raha hai (optional)

---

## 📝 What Will Be Pushed:

✅ All PHP files  
✅ Configuration files (render.yaml, Dockerfile, etc.)  
✅ Documentation  
✅ public/ folder  
❌ `.env` (ignored)  
❌ `vendor/` (ignored - install locally)  
❌ Logs  

---

## 🆘 Troubleshooting

### Error: "repository not found"
**Solution:** GitHub repository name aur username verify karo

### Error: "authentication failed"
**Solution:** 
- GitHub token use karo
- Ya SSH key setup karo

### Error: ".env file showing in git"
**Solution:**
```bash
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

---

## 🎯 After Push

GitHub pe repository:
```
https://github.com/YOUR_USERNAME/voter-api-project
```

Yeh URL Render pe use kar sakte ho for auto-deploy! 🚀

