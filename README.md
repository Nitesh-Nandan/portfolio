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
4. **Frontend**: Lightweight state management with React Query

### Core Entities
- **Personal Info**: Contact details, bio, availability
- **Work Experience**: Job history with achievements
- **Projects**: Portfolio projects with technologies
- **Skills**: Technical skills by category
- **Books**: Reading list and completed books
- **Courses**: Learning progress and certifications
- **Articles**: Writing and publications

## 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** (optional, for database sync)

## 🚀 Installation & Setup

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd PersonalPortfolio
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```bash
# Database (Optional - for sync functionality)
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db

# Application
NODE_ENV=development
PORT=5000
```

### 3. Database Setup (Optional)
If you want to use database sync features:
```bash
# Push database schema
npm run db:push

# Sync JSON data to database
npm run sync:db
```

### 4. Initial Data Setup
Edit JSON files in `server/data/` with your information:
- `personal-info.json` - Your basic information
- `work-experience.json` - Job history
- `projects.json` - Portfolio projects
- `skills.json` - Technical skills
- `books.json` - Reading list
- `courses.json` - Learning progress
- `articles.json` - Publications

## 🖥️ Development

### Start Both Services (Recommended)
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin Panel: http://localhost:5173/admin

### Start Services Separately

#### Frontend Only
```bash
npm run dev:client
```
Starts Vite dev server on port 5173

#### Backend Only
```bash
npm run dev:server
```
Starts Express server on port 5000 in development mode

## 🏭 Production

### Build & Deploy
```bash
# Build the application
npm run build

# Start production server
npm start
```

The production server serves both the API and static files on the same port.

## 📜 NPM Scripts Reference

### Development Scripts
| Script | Description | Usage |
|--------|-------------|-------|
| `dev` | Start both frontend and backend concurrently | `npm run dev` |
| `dev:client` | Start only frontend (Vite) on port 5173 | `npm run dev:client` |
| `dev:server` | Start only backend (Express) in development mode | `npm run dev:server` |

### Build & Production Scripts
| Script | Description | Usage |
|--------|-------------|-------|
| `build` | Build frontend & bundle backend for production | `npm run build` |
| `start` | Start production server (requires build first) | `npm start` |
| `check` | Run TypeScript type checking | `npm run check` |

### Database Scripts
| Script | Description | Usage |
|--------|-------------|-------|
| `db:push` | Push database schema using Drizzle Kit | `npm run db:push` |
| `sync:db` | Sync JSON data → Database | `npm run sync:db` |

### Data Management Scripts
| Script | Description | Usage |
|--------|-------------|-------|
| `sync:static` | Copy JSON files to client public folder | `npm run sync:static` |

### Deployment Scripts
| Script | Description | Usage |
|--------|-------------|-------|
| `deploy` | Run custom deployment script | `npm run deploy` |

## 🔄 Data Synchronization

### JSON → Database (sync:db)
```bash
# Sync all JSON files to database
npm run sync:db
```
**Use when:** You've updated JSON files and want to sync to database

### Database → JSON (sync:fallback)
Add to package.json and run:
```bash
# Add this script to package.json first:
# "sync:fallback": "node server/scripts/sync-fallback-data.js"

npm run sync:fallback
```
**Use when:** You've made changes via admin panel and want to update JSON files

