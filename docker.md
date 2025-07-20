# 🐳 Docker Commands Reference

This guide contains all the Docker commands needed to build, run, and manage your Personal Portfolio client application.

## 🏗️ Building the Image

### Build Basic Image
```bash
docker build -t personal-portfolio-client .
```

### Build with Tag and Version
```bash
docker build -t personal-portfolio-client:latest .
docker build -t personal-portfolio-client:v1.0.0 .
```

### Build with No Cache (Clean Build)
```bash
docker build --no-cache -t personal-portfolio-client .
```

### Build and Show Progress
```bash
docker build --progress=plain -t personal-portfolio-client .
```

## 🚀 Running the Container

### Basic Run Command
```bash
docker run -p 3000:80 personal-portfolio-client
```

### Recommended Run (Detached Mode)
```bash
docker run -d -p 3000:80 --name portfolio-client personal-portfolio-client
```

### Run with Different Ports
```bash
# Run on port 8080
docker run -d -p 8080:80 --name portfolio-client personal-portfolio-client

# Run on port 80 (requires sudo on some systems)
docker run -d -p 80:80 --name portfolio-client personal-portfolio-client
```

### Run with Environment Variables
```bash
docker run -d -p 3000:80 --name portfolio-client \
  -e NODE_ENV=production \
  personal-portfolio-client
```

### Run with Custom Network
```bash
docker run -d -p 3000:80 --name portfolio-client \
  --network portfolio-network \
  personal-portfolio-client
```

## 📊 Container Management

### View Running Containers
```bash
docker ps
docker ps -a  # Show all containers (including stopped)
```

### View Container Logs
```bash
docker logs portfolio-client
docker logs -f portfolio-client  # Follow logs in real-time
docker logs --tail 50 portfolio-client  # Show last 50 lines
```

### Stop Container
```bash
docker stop portfolio-client
```

### Start Stopped Container
```bash
docker start portfolio-client
```

### Restart Container
```bash
docker restart portfolio-client
```

### Remove Container
```bash
docker rm portfolio-client
docker rm -f portfolio-client  # Force remove (stops and removes)
```

## 🔍 Inspection and Debugging

### Inspect Container
```bash
docker inspect portfolio-client
```

### View Container Stats
```bash
docker stats portfolio-client
docker stats --no-stream portfolio-client  # One-time stats
```

### Execute Commands in Running Container
```bash
# Enter container shell
docker exec -it portfolio-client sh

# Run specific command
docker exec portfolio-client ls -la /usr/share/nginx/html
```

### View Container Processes
```bash
docker top portfolio-client
```

## 🗂️ Image Management

### List Images
```bash
docker images
docker images personal-portfolio-client
```

### Remove Image
```bash
docker rmi personal-portfolio-client
docker rmi personal-portfolio-client:v1.0.0
```

### Tag Image
```bash
docker tag personal-portfolio-client:latest personal-portfolio-client:v1.0.0
```

### Save Image to File
```bash
docker save personal-portfolio-client > portfolio-client.tar
```

### Load Image from File
```bash
docker load < portfolio-client.tar
```

## 🚀 Quick Commands

### Build and Run in One Command
```bash
docker build -t personal-portfolio-client . && docker run -d -p 3000:80 --name portfolio-client personal-portfolio-client
```

### Stop and Remove Container
```bash
docker stop portfolio-client && docker rm portfolio-client
```

### Complete Cleanup (Container + Image)
```bash
docker stop portfolio-client && docker rm portfolio-client && docker rmi personal-portfolio-client
```

### Rebuild and Replace
```bash
docker stop portfolio-client && docker rm portfolio-client && docker build -t personal-portfolio-client . && docker run -d -p 3000:80 --name portfolio-client personal-portfolio-client
```

## 🌐 Access Points

After running the container, access your application at:

- **Local Development**: http://localhost:3000
- **Custom Port (8080)**: http://localhost:8080
- **Standard HTTP (80)**: http://localhost

## 🔧 Troubleshooting Commands

### Check Container Health
```bash
docker inspect --format='{{.State.Health.Status}}' portfolio-client
```

### View Container File System
```bash
docker exec portfolio-client ls -la /usr/share/nginx/html
```

### Check Nginx Configuration
```bash
docker exec portfolio-client cat /etc/nginx/conf.d/default.conf
```

### Test Container Connectivity
```bash
docker exec portfolio-client wget -qO- http://localhost
```

### Check Port Usage
```bash
# On host system
lsof -i :3000
netstat -tulpn | grep :3000
```

## 🧹 Cleanup Commands

### Remove All Stopped Containers
```bash
docker container prune
```

### Remove Unused Images
```bash
docker image prune
docker image prune -a  # Remove all unused images
```

### Complete Docker Cleanup
```bash
docker system prune -a --volumes
```

## 📝 Common Use Cases

### Development Workflow
```bash
# 1. Build image
docker build -t personal-portfolio-client .

# 2. Run container
docker run -d -p 3000:80 --name portfolio-client personal-portfolio-client

# 3. View logs
docker logs -f portfolio-client

# 4. Make changes and rebuild
docker stop portfolio-client && docker rm portfolio-client
docker build -t personal-portfolio-client .
docker run -d -p 3000:80 --name portfolio-client personal-portfolio-client
```

### Production Deployment
```bash
# Build production image
docker build -t personal-portfolio-client:prod .

# Run with production settings
docker run -d -p 80:80 --name portfolio-client-prod \
  --restart unless-stopped \
  personal-portfolio-client:prod
```

## 📚 Additional Resources

- **Docker Documentation**: https://docs.docker.com/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Container Logs**: Use `docker logs` to debug issues
- **Health Checks**: Monitor container status with `docker ps`

---

## 🎯 Quick Reference

| Action | Command |
|--------|---------|
| Build | `docker build -t personal-portfolio-client .` |
| Run | `docker run -d -p 3000:80 --name portfolio-client personal-portfolio-client` |
| Stop | `docker stop portfolio-client` |
| Remove | `docker rm portfolio-client` |
| Logs | `docker logs -f portfolio-client` |
| Shell | `docker exec -it portfolio-client sh` |

Happy Dockerizing! 🐳✨ 