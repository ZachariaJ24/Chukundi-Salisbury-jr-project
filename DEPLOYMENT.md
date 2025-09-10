# Vercel Deployment Guide

This guide covers different options for deploying your video streaming app to Vercel.

## 🚀 Deployment Options

### Option 1: Frontend Only on Vercel (Recommended)

Deploy the React frontend to Vercel and host the backend separately (Railway, Render, Heroku, etc.).

#### Steps:

1. **Deploy Backend Separately**
   - Deploy your Node.js backend to Railway, Render, or Heroku
   - Note the backend URL (e.g., `https://your-backend.railway.app`)

2. **Deploy Frontend to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Navigate to client directory
   cd client
   
   # Deploy
   vercel
   ```

3. **Set Environment Variables in Vercel**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable:
     - `REACT_APP_API_URL` = `https://your-backend.railway.app/api`

### Option 2: Full-Stack on Vercel (Limited)

Deploy both frontend and backend to Vercel using serverless functions.

#### Limitations:
- ❌ No persistent file storage (videos need external storage)
- ❌ Limited to 10-second execution time for API routes
- ❌ No FFmpeg support for thumbnails
- ✅ Good for development/testing

#### Steps:

1. **Prepare for Vercel**
   ```bash
   # Install dependencies
   npm install
   cd client && npm install
   cd ..
   ```

2. **Deploy to Vercel**
   ```bash
   # From project root
   vercel
   ```

3. **Set Environment Variables**
   - `VIDEO_DIR` = `/tmp/videos` (temporary storage)
   - `REACT_APP_API_URL` = `https://your-app.vercel.app/api`

## 🎯 Recommended Architecture

For production, we recommend:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Backend        │    │   Cloud Storage │
│   (Frontend)    │◄──►│   (Railway)      │◄──►│   (AWS S3)      │
│   React App     │    │   Node.js API    │    │   Video Files   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔧 Environment Variables

### Frontend (Vercel)
- `REACT_APP_API_URL` - Backend API URL

### Backend (Railway/Render/Heroku)
- `VIDEO_DIR` - Path to video files directory
- `PORT` - Server port (usually auto-assigned)

## 📁 File Structure for Vercel

```
project/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── api/                   # Vercel serverless functions
│   ├── videos.js
│   ├── health.js
│   └── videos/[filename]/stream.js
├── vercel.json           # Vercel configuration
└── package.json
```

## 🚀 Quick Deploy Commands

### Frontend Only:
```bash
cd client
vercel --prod
```

### Full-Stack:
```bash
vercel --prod
```

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure backend has proper CORS headers
   - Check API URL in environment variables

2. **Video Not Loading**
   - Verify video files are accessible
   - Check file permissions
   - Ensure correct MIME types

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Vercel-Specific Issues:

1. **Function Timeout**
   - Vercel has 10-second limit for hobby plan
   - Consider upgrading to Pro plan for longer execution

2. **File Storage**
   - Vercel doesn't support persistent file storage
   - Use external storage (AWS S3, Cloudinary, etc.)

3. **FFmpeg Not Available**
   - Vercel doesn't support FFmpeg
   - Use external service for thumbnail generation

## 💡 Production Recommendations

1. **Use Cloud Storage**
   - Store videos on AWS S3, Cloudinary, or similar
   - Generate thumbnails using cloud functions

2. **CDN Integration**
   - Use Vercel's CDN for static assets
   - Consider CloudFront for video streaming

3. **Monitoring**
   - Set up Vercel Analytics
   - Monitor API performance
   - Track video streaming metrics

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/cli)
- [Railway](https://railway.app) - Backend hosting
- [Render](https://render.com) - Backend hosting
- [AWS S3](https://aws.amazon.com/s3/) - File storage
