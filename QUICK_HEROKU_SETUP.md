# ⚡ Quick Heroku Deployment (5-10 minutes)

## Prerequisites Installed?
- [ ] Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
- [ ] Git
- [ ] MongoDB Atlas account: https://www.mongodb.com/cloud/atlas

---

## Quick Steps

### 1️⃣ Create MongoDB Database (3 min)
```bash
# Go to MongoDB Atlas
# 1. Create cluster (free tier)
# 2. Create database user (username: kaamconnect, strong password)
# 3. Get connection string
# Example: mongodb+srv://kaamconnect:password@cluster0.xxxxx.mongodb.net/kaamconnect?retryWrites=true&w=majority
```

### 2️⃣ Login to Heroku (1 min)
```bash
heroku login
# Browser will open - login with your credentials
```

### 3️⃣ Create Heroku App (1 min)
```bash
cd server
heroku create kaamconnect-api
# Save the URL it gives you (e.g., https://kaamconnect-api.herokuapp.com)
```

### 4️⃣ Set Environment Variables (2 min)
```bash
# Replace values with your actual keys
heroku config:set DATABASE_URL="mongodb+srv://kaamconnect:PASSWORD@cluster.mongodb.net/kaamconnect?retryWrites=true&w=majority"

heroku config:set JWT_SECRET="change-this-to-random-secret-key"

heroku config:set NODE_ENV="production"

heroku config:set GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

heroku config:set OPENAI_API_KEY="your-openai-api-key"

heroku config:set GOOGLE_AI_API_KEY="your-google-ai-api-key"

heroku config:set CORS_ORIGIN="https://your-flutter-app-url.com"
```

### 5️⃣ Deploy Code (2 min)
```bash
git push heroku main
# Wait for build to complete (you'll see "deployed to Heroku")
```

### 6️⃣ Verify Deployment (1 min)
```bash
# Check if running
heroku logs --tail --app kaamconnect-api

# Test the API
curl https://kaamconnect-api.herokuapp.com/health
```

### 7️⃣ Update Flutter App (30 sec)
Edit: `client/lib/core/network/api_client.dart:5`
```dart
const String kBaseUrl = 'https://kaamconnect-api.herokuapp.com';
```

Then rebuild Flutter app:
```bash
cd client
flutter pub get
flutter run
```

---

## ✅ You're Done!

Your backend is live and your Flutter app is connected! 🎉

---

## If Something Goes Wrong

### Check Logs
```bash
heroku logs --tail --app kaamconnect-api
```

### Restart App
```bash
heroku restart --app kaamconnect-api
```

### View Config Variables
```bash
heroku config --app kaamconnect-api
```

### Rebuild
```bash
git push heroku main
```

---

## Important Notes

⚠️ **Don't forget:**
1. **MongoDB Atlas Network Access:** Whitelist 0.0.0.0/0 (allow all IPs)
2. **Flutter Base URL:** Update to Heroku URL
3. **API Keys:** Get them from Google Cloud, OpenAI, etc.
4. **JWT_SECRET:** Use a strong random string (20+ characters)

---

**For detailed guide:** See `HEROKU_DEPLOYMENT.md`
