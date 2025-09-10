# Environment Variables & Secrets Guide

This document outlines all the necessary environment variables and secrets needed for different deployment scenarios.

## 🔐 Required Secrets by Deployment Type

### **Frontend Only (Vercel) + Backend (Railway/Render)**

#### Frontend Environment Variables (Vercel)
```bash
# Required
REACT_APP_API_URL=https://your-backend.railway.app/api

# Optional
GENERATE_SOURCEMAP=false
```

#### Backend Environment Variables (Railway/Render)
```bash
# Required
VIDEO_DIR=/app/videos
PORT=5000

# Optional
NODE_ENV=production
```

### **Full-Stack on Vercel**

#### Vercel Environment Variables
```bash
# Required
REACT_APP_API_URL=https://your-app.vercel.app/api
VIDEO_DIR=/tmp/videos

# Optional
NODE_ENV=production
```

### **Production with Cloud Storage**

#### Frontend (Vercel)
```bash
# Required
REACT_APP_API_URL=https://your-backend.railway.app/api

# Optional
GENERATE_SOURCEMAP=false
```

#### Backend (Railway/Render)
```bash
# Required
VIDEO_DIR=/app/videos
PORT=5000

# Cloud Storage (choose one)
# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-video-bucket

# Or Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Or Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_KEY_FILE=path/to/service-account.json
GOOGLE_CLOUD_BUCKET=your-video-bucket
```

## 🛠️ Setting Up Secrets

### **Vercel Dashboard**
1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable with its value
4. Choose environment (Production, Preview, Development)

### **Railway Dashboard**
1. Go to your project dashboard
2. Click "Variables" tab
3. Add each variable with its value
4. Variables are automatically available to your app

### **Render Dashboard**
1. Go to your service dashboard
2. Click "Environment" tab
3. Add each variable with its value
4. Click "Save Changes"

## 🔒 Security Best Practices

### **Never Commit These Files:**
```
.env
.env.local
.env.production
.env.development
*.key
*.pem
service-account.json
```

### **Add to .gitignore:**
```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# API Keys
*.key
*.pem
service-account.json
config/secrets.json
```

### **Use Different Values for Different Environments:**
- **Development**: Use local values
- **Staging**: Use staging cloud resources
- **Production**: Use production cloud resources

## 📋 Quick Setup Checklist

### **For Vercel Frontend:**
- [ ] `REACT_APP_API_URL` - Backend API URL
- [ ] `GENERATE_SOURCEMAP=false` - Disable source maps in production

### **For Railway/Render Backend:**
- [ ] `VIDEO_DIR` - Path to video files
- [ ] `PORT` - Server port (usually auto-assigned)
- [ ] `NODE_ENV=production` - Production mode

### **For Cloud Storage (Optional):**
- [ ] Choose storage provider (AWS S3, Cloudinary, etc.)
- [ ] Get API credentials
- [ ] Set up bucket/container
- [ ] Configure CORS for video streaming

## 🚨 Common Issues

### **CORS Errors**
- Ensure backend has proper CORS configuration
- Check that `REACT_APP_API_URL` points to correct backend

### **Video Not Loading**
- Verify `VIDEO_DIR` path exists and is accessible
- Check file permissions
- Ensure video files are in supported formats

### **Build Failures**
- Check all required environment variables are set
- Verify API URLs are correct
- Check for missing dependencies

## 🔧 Environment-Specific Examples

### **Development (.env.local)**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### **Staging (.env.staging)**
```bash
REACT_APP_API_URL=https://staging-backend.railway.app/api
```

### **Production (.env.production)**
```bash
REACT_APP_API_URL=https://production-backend.railway.app/api
```

## 📝 Notes

- Environment variables starting with `REACT_APP_` are available in the frontend
- Other variables are only available in the backend
- Always use HTTPS URLs in production
- Test your environment variables before deploying
- Keep your secrets secure and never share them publicly
