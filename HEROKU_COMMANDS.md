# 📋 Complete Heroku Deployment Commands

Copy-paste these commands in order for quick deployment.

---

## Phase 1: Prerequisites

### Install Heroku CLI
```bash
# Windows (via Chocolatey)
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Verify Installation
```bash
heroku --version
git --version
node --version
npm --version
```

---

## Phase 2: MongoDB Atlas Setup

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create account and sign in
3. Create new project: "KaamConnect"
4. Create cluster (free tier)
5. Create database user:
   - Username: `kaamconnect`
   - Password: Save this!
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Choose "Node.js"
   - Copy the URL
   - Replace `<password>` with your database password

**Your MongoDB URL will look like:**
```
mongodb+srv://kaamconnect:yourpassword@cluster0.xxxxx.mongodb.net/kaamconnect?retryWrites=true&w=majority
```

---

## Phase 3: Heroku Login

### Login to Heroku
```bash
heroku login
```

A browser window will open. Complete login with your Heroku credentials.

### Verify Login
```bash
heroku auth:whoami
```

---

## Phase 4: Create Heroku App

### Navigate to Server Folder
```bash
cd c:\kaamconnect\server
```

### Create App
```bash
heroku create kaamconnect-api
```

**Save the app URL shown in output. Example:**
```
https://kaamconnect-api.herokuapp.com
```

### Verify App Created
```bash
heroku apps
```

---

## Phase 5: Set Environment Variables

Replace the values with your actual credentials!

```bash
# Database URL
heroku config:set DATABASE_URL="mongodb+srv://kaamconnect:YOURPASSWORD@cluster0.xxxxx.mongodb.net/kaamconnect?retryWrites=true&w=majority" --app kaamconnect-api

# JWT Secret (use a strong random string)
heroku config:set JWT_SECRET="generate-a-random-secret-key-here-at-least-20-chars" --app kaamconnect-api

# JWT Expiration
heroku config:set JWT_EXPIRATION="7d" --app kaamconnect-api

# Node Environment
heroku config:set NODE_ENV="production" --app kaamconnect-api

# Port (Heroku uses PORT env var automatically)
heroku config:set PORT="3000" --app kaamconnect-api

# Google Maps API Key (get from Google Cloud Console)
heroku config:set GOOGLE_MAPS_API_KEY="your-google-maps-api-key" --app kaamconnect-api

# OpenAI API Key (get from openai.com)
heroku config:set OPENAI_API_KEY="your-openai-api-key" --app kaamconnect-api

# Google AI API Key (get from ai.google.dev)
heroku config:set GOOGLE_AI_API_KEY="your-google-ai-api-key" --app kaamconnect-api

# CORS Origin (your Flutter app URL when deployed)
heroku config:set CORS_ORIGIN="https://yourflutterapp.com" --app kaamconnect-api

# Socket.IO Namespace
heroku config:set SOCKET_NAMESPACE="/kaamconnect" --app kaamconnect-api
```

### Verify Variables Set
```bash
heroku config --app kaamconnect-api
```

---

## Phase 6: Deploy to Heroku

### Make Sure Files Are Committed
```bash
git status
git add .
git commit -m "Prepare for Heroku deployment"
```

### Deploy
```bash
git push heroku main
```

If on a different branch:
```bash
git push heroku your-branch-name:main
```

### Watch Deployment
```bash
# Real-time logs during deployment
heroku logs --tail --app kaamconnect-api
```

You'll see something like:
```
remote: -----> Building on the Heroku-20 stack
remote: -----> Using buildpack: heroku/nodejs
remote: -----> Node.js app detected
...
remote: -----> Launching... done, v5
remote:        https://kaamconnect-api.herokuapp.com/ deployed to Heroku
```

---

## Phase 7: Verify Deployment

### Check App Status
```bash
heroku ps --app kaamconnect-api
```

Should show:
```
=== web (Standard-1X): up
web.1: up 2024/05/19 12:34:56 +0000
```

### Test API
```bash
# Using curl
curl https://kaamconnect-api.herokuapp.com/health

# Or in PowerShell
Invoke-WebRequest https://kaamconnect-api.herokuapp.com/health
```

### View Logs
```bash
# Last 50 lines
heroku logs --num 50 --app kaamconnect-api

