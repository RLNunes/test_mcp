# Complete Setup Guide

This guide will walk you through setting up the Luxury Brands application with PostgreSQL database.

## Prerequisites

Make sure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 12+** - [Installation Guide](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RLNunes/test_mcp.git
cd test_mcp
```

### 2. Set Up PostgreSQL Database

#### Option A: Using psql Command Line

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE luxury_brands;

# Optional: Create a dedicated user
CREATE USER luxury_app WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE luxury_brands TO luxury_app;

# Exit psql
\q
```

#### Option B: Using pgAdmin or GUI Tool

1. Open your PostgreSQL GUI tool
2. Create a new database named `luxury_brands`
3. Note your connection credentials

#### Option C: Using Docker

```bash
docker run --name postgres-luxury \
  -e POSTGRES_DB=luxury_brands \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:14
```

### 3. Configure Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
# Update DATABASE_URL with your actual PostgreSQL connection string
```

Your `.env` file should look like:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/luxury_brands?schema=public"
```

Replace:
- `postgres` with your PostgreSQL username
- `password` with your PostgreSQL password
- `localhost:5432` if using a different host/port

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate

# Seed database with initial data
npm run db:seed
```

You should see output indicating:
- ✓ 8 brands seeded (Louis Vuitton, Gucci, Rolex, etc.)
- ✓ 3 sample agents created
- ✓ Agent-brand associations created

### 5. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 6. Start the Application

#### Option A: Using Convenience Scripts

From the project root:

```bash
# Start all services (backend + frontend)
./start-all.sh

# Stop all services
./stop-all.sh
```

#### Option B: Manual Start (Recommended for Development)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will start at http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will start at http://localhost:3001

### 7. Verify Setup

1. Open your browser to http://localhost:3001
2. You should see the luxury brands application
3. Verify data is loading from the database

Test the API endpoints:
- http://localhost:3000/api/brands - List all brands
- http://localhost:3000/api/brands/1 - Get specific brand
- http://localhost:3000/api/agents - List all agents with their brands

### 8. Explore Database (Optional)

Prisma Studio provides a visual interface for your database:

```bash
cd backend
npm run db:studio
```

Access at http://localhost:5555

## Troubleshooting

### Database Connection Issues

**Error: "Can't reach database server"**

1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Check your `.env` file has the correct credentials
3. Ensure PostgreSQL is accepting connections from localhost

**Error: "Database does not exist"**

```bash
# Create the database
createdb luxury_brands
```

### Migration Issues

**Error: "Migration failed"**

1. Reset the database (development only):
   ```bash
   cd backend
   npx prisma migrate reset
   ```

2. Run migrations again:
   ```bash
   npm run db:migrate
   ```

### Port Already in Use

**Error: "Port 3000 is already in use"**

1. Find and kill the process:
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. Or use different ports by modifying `package.json` scripts

### Prisma Client Issues

**Error: "Prisma Client not found"**

```bash
cd backend
npm run db:generate
```

## Development Workflow

### Database Schema Changes

When you need to modify the database schema:

1. Edit `backend/prisma/schema.prisma`
2. Create and apply migration:
   ```bash
   npm run db:migrate
   ```
3. Prisma Client will be regenerated automatically

### Resetting Database

To start fresh (development only):

```bash
cd backend
npx prisma migrate reset
```

This will:
- Drop the database
- Recreate it
- Run all migrations
- Run seed script

## Production Deployment

For production deployment, you'll need:

1. **Database Hosting**: 
   - Vercel Postgres
   - Neon
   - Railway
   - AWS RDS
   - Heroku Postgres

2. **Backend Hosting**:
   - Vercel
   - Railway
   - Heroku
   - AWS

3. **Frontend Hosting**:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront

Set environment variables in your hosting platform:
```env
DATABASE_URL="postgresql://user:pass@host:port/dbname?schema=public"
```

## Additional Resources

- [Backend API Documentation](./backend/README.md)
- [Database Setup Guide](./backend/DATABASE.md)
- [Frontend Documentation](./frontend/README.md)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review the error messages carefully
3. Consult the documentation linked above
4. Open an issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, PostgreSQL version)

## Success Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `luxury_brands` created
- [ ] Backend dependencies installed
- [ ] `.env` file configured with correct DATABASE_URL
- [ ] Migrations run successfully
- [ ] Database seeded with initial data
- [ ] Frontend dependencies installed
- [ ] Backend server running on port 3000
- [ ] Frontend server running on port 3001
- [ ] Application accessible at http://localhost:3001
- [ ] API endpoints returning data correctly

Congratulations! Your luxury brands application is now running with PostgreSQL! 🎉
