# Database Setup Guide

This application uses **PostgreSQL** with **Prisma ORM** for database management.

## Why PostgreSQL?

PostgreSQL was chosen as the database for this project for several reasons:

1. **Relational Data Model**: Perfect for managing relationships between brands, agents, and customers
2. **Many-to-Many Relationships**: Excellent support for complex relationships (e.g., agents working with multiple brands)
3. **Scalability**: Production-ready and capable of handling growth
4. **Type Safety**: Works seamlessly with Prisma ORM for type-safe database access
5. **JSONB Support**: Flexibility for storing semi-structured data when needed
6. **Strong Ecosystem**: Well-supported in the Node.js/TypeScript ecosystem

## Database Schema

The database includes three main models:

### Brand
Stores luxury brand information including:
- Basic info (name, description, category)
- Historical data (founding year)
- Location data (coordinates and address for maps)
- Image URL

### Agent
Stores information about agents who help customers:
- Personal info (name, email, phone)
- Expertise area
- Active status

### AgentBrand (Join Table)
Manages many-to-many relationships between agents and brands:
- One agent can work with multiple brands
- One brand can have multiple agents

## Prerequisites

Before setting up the database, ensure you have:

- **PostgreSQL 12+** installed and running
- **Node.js 18+** installed
- Access to create databases

## Installation

### 1. Install PostgreSQL

#### macOS (using Homebrew)
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Windows
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

Connect to PostgreSQL and create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE luxury_brands;

# Create user (optional, for security)
CREATE USER luxury_app WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE luxury_brands TO luxury_app;

# Exit
\q
```

### 3. Configure Environment

Copy the example environment file and update it:

```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/luxury_brands?schema=public"
```

Replace:
- `postgres` with your PostgreSQL username
- `your_password` with your PostgreSQL password
- `localhost:5432` if using a different host/port

## Setup Steps

### 1. Generate Prisma Client

```bash
npm run db:generate
```

This generates the TypeScript types and Prisma Client based on your schema.

### 2. Run Migrations

```bash
npm run db:migrate
```

This will:
- Create the database tables
- Apply the schema to your database
- Automatically run the seed script (if configured)

### 3. Seed the Database (Optional)

If not automatically run, seed the database with initial data:

```bash
npm run db:seed
```

This will:
- Import all brands from the existing `brands.json` file
- Create sample agents
- Associate agents with brands based on expertise

## Available Scripts

- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio (GUI for viewing/editing data)

## Prisma Studio

Prisma Studio is a visual database browser. Launch it with:

```bash
npm run db:studio
```

Access it at: http://localhost:5555

## Migration Workflow

When you modify the schema:

1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate` to create and apply migration
3. Prisma Client will be automatically regenerated

## Production Deployment

For production, use environment variables:

```env
DATABASE_URL="postgresql://user:password@production-host:5432/luxury_brands?schema=public"
```

### Recommended Hosting Options

- **Vercel Postgres** - Integrated with Vercel deployments
- **Neon** - Serverless Postgres with free tier
- **Railway** - Simple deployment with PostgreSQL
- **AWS RDS** - Managed PostgreSQL service
- **Heroku Postgres** - Easy setup and scaling

## Troubleshooting

### Connection Issues

If you can't connect to the database:

1. Check PostgreSQL is running:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Verify connection string in `.env`
3. Check firewall settings
4. Ensure PostgreSQL accepts connections from your host

### Migration Errors

If migrations fail:

1. Check database exists and is accessible
2. Ensure user has proper permissions
3. Try resetting the database (development only):
   ```bash
   npx prisma migrate reset
   ```

### Prisma Client Issues

If you get "Prisma Client not found" errors:

```bash
npm run db:generate
```

## Backup and Restore

### Backup
```bash
pg_dump -U postgres luxury_brands > backup.sql
```

### Restore
```bash
psql -U postgres luxury_brands < backup.sql
```

## Further Reading

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
