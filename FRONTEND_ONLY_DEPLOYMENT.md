# Frontend-Only Vercel Deployment

This guide shows how to deploy just the React frontend to Vercel while hosting the backend separately.

## 🚀 Quick Deploy (Frontend Only)

### **Step 1: Install Vercel CLI**
```bash
npm i -g vercel
```

### **Step 2: Deploy Frontend**
```bash
# Navigate to client directory
cd client

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (choose your account)
# - Link to existing project? N
# - Project name? video-streaming-app (or your choice)
# - Directory? ./client
# - Override settings? N
```

### **Step 3: Set Environment Variable**
After deployment, set the backend API URL:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend.railway.app/api` (replace with your actual backend URL)
   - **Environment**: Production, Preview, Development

### **Step 4: Redeploy**
```bash
# Redeploy to apply environment variables
vercel --prod
```

## 🔧 Backend Options

Since you're only deploying the frontend, you'll need to host the backend separately:

### **Option 1: Railway (Recommended)**
- Free tier available
- Easy deployment
- Automatic HTTPS

### **Option 2: Render**
- Free tier available
- Good for Node.js apps

### **Option 3: Heroku**
- Free tier discontinued
- Paid plans available

### **Option 4: Local Development**
- Run backend locally
- Use `http://localhost:5000/api` as API URL

## 📁 Project Structure

```
video-streaming-app/
├── client/                 # ← Deploy this to Vercel
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── server/                 # ← Deploy this to Railway/Render
│   ├── index.js
│   ├── package.json
│   └── videos/
└── vercel.json
```

## 🔐 Required Environment Variables

### **Frontend (Vercel)**
```bash
REACT_APP_API_URL=https://your-backend.railway.app/api
```

### **Backend (Railway/Render)**
```bash
VIDEO_DIR=/app/videos
PORT=5000
```

## 🚀 Deployment Commands

### **Deploy Frontend to Vercel**
```bash
cd client
vercel --prod
```

### **Update Environment Variables**
```bash
# After setting REACT_APP_API_URL in Vercel dashboard
vercel --prod
```

## 🔍 Troubleshooting

### **Common Issues:**

1. **"API URL not found"**
   - Check `REACT_APP_API_URL` is set correctly
   - Ensure backend is running and accessible
   - Verify CORS is configured on backend

2. **"Build failed"**
   - Check all dependencies are installed
   - Verify TypeScript compilation
   - Check for syntax errors

3. **"Videos not loading"**
   - Ensure backend is running
   - Check video files are in correct directory
   - Verify API endpoints are working

### **Testing Your Setup:**

1. **Test Backend:**
   ```bash
   curl https://your-backend.railway.app/api/health
   ```

2. **Test Frontend:**
   - Visit your Vercel URL
   - Check browser console for errors
   - Verify API calls are working

## 📋 Pre-Deployment Checklist

- [ ] Backend deployed and running
- [ ] Backend API URL obtained
- [ ] Vercel CLI installed
- [ ] Client dependencies installed (`npm install` in client folder)
- [ ] Environment variable `REACT_APP_API_URL` set in Vercel
- [ ] Ready to deploy!

## 🎯 Benefits of Frontend-Only Deployment

✅ **Faster builds** - Only React app needs to build  
✅ **Better performance** - Static files served from CDN  
✅ **Easier scaling** - Vercel handles traffic automatically  
✅ **Cost effective** - Free tier for frontend  
✅ **Separation of concerns** - Backend can be updated independently  

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Railway](https://railway.app) - Backend hosting
- [Render](https://render.com) - Backend hosting
- [Vercel CLI](https://vercel.com/cli)
