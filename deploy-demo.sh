#!/bin/bash

echo "🚀 Deploying Video Streaming App Demo to Vercel..."
echo ""

# Navigate to client directory
cd client

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🔨 Building the app..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "Your demo app should now be live!"
