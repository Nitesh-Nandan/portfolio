#!/bin/bash

# Simple deployment script that builds locally and deploys with Docker

echo "🚀 Starting simple deployment..."

# Build the client application locally
echo "📦 Building client application..."
npm run build:client

# Check if build was successful
if [ ! -d "dist/public" ]; then
    echo "❌ Build failed - dist/public directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Build Docker image using simple Dockerfile
echo "🐳 Building Docker image..."
docker build -f Dockerfile.simple -t portfolio-simple .

echo "✅ Docker image built successfully"
echo "🎉 Ready to run with: docker run -p 3000:80 portfolio-simple"
echo "🌐 Access your app at: http://localhost:3000" 