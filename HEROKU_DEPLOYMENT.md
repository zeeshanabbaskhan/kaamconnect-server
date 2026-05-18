# 🚀 Deploy NestJS Backend to Heroku

## Prerequisites

1. **Heroku Account** - Sign up at https://www.heroku.com
2. **Heroku CLI** - Download from https://devcenter.heroku.com/articles/heroku-cli
3. **Git** - Already installed on your system
4. **MongoDB Atlas** - MongoDB cloud database at https://www.mongodb.com/cloud/atlas

---

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up with email/Google
- Create a new project (e.g., "KaamConnect")

### 1.2 Create a Cluster
- Click "Create" to create a new cluster
- Choose "Shared" (free tier)
- Select your region (e.g., us-east-1)
- Click "Create Cluster"
- Wait for cluster to be ready (~3-5 minutes)

### 1.3 Create Database User
- Click "Database Access" in left sidebar
- Click "Add New Database User"
- Username: `kaamconnect` (or your choice)
- Password: Create a strong password, save it
- Database User Privileges: "Read and write to any database"
- Click "Add User"

### 1.4 Get Connection String
- Click "Database" in left sidebar
- Click "Connect" button on your cluster
- Select "Connect your application"
- Choose "Node.js" and version "4.1 or later"
- Copy the connection string
- Replace `<password>` with your database user password
- Replace `<dbname>` with `kaamconnect` (or your database name)

**Example connection string:**
```
mongodb+srv://kaamconnect:password@cluster0.xxxxx.mongodb.net/kaamconnect?retryWrites=true&w=majority
```

---

## Step 2: Prepare Your Backend

### 2.1 Create Procfile
Create a file named `Procfile` in the server root directory:

```bash
# File: server/Procfile
web: npm run start:prod
```

### 2.2 Create .env.example
Create a file named `.env.example` to document required environment variables:

```bash
# File: server/.env.example
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/kaamconnect
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=7d
NODE_ENV=production
PORT=3000
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
OPENAI_API_KEY=your-openai-api-key
GOOGLE_AI_API_KEY=your-google-ai-api-key
CORS_ORIGIN=https://your-frontend-url.com
```

### 2.3 Update package.json
Make sure your `package.json` has these scripts (should already be there):

```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  }
}
```

### 2.4 Check .gitignore
Make sure your `.gitignore` includes:

```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
coverage/
```

### 2.5 Commit Changes
```bash
cd server
git add .
git commit -m "Add Heroku deployment configuration"
```

---

## Step 3: Deploy to Heroku

### 3.1 Login to Heroku
```bash
heroku login
```

A browser window will open. Login with your Heroku credentials.

### 3.2 Create Heroku App
```bash
cd server
heroku create kaamconnect-api
```

**Note:** Replace `kaamconnect-api` with your desired app name (must be unique across all Heroku apps)

You'll see output like:
```
Creating app... done, ⬢ kaamconnect-api
https://kaamconnect-api.herokuapp.com/ | https://git.heroku.com/kaamconnect-api.git
```

Save the URL: `https://kaamconnect-api.herokuapp.com`

### 3.3 Set Environment Variables
```bash
heroku config:set DATABASE_URL="mongodb+srv://kaamconnect:password@cluster.xxxxx.mongodb.net/kaamconnect?retryWrites=true&w=majority" --app kaamconnect-api

heroku config:set JWT_SECRET="your-super-secret-key-12345" --app kaamconnect-api

heroku config:set JWT_EXPIRATION="7d" --app kaamconnect-api

heroku config:set NODE_ENV="production" --app kaamconnect-api

heroku config:set GOOGLE_MAPS_API_KEY="your-google-maps-key" --app kaamconnect-api

heroku config:set OPENAI_API_KEY="your-openai-key" --app kaamconnect-api

heroku config:set GOOGLE_AI_API_KEY="your-google-ai-key" --app kaamconnect-api

heroku config:set CORS_ORIGIN="https://your-frontend-url.com" --app kaamconnect-api
```

### 3.4 Deploy to Heroku
```bash
git push heroku main
```

Or if you're on a different branch:
```bash
git push heroku your-branch:main
```

**Watch the build logs:**
```
Counting objects: 100% (100/100)
Compressing objects: 100% (90/90)
Writing objects: 100% (100/100)
Total 100 (delta 10), reused 0 (delta 0), pack-size: 500.00 KiB

remote: Compressing source files... done.
remote: Building source:
remote: 
remote: -----> Building on the Heroku-20 stack
remote: -----> Using buildpack: heroku/nodejs
remote: -----> Node.js app detected
...
remote: -----> Launching... done, v5
remote:        https://kaamconnect-api.herokuapp.com/ deployed to Heroku
```

### 3.5 Verify Deployment
```bash
# Check app is running
heroku logs --tail --app kaamconnect-api

# Test the API
curl https://kaamconnect-api.herokuapp.com/api/health

# Check for any errors
heroku ps --app kaamconnect-api
```

