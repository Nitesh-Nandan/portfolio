# Portfolio Website

A modern portfolio website built with React, TypeScript, and Vite.

## Environment Variables

The client can be configured using environment variables. Create a `.env` file in the `client/` directory:

```bash
# API Mode: 'static' (load from JSON files) or 'api' (load from backend)
VITE_API_MODE=api

# Backend API Base URL (only needed when VITE_API_MODE=api)
VITE_API_BASE_URL=https://your-backend-url.com

# Static Data Path (only needed when VITE_API_MODE=static)
VITE_STATIC_DATA_PATH=/data
```

### Environment Examples

**For Development (API mode):**
```bash
VITE_API_MODE=api
VITE_API_BASE_URL=http://localhost:3000
VITE_STATIC_DATA_PATH=/data
```

**For Production (API mode):**
```bash
VITE_API_MODE=api
VITE_API_BASE_URL=https://your-production-backend.com
VITE_STATIC_DATA_PATH=/data
```

**For Static Deployment (no backend):**
```bash
VITE_API_MODE=static
VITE_API_BASE_URL=
VITE_STATIC_DATA_PATH=/data
```

## Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build:client
```

The build will use the environment variables from your `.env` file to determine the API configuration. 