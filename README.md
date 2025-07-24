# Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, Express.js, and Vite. Features a dual-mode architecture supporting both static and API-driven deployments.

## 🚀 Features

- **Dual Deployment Modes**: Static (JSON-based) and API (database-driven)
- **Modern Tech Stack**: React 18, TypeScript, Vite, Express.js
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Custom UI components with Radix UI primitives
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Contact Form**: Functional contact form with email integration
- **Admin Panel**: Content management interface

## 🛠️ Tech Stack

### Frontend
- React 18, TypeScript, Vite
- Tailwind CSS, Radix UI
- React Hook Form, Framer Motion
- Wouter (routing)

### Backend
- Express.js, TypeScript
- Drizzle ORM, PostgreSQL
- Passport.js, Zod

### Deployment
- Vercel, Docker

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (for API mode)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# API Mode: 'static' (JSON files) or 'api' (database)
VITE_API_MODE=static

# Backend API URL (required for API mode)
VITE_API_BASE_URL=http://localhost:3000

# Database URL (for API mode)
DATABASE_URL=postgresql://user:password@host:port/database
```

### Development

```bash
# Start both frontend and backend
npm run dev

# Start only frontend
npm run dev:client

# Start only backend
npm run dev:server
```

### Building

```bash
# Build for production
npm run build

# Build for Vercel deployment
npm run vercel-build
```

## 📊 Data Management

### Static Mode
- Data served from JSON files in `client/public/data/`
- No database required
- Perfect for static hosting

### API Mode
- Data served from PostgreSQL database
- Real-time updates via admin panel
- Full CRUD operations available

### Data Synchronization

```bash
# Sync database to cache files
npm run sync:db

# Sync cache files to database
npm run sync:cache

# Sync static data for client
npm run sync:static
```

## 🚀 Deployment

### Vercel Deployment

```bash
# Deploy to production
vercel --prod

# Deploy with custom flags
./scripts/vercel-deploy.sh --skip-db
```

### Environment-Specific Deployments

**Static Deployment (Recommended for portfolios):**
```bash
VITE_API_MODE=static
```

**API Deployment (Full-stack):**
```bash
VITE_API_MODE=api
VITE_API_BASE_URL=https://your-api.vercel.app
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start both client and server
npm run dev:client       # Start client only
npm run dev:server       # Start server only

# Building
npm run build            # Build entire project
npm run vercel-build     # Build for Vercel

# Data Management
npm run sync:static      # Sync data to client/public/data
npm run sync:db          # Sync database to cache
npm run sync:cache       # Sync cache to database

# Utilities
npm run check            # TypeScript type checking
```

## 📁 Project Structure

```
portfolio/
├── client/                 # Frontend React application
├── server/                 # Backend Express.js application
├── shared/                 # Shared TypeScript schemas
├── scripts/                # Build and deployment scripts
└── package.json            # Project dependencies and scripts
```

## 📚 Documentation

- [Vercel CLI Commands](./VERCEL_CLI_COMMANDS.md) - Deployment guide
- [Environment Setup](./ENVIRONMENT_SETUP.md) - Setup instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. 