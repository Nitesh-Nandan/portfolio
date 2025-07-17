# Portfolio Website

## Overview

This is a full-stack portfolio website built with React (frontend) and Express.js (backend) for Nitesh Nandan, a Backend Engineer & GenAI Expert at Wayfair. The application showcases backend engineering projects, technical reading lists, and provides a contact form. It features a modern design using shadcn/ui components with Tailwind CSS styling.

## User Preferences

Preferred communication style: Simple, everyday language.
Profile: Backend developer skilled in Java, Python, GenAI, and building highly scalable distributed systems.

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
- **Projects**: Backend engineering projects with metadata (title, description, technologies, URLs, featured status)
- **Books**: Technical reading list with status tracking (title, author, rating, reading status, progress)
- **Contact Messages**: Form submissions with timestamps

### Storage Layer
- **Interface**: IStorage interface defining all database operations
- **Implementation**: DatabaseStorage class using PostgreSQL with Drizzle ORM
- **Database**: PostgreSQL database with seeded data for projects and books
- **Connection**: Neon Database serverless driver for optimal performance

### Frontend Pages & Components
- **HomePage**: Main landing page with hero section highlighting backend expertise and GenAI skills
- **ProjectsSection**: Displays backend engineering projects (microservices, AI systems, cost optimization)
- **BookshelfSection**: Technical reading list with status-based tabs (system design, Java, ML books)
- **ContactSection**: Contact form with Nitesh's actual contact information
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

## Recent Changes (January 2025)

### Profile Customization
- Updated portfolio to reflect Nitesh Nandan's background as a Backend Engineer & GenAI Expert at Wayfair
- Replaced sample projects with real backend engineering projects:
  - Scalable Microservices Architecture (50K-70K RPS)
  - AI-Powered Bulk Messaging Platform
  - Cost Optimization System (25% cost reduction)
  - EDI Parser with multi-threading
  - Supplier Acquisition Platform
  - Computer Vision for crowd behavior analysis
- Updated skills section to focus on backend technologies:
  - Backend Development (Java, Spring Boot, Python, System Design)
  - Microservices & Architecture (Kubernetes, Docker, Redis, Kafka)
  - Database & Storage (MySQL, MongoDB, ElasticSearch, S3)
  - Generative AI (LangChain, GenAI, ML, Computer Vision)
  - Cloud & DevOps (AWS, GCP, EKS, Jenkins, ArgoCD)
  - Monitoring & Optimization (Prometheus, Grafana, Telegraf)
- Updated reading list with technical books relevant to backend engineering
- Updated contact information with actual details (email, phone, location, LinkedIn)
- Fixed TypeScript errors in storage layer for proper type handling

### Database Integration (January 2025)
- Created PostgreSQL database with proper schema using Drizzle ORM
- Implemented DatabaseStorage class replacing in-memory storage
- Added database connection layer with Neon serverless driver
- Created and executed seed script to populate database with sample data
- Verified all API endpoints working correctly with database integration
- Contact form submissions now persist to database