---

## Step 4: Update Flutter App

Update the backend URL in your Flutter app:

**File:** `client/lib/core/network/api_client.dart:5`

```dart
const String kBaseUrl = 'https://kaamconnect-api.herokuapp.com';
```

Rebuild and redeploy the Flutter app.

---

## Step 5: Verify Everything Works

### Test User Flow
1. Open Flutter app
2. Go to Welcome Screen → "I want to Hire Help"
3. Try to signup
4. Check logs: `heroku logs --tail --app kaamconnect-api`

### Test Provider Flow
1. Go to Welcome Screen → "I want to Work"
2. Try to signup
3. Check if data is saved in MongoDB Atlas

### Verify MongoDB
- Go to MongoDB Atlas dashboard
- Click "Collections" on your database
- You should see collections being created (users, providers, bookings, etc.)

---

## Useful Heroku Commands

### View Logs
```bash
# Real-time logs
heroku logs --tail --app kaamconnect-api

# Last 50 lines
heroku logs --num 50 --app kaamconnect-api

# Search for errors
heroku logs --grep "error" --app kaamconnect-api
```

### Manage Environment Variables
```bash
# View all config vars
heroku config --app kaamconnect-api

# Set a variable
heroku config:set KEY="value" --app kaamconnect-api

# Remove a variable
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

# View running processes
heroku ps --app kaamconnect-api

# Rebuild app
heroku build --app kaamconnect-api
```

### Deploy Updates
```bash
# After making changes locally
git add .
git commit -m "Update backend code"
git push heroku main

# Or specific branch
git push heroku your-branch:main
```

---

## Troubleshooting

### Problem: Build Failed
**Solution:**
```bash
# Check build logs
heroku logs --app kaamconnect-api

# Most common: missing env variables
heroku config --app kaamconnect-api
```

### Problem: App Crashes After Deploy
**Solution:**
```bash
# View recent logs
heroku logs --tail --app kaamconnect-api

# Restart the app
heroku restart --app kaamconnect-api
```

### Problem: Database Connection Error
**Solution:**
```bash
# Verify MongoDB URL is correct
heroku config:get DATABASE_URL --app kaamconnect-api

# Check MongoDB Atlas:
# 1. Network Access - Whitelist 0.0.0.0/0 for Heroku
# 2. Database Access - Verify user exists
# 3. Connection String - Copy exact URL
```

### Problem: 503 Service Unavailable
**Solution:**
```bash
# App might be sleeping (free tier)
# Send a request to wake it up:
curl https://kaamconnect-api.herokuapp.com

# Or check if it's running:
heroku ps --app kaamconnect-api

# Restart if needed:
heroku restart --app kaamconnect-api
```

---

## Performance Tips

### 1. Upgrade to Paid Dyno (Optional)
Free tier apps go to sleep after 30 minutes of inactivity. For production:
```bash
heroku dyno:type web=standard-1x --app kaamconnect-api
```

### 2. Enable Metrics
```bash
heroku apps:info --app kaamconnect-api
```

### 3. Monitor Logs
Set up log drains to forward logs to a service like Papertrail:
```bash
heroku addons:create papertrail:choklad --app kaamconnect-api
```

---

## Security Checklist

- ✅ Set strong JWT_SECRET
- ✅ Use HTTPS (Heroku provides free SSL)
- ✅ Whitelist Heroku IPs on MongoDB (0.0.0.0/0)
- ✅ Set CORS_ORIGIN to your Flutter app URL
- ✅ Never commit .env file
- ✅ Rotate API keys regularly
- ✅ Enable 2FA on Heroku account

---

## Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Connection string obtained
- [ ] Procfile created
- [ ] .env.example created
- [ ] .gitignore updated
- [ ] Heroku CLI installed
- [ ] Heroku app created
- [ ] Environment variables set
- [ ] Code pushed to Heroku
- [ ] Build successful
- [ ] App running (check logs)
- [ ] Database connected (check MongoDB)
- [ ] API responding (test health endpoint)
- [ ] Flutter app URL updated
- [ ] Flutter app rebuilt and redeployed

---

## Your Heroku App Details

**After deployment, you'll have:**

| Item | Value |
|------|-------|
| App Name | `kaamconnect-api` |
| App URL | `https://kaamconnect-api.herokuapp.com` |
| Git URL | `https://git.heroku.com/kaamconnect-api.git` |
| Dashboard | `https://dashboard.heroku.com/apps/kaamconnect-api` |

---

## Next Steps

1. Deploy the backend using this guide
2. Update Flutter app with new backend URL
3. Test user flows (signup, login, searching for services)
4. Monitor logs for any issues
5. Set up proper error monitoring (optional: Sentry, LogRocket)
6. Scale to paid dyno if needed for production

---

**Deployment Status: Ready to Deploy! 🚀**

Follow the steps above and your backend will be live on Heroku within 5-10 minutes.
