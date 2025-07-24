# Environment Variables Setup Guide

This guide explains how to configure environment variables for the Portfolio project to manage backend database and API settings.

## 🚀 Quick Setup

Run the setup script to automatically create environment files:

```bash
npm run setup:env
```

This will create both client and server environment files with default values.

## 📁 Environment Files Structure

### Client Environment (`client/.env`)

The client environment file contains frontend-specific configuration:

```bash
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=10000

# Development Settings
VITE_DEV_MODE=true

# API Mode: 'static' (JSON files) or 'api' (database)
VITE_API_MODE=static

# Static data path (for static mode)
VITE_STATIC_DATA_PATH=/data
```

### Server Environment (`.env` in root)

The server environment file contains backend-specific configuration:

```bash
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration (if using PostgreSQL)
DATABASE_URL=your_database_url_here

# API Mode: 'static' (JSON files) or 'api' (database)
VITE_API_MODE=static
```

## 🔧 Configuration Options

### Client Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_BASE_URL` | Backend server URL | `http://localhost:8000` | `https://api.yoursite.com` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` | `5000` |
| `VITE_DEV_MODE` | Enable development features | `true` | `false` |
| `VITE_API_MODE` | Data source mode | `static` | `api` |
| `VITE_STATIC_DATA_PATH` | Path to static JSON files | `/data` | `/public/data` |

### Server Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Server port | `8000` | `3000` |
| `NODE_ENV` | Environment mode | `development` | `production` |
| `DATABASE_URL` | PostgreSQL connection string | - | `postgresql://user:pass@host:port/db` |

## 🎯 Usage Examples

### Development Setup

For local development with static data:

```bash
# client/.env
VITE_API_MODE=static
VITE_API_BASE_URL=http://localhost:8000
VITE_DEV_MODE=true

# .env (root)
PORT=8000
NODE_ENV=development
```

### Production Setup

For production with database:

```bash
# client/.env
VITE_API_MODE=api
VITE_API_BASE_URL=https://api.yoursite.com
VITE_DEV_MODE=false

# .env (root)
PORT=8000
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
```

### Custom Backend URL

To use a different backend server:

```bash
# client/.env
VITE_API_BASE_URL=https://your-custom-api.com
VITE_API_TIMEOUT=15000
```

## 🔒 Security Notes

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use different values for different environments** (dev, staging, prod)
3. **Keep sensitive data in server environment** (database URLs, API keys)
4. **Client variables are public** - Only use non-sensitive configuration

## 🛠️ Advanced Configuration

### Custom API Client

The project uses a centralized configuration in `client/src/config/env.ts`:

```typescript
import { config } from '@/config/env';

// Access configuration
console.log(config.api.baseUrl); // Backend URL
console.log(config.api.timeout); // Request timeout
console.log(config.dev.mode); // Development mode
```

### TypeScript Support

Environment variables are fully typed. See `client/src/types/env.d.ts` for type definitions.

### Vite Proxy Configuration

The Vite development server proxy is automatically configured from environment variables:

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: process.env.VITE_API_BASE_URL || 'http://localhost:8000',
    changeOrigin: true,
    secure: false,
    timeout: parseInt(process.env.VITE_API_TIMEOUT || '10000'),
  },
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure `.env` files are in the correct location
   - Restart the development server after changes
   - Check that variable names start with `VITE_` for client

2. **API calls failing**
   - Verify `VITE_API_BASE_URL` is correct
   - Check server is running on the specified port
   - Ensure `VITE_API_MODE` matches your setup

3. **Database connection issues**
   - Verify `DATABASE_URL` format
   - Check database server is accessible
   - Ensure `VITE_API_MODE=api` for database mode

### Debug Mode

Enable debug logging by setting:

```bash
VITE_DEV_MODE=true
```

This will log API configuration and requests to the console.

## 📚 Related Files

- `client/src/config/env.ts` - Centralized configuration
- `client/src/types/env.d.ts` - TypeScript definitions
- `client/src/lib/api.ts` - API client using environment variables
- `vite.config.ts` - Vite proxy configuration
- `scripts/setup-env.sh` - Environment setup script 