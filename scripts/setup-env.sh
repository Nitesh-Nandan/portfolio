#!/bin/bash

# Setup script for environment variables
echo "🚀 Setting up environment variables for Portfolio..."

# Create client .env file
echo "📝 Creating client environment file..."
cat > client/.env << EOF
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=10000

# Development Settings
VITE_DEV_MODE=true

# API Mode: 'static' (JSON files) or 'api' (database)
VITE_API_MODE=static

# Static data path (for static mode)
VITE_STATIC_DATA_PATH=/data
EOF

# Create root .env file
echo "📝 Creating server environment file..."
cat > .env << EOF
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration (if using PostgreSQL)
# DATABASE_URL=your_database_url_here

# API Mode: 'static' (JSON files) or 'api' (database)
VITE_API_MODE=static
EOF

echo "✅ Environment files created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Review and modify the generated .env files as needed"
echo "2. For API mode, set VITE_API_MODE=api and configure DATABASE_URL"
echo "3. For production, update VITE_API_BASE_URL to your production server URL"
echo ""
echo "🔧 To start development:"
echo "   npm run dev" 