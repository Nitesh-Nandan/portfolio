#!/bin/bash

# Parse command line arguments
SKIP_DB=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --skip-db)
      SKIP_DB=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--skip-db]"
      exit 1
      ;;
  esac
done

# Sync db data first (unless --skip-db is specified)
if [ "$SKIP_DB" = false ]; then
  echo "📦 Syncing db data..."
  npm run sync:db
else
  echo "⏭️ Skipping db sync (--skip-db flag provided)"
fi

# Sync static data first
echo "📦 Syncing static data..."
npm run sync:cache

# Build the client application
echo "🔨🚀 Building vercel and deploying application..."
vercel --prod --env VITE_API_MODE=static

echo "✅ Vercel build completed!"