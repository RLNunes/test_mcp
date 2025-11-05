# Quick Start Guide - Backend

Fast setup guide for developers already familiar with Node.js and PostgreSQL.

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Git

## 5-Minute Setup

### 1. Clone & Install

```bash
git clone https://github.com/RLNunes/test_mcp.git
cd test_mcp/backend
npm install
```

### 2. Database Setup

```bash
# Create database
createdb luxury_brands

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL
```

### 3. Initialize Database

```bash
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Create tables
npm run db:seed      # Load initial data
```

### 4. Start Development

```bash
npm run dev
```

Backend runs on http://localhost:3000

## API Endpoints

### Brands
- `GET /api/brands` - List all brands
- `GET /api/brands/:id` - Get brand by ID

### Agents
- `GET /api/agents` - List all agents with their brands

## Common Commands

```bash
# Database
npm run db:generate    # Regenerate Prisma Client after schema changes
npm run db:migrate     # Create and apply migrations
npm run db:seed        # Seed database with data
npm run db:studio      # Open Prisma Studio (GUI)

# Development
npm run dev            # Start dev server
npm run build          # Build for production
npm start              # Start production server
npm run lint           # Run ESLint
```

## Database Schema

```
Brand (id, name, category, description, location...)
  ↕ (many-to-many)
Agent (id, name, email, expertise, active...)

Join Table: AgentBrand
```

## Making Schema Changes

1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Prisma Client auto-regenerates

## Project Structure

```
backend/
├── app/api/          # API routes
│   ├── brands/       # Brand endpoints
│   └── agents/       # Agent endpoints
├── lib/              # Shared utilities
│   └── prisma.ts     # Prisma client
└── prisma/           # Database
    ├── schema.prisma # Database schema
    └── seed.ts       # Seed script
```

## Troubleshooting

**Can't connect to database?**
```bash
# Check PostgreSQL is running
pg_isready

# Verify DATABASE_URL in .env
```

**Prisma Client not found?**
```bash
npm run db:generate
```

**Migration failed?**
```bash
# Reset database (dev only)
npx prisma migrate reset
```

## Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/luxury_brands?schema=public"
```

## Testing API

Use curl, Postman, or browser:

```bash
# Get all brands
curl http://localhost:3000/api/brands

# Get specific brand
curl http://localhost:3000/api/brands/1

# Get all agents
curl http://localhost:3000/api/agents
```

## Next Steps

- Read [DATABASE.md](./DATABASE.md) for detailed setup
- Read [SCHEMA.md](./SCHEMA.md) for schema documentation
- Read [README.md](./README.md) for full documentation

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
