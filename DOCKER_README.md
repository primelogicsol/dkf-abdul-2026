# Docker Deployment Guide

## Dr. Kumar Foundation Website

This guide explains how to deploy the Dr. Kumar Foundation website using Docker.

## 📋 Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dr-kumar
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.docker .env

# Edit the .env file with your values
# IMPORTANT: Change all default passwords!
nano .env  # or use your preferred editor
```

### 3. Production Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Check service status
docker-compose ps
```

### 4. Development Mode

```bash
# Start development environment with hot reload
docker-compose --profile dev up app-dev db

# Access the application at http://localhost:3000
```

### 5. Access Database Admin (Development Only)

```bash
# Start pgAdmin
docker-compose --profile dev up pgadmin

# Access pgAdmin at http://localhost:5050
# Login with credentials from .env file
```

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js App   │  Port 3000
│   (Production)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PostgreSQL DB  │  Port 5432
│   (Persistent)  │
└─────────────────┘

Development Only:
┌─────────────────┐
│   Next.js App   │  Port 3000
│   (Dev Mode)    │  Hot Reload
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  PostgreSQL DB  │     │     pgAdmin     │  Port 5050
│   (Persistent)  │     │   (Web UI)      │
└─────────────────┘     └─────────────────┘
```

## 📦 Docker Services

| Service    | Port  | Description                          |
|------------|-------|--------------------------------------|
| app        | 3000  | Next.js production application       |
| app-dev    | 3000  | Next.js development (hot reload)     |
| db         | 5432  | PostgreSQL database                  |
| pgadmin    | 5050  | Database management UI (dev only)    |

## 🔧 Common Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f db
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart app
```

### Stop Services

```bash
# Stop all (keeps data)
docker-compose down

# Stop and remove volumes (deletes data!)
docker-compose down -v
```

### Rebuild Application

```bash
# Rebuild and restart
docker-compose up -d --build app
```

### Database Management

```bash
# Run Prisma migrations
docker-compose exec app npx prisma migrate deploy

# Open Prisma Studio
docker-compose exec app npx prisma studio --hostname 0.0.0.0
```

## 🔐 Security Notes

1. **Change Default Passwords**: Always change the default passwords in `.env` before deploying to production.

2. **Generate Secure Secrets**: Generate a strong NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

3. **Use HTTPS**: In production, use a reverse proxy (nginx, traefik) with SSL/TLS.

4. **Backup Database**: Regularly backup your PostgreSQL data:
   ```bash
   docker-compose exec db pg_dump -U drkumar_admin drkumar_foundation > backup.sql
   ```

## 📊 Monitoring

### Health Check

The application includes a health check endpoint:

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345.67
}
```

### Container Stats

```bash
docker stats dr-kumar-app dr-kumar-db
```

## 🔄 Updates

### Update Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up -d --build app

# Run new migrations
docker-compose exec app npx prisma migrate deploy
```

## 🐛 Troubleshooting

### Application Won't Start

```bash
# Check logs
docker-compose logs app

# Verify environment variables
docker-compose exec app env

# Check database connection
docker-compose exec app npm run db:push
```

### Database Connection Issues

```bash
# Check if database is running
docker-compose ps db

# Test database connection
docker-compose exec db psql -U drkumar_admin -d drkumar_foundation -c "SELECT 1"
```

### Port Already in Use

If port 3000 or 5432 is already in use, edit `docker-compose.yml` and change the port mappings:

```yaml
ports:
  - "3001:3000"  # Change host port to 3001
```

## 📝 Environment Variables

| Variable                   | Required | Description                           |
|----------------------------|----------|---------------------------------------|
| `POSTGRES_USER`            | Yes      | PostgreSQL username                   |
| `POSTGRES_PASSWORD`        | Yes      | PostgreSQL password                   |
| `POSTGRES_DB`              | Yes      | PostgreSQL database name              |
| `NEXTAUTH_SECRET`          | Yes      | NextAuth.js secret (min 32 chars)     |
| `NEXTAUTH_URL`             | No       | Application URL (default: localhost)  |
| `CLOUDINARY_*`             | No       | Cloudinary credentials for uploads    |
| `PGADMIN_EMAIL`            | Dev      | pgAdmin login email                   |
| `PGADMIN_PASSWORD`         | Dev      | pgAdmin login password                |

## 🎯 Production Recommendations

1. **Use Docker Swarm or Kubernetes** for orchestration
2. **Set up monitoring** with Prometheus/Grafana
3. **Configure log aggregation** with ELK stack or similar
4. **Use secrets management** (Docker Secrets, Vault)
5. **Implement CI/CD** pipeline for automated deployments
6. **Set up backups** for PostgreSQL data
7. **Use a reverse proxy** (nginx, traefik) with SSL/TLS

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Prisma with Docker](https://www.prisma.io/docs/guides/database/developing-with-prisma-docker)

## 🆘 Support

For issues or questions, please check:
- Application logs: `docker-compose logs app`
- Database logs: `docker-compose logs db`
- Health status: `http://localhost:3000/api/health`
