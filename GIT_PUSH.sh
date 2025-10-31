#!/bin/bash

# Git Push Script for Voter API Project

echo "🚀 Git Setup Starting..."

# Check if .env exists and warn
if [ -f .env ]; then
    echo "⚠️  Warning: .env file exists. It will NOT be committed (good!)."
else
    echo "✅ .env file not found - safe to proceed"
fi

# Initialize git if not already
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "➕ Adding files to git..."
git add .

# Check what will be committed
echo ""
echo "📋 Files ready to commit:"
git status --short

# Commit
echo ""
echo "💾 Committing files..."
git commit -m "Initial commit: Voter API project with MongoDB support and Render deployment"

echo ""
echo "✅ Files committed successfully!"
echo ""
echo "📝 Next Steps:"
echo "1. Create repository on GitHub.com"
echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/voter-api-project.git"
echo "3. Run: git branch -M main"
echo "4. Run: git push -u origin main"
echo ""

