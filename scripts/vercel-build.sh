#!/bin/bash

echo "🚀 Starting Vercel build..."

# Sync static data first
echo "📦 Syncing static data..."
npm run sync:static

# Build the client application
echo "🔨 Building client application..."
npm run build:client

echo "✅ Vercel build completed!"
echo "📁 Output directory: dist/public" 