# Real-time (Ctrl+C to exit)
heroku logs --tail --app kaamconnect-api

# Search for errors
heroku logs --grep "error" --app kaamconnect-api
```

---

## Phase 8: Update Flutter App

Edit: `client/lib/core/network/api_client.dart`

Line 5:
```dart
// Change from:
const String kBaseUrl = 'http://10.0.2.2:3000';

// To:
const String kBaseUrl = 'https://kaamconnect-api.herokuapp.com';
```

### Rebuild Flutter App
```bash
cd client
flutter clean
flutter pub get
flutter run -d chrome
```

---

## Common Commands Reference

### View & Update Config
```bash
# View all variables
heroku config --app kaamconnect-api

# Update single variable
heroku config:set KEY="new-value" --app kaamconnect-api

# Remove variable
heroku config:unset KEY --app kaamconnect-api
```

### Manage App
```bash
# Restart app
heroku restart --app kaamconnect-api

# Stop app
heroku ps:stop web --app kaamconnect-api

# Start app  
heroku ps:start web --app kaamconnect-api

# Open app in browser
heroku open --app kaamconnect-api

# View app info
heroku apps:info --app kaamconnect-api

# View app dashboard
# https://dashboard.heroku.com/apps/kaamconnect-api
```

### Deploy Updates
```bash
# After making changes
git add .
git commit -m "Update backend code"
git push heroku main

# View deployment progress
heroku logs --tail --app kaamconnect-api
```

### Troubleshooting
```bash
# View all logs
heroku logs --num 1000 --app kaamconnect-api

# View logs for specific time
heroku logs --dyno web --app kaamconnect-api

# Check dyno types
heroku dyno:type --app kaamconnect-api

# Upgrade to paid dyno (production)
heroku dyno:type web=standard-1x --app kaamconnect-api

# Run a command on Heroku
heroku run "npm run" --app kaamconnect-api

# Connect to Heroku shell
heroku run bash --app kaamconnect-api
```

---

## Copy-Paste One-Liner Setup

After creating MongoDB Atlas database and getting credentials, run this:

```bash
cd c:\kaamconnect\server && heroku login && heroku create kaamconnect-api && heroku config:set DATABASE_URL="mongodb+srv://kaamconnect:PASSWORD@cluster0.xxxxx.mongodb.net/kaamconnect?retryWrites=true&w=majority" JWT_SECRET="random-secret-key-here" NODE_ENV="production" GOOGLE_MAPS_API_KEY="key" OPENAI_API_KEY="key" GOOGLE_AI_API_KEY="key" && git push heroku main && heroku logs --tail --app kaamconnect-api
```

(Replace PASSWORD and API keys with your actual values)

---

## Deployment Status Indicators

### ✅ Success
```
remote: -----> Launching... done
remote: https://kaamconnect-api.herokuapp.com/ deployed to Heroku
```

### ⚠️ Build Failed
```
remote: -----> Build failed!
```
**Fix:** Check logs with `heroku logs --tail --app kaamconnect-api`

### 🔴 App Crashed
```
heroku ps
=== web (Standard-1X): crashed
```
**Fix:** `heroku restart --app kaamconnect-api` or check logs

### ✅ App Running
```
heroku ps
=== web (Standard-1X): up
web.1: up 2024/05/19 12:34:56 +0000
```

---

## Free Tier Limitations

- ✅ Free SSL/HTTPS
- ✅ Runs your app
- ❌ Apps sleep after 30 min inactivity
- ❌ Limited to 512MB RAM
- ❌ 550 hours/month (shared across apps)

**For production:** Upgrade to Standard-1X dyno ($25/month)

---

## Quick Health Check Script

Save as `health-check.sh`:

```bash
#!/bin/bash
echo "Checking Heroku deployment..."
echo "================================"

echo "1. App Status:"
heroku ps --app kaamconnect-api

echo ""
echo "2. Config Variables:"
heroku config --app kaamconnect-api | wc -l

echo ""
echo "3. API Health:"
curl -s https://kaamconnect-api.herokuapp.com/health

echo ""
echo "4. Recent Logs:"
heroku logs --num 5 --app kaamconnect-api

echo ""
echo "================================"
echo "Health check complete!"
```

Run with:
```bash
bash health-check.sh
```

---

**You're all set! Your backend should be live now!** 🚀
