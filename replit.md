# Portfolio Website

## Overview

This is a full-stack portfolio website built with React (frontend) and Express.js (backend). The application showcases projects, reading lists, and provides a contact form. It features a modern design using shadcn/ui components with Tailwind CSS styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Uses connect-pg-simple for PostgreSQL-backed sessions
- **Development**: Hot module replacement with Vite integration
- **API**: RESTful API endpoints for projects, books, and contact messages

## Key Components

### Database Schema
The application uses four main tables:
- **Users**: Basic user authentication (id, username, password)
- **Projects**: Portfolio projects with metadata (title, description, technologies, URLs, featured status)
- **Books**: Reading list with status tracking (title, author, rating, reading status, progress)
- **Contact Messages**: Form submissions with timestamps

### Storage Layer
- **Interface**: IStorage interface defining all database operations
- **Implementation**: MemStorage class for in-memory development data with sample seeding
- **Production**: Configured for PostgreSQL with Neon Database serverless driver

### Frontend Pages & Components
- **HomePage**: Main landing page with hero section and navigation
- **ProjectsSection**: Displays portfolio projects with filtering
- **BookshelfSection**: Reading list with status-based tabs (currently reading, want to read, completed)
- **ContactSection**: Contact form with validation and submission handling
- **Navigation**: Smooth scrolling navigation with active section highlighting

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle HTTP requests and validate input
3. **Storage Layer**: Storage interface abstracts database operations
4. **Database**: PostgreSQL stores persistent data
5. **Response**: JSON responses sent back to client components

Form submissions follow a similar pattern with additional validation using Zod schemas.

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database queries and migrations
- **connect-pg-simple**: PostgreSQL session store

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Icon library for UI elements
- **date-fns**: Date manipulation utilities

### Development Tools
- **Vite**: Build tool with HMR and development server
- **TypeScript**: Type safety across the application
- **Zod**: Runtime validation for forms and API inputs

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild compiles TypeScript server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Production Configuration
- **Server**: Node.js serves both API and static files
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Static Assets**: Express serves built React app for production

### Development Workflow
- **Hot Reloading**: Vite middleware integrated with Express server
- **Database Migrations**: Drizzle handles schema changes and migrations
- **Type Safety**: Shared TypeScript types between client and server

The application is structured as a monorepo with clear separation between client, server, and shared code, making it easy to develop and deploy as a unified full-stack application.