@echo off
echo 🚀 Deploying Video Streaming App Demo to Vercel...
echo.

REM Navigate to client directory
cd client

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build the app
echo 🔨 Building the app...
call npm run build

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
call vercel --prod

echo.
echo ✅ Deployment complete!
echo Your demo app should now be live!
pause
