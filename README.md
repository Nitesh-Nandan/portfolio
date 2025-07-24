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
- **Performance Optimized**: Lazy loading, code splitting, and caching

## 📁 Project Structure

```
portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # Reusable UI components
│   │   │   └── ...        # Feature-specific components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and API client
│   │   └── main.tsx       # Application entry point
│   ├── public/
│   │   └── data/          # Static JSON data files
│   └── index.html         # HTML template
├── server/                # Backend Express.js application
│   ├── data/              # Data storage
│   │   ├── cache/         # Cached JSON files
│   │   └── db/            # Database JSON files
│   ├── scripts/           # Data synchronization scripts
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── data-service.ts    # Data service layer
│   └── db.ts              # Database configuration
├── shared/                # Shared TypeScript schemas
│   └── schema.ts          # Type definitions
├── scripts/               # Build and deployment scripts
├── vercel.json            # Vercel deployment configuration
├── vite.config.ts         # Vite build configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Project dependencies and scripts
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling
- **Framer Motion** - Animations
- **Wouter** - Client-side routing

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database (via Neon)
- **Passport.js** - Authentication
- **Zod** - Schema validation

### Development & Deployment
- **Vercel** - Hosting platform
- **Docker** - Containerization
- **GitHub Actions** - CI/CD

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

You can configure the backend database and API settings using environment variables. Create a `.env.local` file in the root directory or a `.env` file in the `client/` directory:

**Client Environment Variables (`client/.env` or `.env.local`):**
```bash
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=10000

# Development Settings
VITE_DEV_MODE=true
```

**Server Environment Variables (`.env` in root):**
```bash
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration (if using PostgreSQL)
DATABASE_URL=your_database_url_here
```
# API Mode: 'static' (JSON files) or 'api' (database)
VITE_API_MODE=static

# Backend API URL (required for API mode)
VITE_API_BASE_URL=http://localhost:3000

# Static data path (for static mode)
VITE_STATIC_DATA_PATH=/data

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

# Build client only
npm run build:client

# Build for Vercel deployment
npm run vercel-build
```

## 📊 Data Management

### Static Mode
- Data is served from JSON files in `client/public/data/`
- No database required
- Perfect for static hosting

### API Mode
- Data is served from PostgreSQL database
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
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
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

### Docker Deployment

```bash
# Build and run with Docker
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start both client and server
npm run dev:client       # Start client only
npm run dev:server       # Start server only

# Building
npm run build            # Build entire project
npm run build:client     # Build client only
npm run vercel-build     # Build for Vercel

# Data Management
npm run sync:static      # Sync data to client/public/data
npm run sync:db          # Sync database to cache
npm run sync:cache       # Sync cache to database
npm run db:push          # Push database schema changes

# Utilities
npm run check            # TypeScript type checking
npm run deploy           # Custom deployment script
```

## 🔧 Configuration Files

- **`vercel.json`** - Vercel deployment settings
- **`vite.config.ts`** - Vite build configuration
- **`tailwind.config.ts`** - Tailwind CSS customization
- **`tsconfig.json`** - TypeScript configuration
- **`drizzle.config.ts`** - Database schema configuration

## 📚 Documentation

- [Vercel CLI Commands](./VERCEL_CLI_COMMANDS.md) - Complete deployment guide
- [API Documentation](./docs/api.md) - Backend API reference
- [Component Library](./docs/components.md) - UI component documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the [documentation](./docs/)
- Review the [Vercel CLI guide](./VERCEL_CLI_COMMANDS.md) 