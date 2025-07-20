# Vercel CLI Commands & Project Commands

This document contains all the CLI commands related to deploying and managing your portfolio project on Vercel.

## 🚀 Vercel CLI Commands

### Installation
```bash
# Install Vercel CLI globally
npm install -g vercel

# Or using yarn
yarn global add vercel
```

### Authentication
```bash
# Login to Vercel
vercel login

# Logout from Vercel
vercel logout

# Check current user
vercel whoami
```

### Project Management
```bash
# Initialize a new Vercel project
vercel

# Link to existing project
vercel link

# Unlink from current project
vercel unlink

# List all projects
vercel projects ls

# Get project info
vercel project ls
```

### Deployment Commands
```bash
# Deploy to preview environment
vercel

# Deploy to production
vercel --prod

# Deploy with automatic yes to prompts
vercel --prod --yes

# Deploy with specific environment variables
vercel --prod --env VITE_API_MODE=static

# Deploy with custom build command
vercel --prod --build-env NODE_ENV=production
```

### Environment Variables
```bash
# Add environment variable
vercel env add VITE_API_MODE

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VITE_API_MODE

# Pull environment variables to local .env file
vercel env pull .env.local
```

### Domains & Aliases
```bash
# List domains
vercel domains ls

# Add custom domain
vercel domains add yourdomain.com

# Remove custom domain
vercel domains rm yourdomain.com

# List aliases
vercel alias ls

# Add alias
vercel alias add yourdomain.com

# Remove alias
vercel alias rm yourdomain.com
```

### Logs & Monitoring
```bash
# View deployment logs
vercel logs

# View function logs
vercel logs --function=api

# View real-time logs
vercel logs --follow

# View logs for specific deployment
vercel logs --url=https://your-project.vercel.app
```

### Team Management
```bash
# List team members
vercel teams ls

# Add team member
vercel teams invite user@example.com

# Remove team member
vercel teams rm user@example.com

# Switch between teams
vercel switch
```

## 🛠️ Project-Specific Commands

### Development
```bash
# Start development server (client + server)
npm run dev

# Start only client development server
npm run dev:client

# Start only server development server
npm run dev:server

# Check TypeScript types
npm run check
```

### Building
```bash
# Build for production
npm run build

# Build client only
npm run build:client

# Build for Vercel deployment
npm run vercel-build

# Sync static data to client/public/data
npm run sync:static
```

### Database Operations
```bash
# Push database schema changes
npm run db:push

# Sync database data to cache
npm run sync:db

# Sync cache data to database
npm run sync:cache
```

### Deployment Scripts
```bash
# Run custom deployment script
npm run deploy

# Execute Vercel build script
./scripts/vercel-build.sh

# Execute simple deployment script
./scripts/deploy-simple.sh
```

## 📁 Project Structure Commands

### File Operations
```bash
# Create necessary directories
mkdir -p client/public/data

# Copy static data files
cp server/data/cache/*.json client/public/data/

# Sync all static data
npm run sync:static
```

### Git Operations
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Deploy to Vercel"

# Push to remote repository
git push origin main

# Create new branch
git checkout -b feature/new-feature
```

## 🔧 Environment Configuration

### Environment Variables
```bash
# Set API mode to static
export VITE_API_MODE=static

# Set API mode to API
export VITE_API_MODE=api

# Set API base URL
export VITE_API_BASE_URL=https://your-api.vercel.app

# Set static data path
export VITE_STATIC_DATA_PATH=/data
```

### Local Development
```bash
# Create .env.local file
touch .env.local

# Add environment variables to .env.local
echo "VITE_API_MODE=static" >> .env.local
echo "VITE_API_BASE_URL=http://localhost:3000" >> .env.local
```

## 🐳 Docker Commands (Alternative Deployment)

### Docker Operations
```bash
# Build Docker image
docker build -t portfolio .

# Run Docker container
docker run -p 3000:3000 portfolio

# Build and run with Docker Compose
docker-compose up --build

# Stop Docker containers
docker-compose down
```

## 📊 Monitoring & Debugging

### Performance Monitoring
```bash
# View Vercel analytics
vercel analytics

# View function performance
vercel functions ls

# View deployment status
vercel ls
```

### Debugging
```bash
# View detailed deployment info
vercel inspect

# View function details
vercel functions inspect function-name

# View edge config
vercel edge-config ls
```

## 🔄 CI/CD Integration

### GitHub Actions
```bash
# Trigger deployment via GitHub
git push origin main

# Manual deployment trigger
vercel --prod --token $VERCEL_TOKEN
```

### Environment-Specific Deployments
```bash
# Deploy to staging
vercel --env VITE_API_MODE=api

# Deploy to production with static mode
vercel --prod --env VITE_API_MODE=static
```

## 📝 Useful Tips

1. **Always test locally before deploying:**
   ```bash
   npm run build:client
   npm run dev:client
   ```

2. **Check your vercel.json configuration:**
   - Ensure `buildCommand` points to correct script
   - Verify `outputDirectory` is correct
   - Check `rewrites` for SPA routing

3. **Monitor deployment logs:**
   ```bash
   vercel logs --follow
   ```

4. **Use environment variables for different deployments:**
   - Development: `VITE_API_MODE=api`
   - Production: `VITE_API_MODE=static`

5. **Sync static data before deployment:**
   ```bash
   npm run sync:static
   ```

## 🚨 Troubleshooting

### Common Issues
```bash
# Clear Vercel cache
vercel --clear-cache

# Remove and relink project
vercel unlink
vercel link

# Check deployment status
vercel ls

# View detailed error logs
vercel logs --debug
```

### Build Issues
```bash
# Clean node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vercel build cache
vercel --clear-cache

# Force rebuild
vercel --force
```

---

**Note:** Always ensure you have the latest version of Vercel CLI installed:
```bash
npm update -g vercel
``` 