### Static Files (sync:static)
```bash
# Copy JSON files to client public folder
npm run sync:static
```
**Use when:** You want to serve JSON files directly from frontend

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── public/data/        # Static JSON files (via sync:static)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Data fetching hooks
│   │   └── lib/            # API client & utilities
├── server/                 # Express backend
│   ├── data/               # JSON data files (primary source)
│   │   ├── personal-info.json
│   │   ├── work-experience.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   ├── books.json
│   │   ├── courses.json
│   │   ├── articles.json
│   │   ├── categories.json
│   │   ├── contact-content.json
│   │   └── footer-content.json
│   ├── scripts/
│   │   ├── sync-data.ts         # JSON → DB sync
│   │   └── sync-fallback-data.js # DB → JSON sync
│   ├── data-service.ts     # Data layer with fallback logic
│   ├── routes.ts           # API endpoints
│   └── index.ts            # Server entry
├── shared/
│   └── schema.ts           # TypeScript schemas & types
├── scripts/
│   └── build-deploy.ts     # Deployment utilities
└── package.json            # NPM scripts & dependencies
```

## 🛠️ Data Management Workflows

### Method 1: Direct JSON Editing (Recommended)
1. Edit files in `server/data/`
2. Run `npm run sync:db` (if using database)
3. Restart dev server or just frontend

### Method 2: Admin Panel
1. Visit `/admin` in your browser
2. Use "Sync to Database" button
3. Make edits via forms
4. Use "Backup to JSON" to save changes back to files

### Method 3: Database-First (Advanced)
1. Make changes via database directly
2. Run `npm run sync:fallback` to update JSON files
3. Commit JSON changes to version control

## 📊 API Endpoints

### Public Data Endpoints
- `GET /api/personal-info` - Personal information
- `GET /api/work-experience` - Work history
- `GET /api/projects` - All projects
- `GET /api/projects/featured` - Featured projects only
- `GET /api/skills` - All skills
- `GET /api/skills?category=Frontend` - Skills by category
- `GET /api/books` - All books
- `GET /api/books/reading` - Books by status
- `GET /api/courses` - All courses
- `GET /api/courses/completed` - Completed courses
- `GET /api/courses/featured` - Featured courses
- `GET /api/articles` - All articles
- `GET /api/articles/featured` - Featured articles
- `GET /api/contact-content` - Contact page content
- `GET /api/footer-content` - Footer content
- `GET /api/categories` - All categories

### Admin Management Endpoints
- `POST /api/admin/sync-to-db` - Sync JSON to database
- `POST /api/admin/backup-to-json` - Backup database to JSON
- `PUT /api/admin/personal-info` - Update personal info

### Static File Endpoints
- `GET /data/*.json` - Direct access to JSON files

## 🔧 Configuration

### Environment Variables
```bash
# Required for database features
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db

# Optional
NODE_ENV=development|production
PORT=5000
```

### Adding New Data Types
1. Update `shared/schema.ts` with new types
2. Add JSON file to `server/data/`
3. Update `data-service.ts` with methods
4. Add API endpoints in `routes.ts`
5. Create frontend hooks in `use-data-queries.ts`
6. Update sync scripts if needed

## 🎯 Design Principles

1. **JSON First**: Files are the primary source of truth
2. **Database Optional**: Works without database connection
3. **Simple State**: React Query for caching, minimal complexity
4. **Minimal API**: Only essential endpoints
5. **Easy Updates**: Direct file editing or simple admin panel
6. **Solo Developer**: Built for single-user scenarios
7. **Fallback Ready**: Automatic graceful degradation

## 🚨 Troubleshooting

### Common Issues

**Database connection failed?**
- Check `DATABASE_URL` in `.env`
- App will fallback to JSON files automatically

**Frontend can't reach backend?**
- Ensure backend is running on port 5000
- Check console for CORS errors

**Data not updating?**
- Run `npm run sync:db` after JSON changes
- Clear browser cache
- Restart development server

**Admin panel not working?**
- Ensure you're running `npm run dev` (not just client)
- Check backend logs for errors

## 🤝 Contributing

This is designed as a personal portfolio template. Fork and customize for your needs!

### Common Customizations
- Update color scheme in `tailwind.config.ts`
- Modify components in `client/src/components/`
- Add new data types following the existing patterns
- Customize admin panel in `client/src/pages/admin.tsx`

---

**Perfect for solo developers who want a clean, maintainable portfolio without the overhead of complex CRUD operations or heavy state management.** 