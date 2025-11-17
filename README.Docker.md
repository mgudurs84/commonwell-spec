# Docker Deployment Guide

This guide explains how to deploy the CommonWell Health Alliance API Documentation Viewer using Docker.

## Prerequisites

- Docker installed (version 20.10 or later)
- Docker Compose installed (optional, for easier deployment)

## Quick Start

### Using Docker

1. **Build the Docker image:**
   ```bash
   docker build -t commonwell-api-docs .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 5000:5000 --name commonwell-docs commonwell-api-docs
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:5000`

### Using Docker Compose

1. **Start the application:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

## Configuration

### Environment Variables

You can pass environment variables to customize the deployment:

```bash
docker run -d \
  -p 5000:5000 \
  -e NODE_ENV=production \
  -e PORT=5000 \
  --name commonwell-docs \
  commonwell-api-docs
```

### Custom Port

To run on a different port:

```bash
docker run -d -p 8080:5000 --name commonwell-docs commonwell-api-docs
```

Then access at `http://localhost:8080`

## Docker Commands Reference

### Build Commands
```bash
# Build the image
docker build -t commonwell-api-docs .

# Build without cache
docker build --no-cache -t commonwell-api-docs .
```

### Run Commands
```bash
# Run in detached mode
docker run -d -p 5000:5000 --name commonwell-docs commonwell-api-docs

# Run with auto-restart
docker run -d -p 5000:5000 --restart unless-stopped --name commonwell-docs commonwell-api-docs

# Run with volume for logs
docker run -d -p 5000:5000 -v $(pwd)/logs:/app/logs --name commonwell-docs commonwell-api-docs
```

### Management Commands
```bash
# View logs
docker logs commonwell-docs

# Follow logs
docker logs -f commonwell-docs

# Stop container
docker stop commonwell-docs

# Start container
docker start commonwell-docs

# Restart container
docker restart commonwell-docs

# Remove container
docker rm commonwell-docs

# Remove image
docker rmi commonwell-api-docs
```

### Health Check
```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' commonwell-docs

# Execute health check manually
docker exec commonwell-docs wget --quiet --tries=1 --spider http://localhost:5000/api/categories
```

## Production Deployment

### With Nginx Reverse Proxy

1. Uncomment the nginx service in `docker-compose.yml`
2. Create `nginx.conf` file with your configuration
3. Run: `docker-compose up -d`

### Cloud Platforms

#### AWS ECS
```bash
# Tag for ECR
docker tag commonwell-api-docs:latest <account-id>.dkr.ecr.<region>.amazonaws.com/commonwell-api-docs:latest

# Push to ECR
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/commonwell-api-docs:latest
```

#### Google Cloud Run
```bash
# Tag for GCR
docker tag commonwell-api-docs gcr.io/<project-id>/commonwell-api-docs

# Push to GCR
docker push gcr.io/<project-id>/commonwell-api-docs
```

#### Azure Container Instances
```bash
# Tag for ACR
docker tag commonwell-api-docs <registry-name>.azurecr.io/commonwell-api-docs

# Push to ACR
docker push <registry-name>.azurecr.io/commonwell-api-docs
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs commonwell-docs

# Check if port is already in use
lsof -i :5000  # On macOS/Linux
netstat -ano | findstr :5000  # On Windows
```

### Build fails
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t commonwell-api-docs .
```

### Application not accessible
```bash
# Verify container is running
docker ps

# Check network settings
docker inspect commonwell-docs

# Test from inside container
docker exec commonwell-docs wget -O- http://localhost:5000/api/categories
```

## Performance Optimization

### Multi-platform builds
```bash
# Build for multiple architectures
docker buildx build --platform linux/amd64,linux/arm64 -t commonwell-api-docs .
```

### Image size optimization
The Dockerfile uses a multi-stage build to minimize the final image size:
- Builder stage: ~500MB (includes dev dependencies)
- Production stage: ~150MB (production dependencies only)

## Security Best Practices

1. **Run as non-root user** (add to Dockerfile if needed):
   ```dockerfile
   USER node
   ```

2. **Scan for vulnerabilities**:
   ```bash
   docker scan commonwell-api-docs
   ```

3. **Use specific base image versions**:
   Already implemented with `node:20-alpine`

## Support

For issues or questions, please refer to the main README.md or contact the development team.
