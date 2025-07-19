# Personal Portfolio - Minimal & Efficient

A streamlined personal portfolio website built with simplicity and efficiency in mind. Perfect for solo developers who want a clean, maintainable portfolio without unnecessary complexity.

## ✨ Key Features

- **Hybrid Data Storage**: JSON files as primary source + PostgreSQL as backup/sync
- **Minimal API**: Read-only endpoints with automatic fallback
- **Simple Admin Panel**: Easy data management without complex CRUD operations
- **Modern Stack**: React, TypeScript, Tailwind CSS, Express.js
- **Automatic Fallback**: If database is down, serves from local JSON files

## 🏗️ Architecture

### Data Flow
1. **Primary Source**: JSON files in `server/data/`
2. **Database Sync**: Optional PostgreSQL backup
3. **API**: Simple read-only endpoints with fallback logic
4. **Frontend**: Lightweight state management (no complex React Query)

### Core Entities
- **Personal Info**: Contact details, bio, availability
- **Work Experience**: Job history with achievements
- **Projects**: Portfolio projects with technologies
- **Skills**: Technical skills by category
- **Books**: Reading list and completed books

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Simple data hooks
│   │   └── lib/            # API client
├── server/                 # Express backend
│   ├── data/               # JSON data files (primary source)
│   │   ├── personal-info.json
│   │   ├── work-experience.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── books.json
│   ├── data-service.ts     # Unified data service
│   ├── routes.ts           # Minimal API routes
│   └── index.ts            # Server entry
└── shared/
    └── schema.ts           # Simplified type definitions
```

## 🛠️ Data Management

### JSON Files (Primary)
Edit files in `server/data/` for content updates:
- Direct file editing for bulk changes
- Version control friendly
- Always available (no database dependency)

### Database Sync
Use the admin panel (`/admin`) for:
- **Sync to Database**: Upload JSON → PostgreSQL  
- **Backup to JSON**: Download PostgreSQL → JSON
- **Quick Edits**: Simple form updates

### Admin Panel
Visit `/admin` for:
- Data synchronization controls
- Quick personal info updates
- File management guidance

## 🔧 Configuration

### Environment Variables
```bash
DATABASE_URL=postgresql://...  # Optional - for database sync
NODE_ENV=development|production
```

### Adding New Data
1. Update `shared/schema.ts` with new types
2. Add JSON file to `server/data/`
3. Update `data-service.ts` with methods
4. Add API endpoints in `routes.ts`
5. Create frontend hooks in `use-data-queries.ts`

## 📊 API Endpoints

### Public (Read-only)
- `GET /api/personal-info` - Personal information
- `GET /api/work-experience` - Work history
- `GET /api/projects` - All projects
- `GET /api/projects/featured` - Featured projects  
- `GET /api/skills` - All skills
- `GET /api/skills?category=Frontend` - Skills by category
- `GET /api/books` - All books
- `GET /api/books/reading` - Books by status

### Admin (Management)
- `POST /api/admin/sync-to-db` - Sync JSON to database
- `POST /api/admin/backup-to-json` - Backup database to JSON
- `PUT /api/admin/personal-info` - Update personal info

## 🎯 Design Principles

1. **JSON First**: Files are the primary source of truth
2. **Database Optional**: Works without database connection
3. **Simple State**: Basic React hooks, no complex caching
4. **Minimal API**: Only essential endpoints
5. **Easy Updates**: Direct file editing or simple admin panel
6. **Solo Developer**: Built for single-user scenarios

## 🔄 Migration from Complex Setup

If migrating from a complex portfolio:
1. Export your data to JSON format
2. Place files in `server/data/`
3. Update schema types as needed
4. Use admin panel to sync to database
5. Remove old complex components/hooks

## 🤝 Contributing

This is designed as a personal portfolio template. Fork and customize for your needs!

---

**Perfect for solo developers who want a clean, maintainable portfolio without the overhead of complex CRUD operations or heavy state management.** 