# Backend API

This is the backend API for the Luxury Brands application built with Next.js. It provides RESTful endpoints to access luxury brand data.

## Architecture

The backend follows **SOLID principles** and **KISS (Keep It Simple, Stupid)** methodology:

- **Single Responsibility Principle**: BrandService class handles only data operations
- **Open/Closed Principle**: Services can be extended without modifying existing code
- **Interface Segregation**: Clean API interfaces for brand data
- **Dependency Inversion**: Services depend on abstractions, not concrete implementations

## Database

This application uses **PostgreSQL** with **Prisma ORM** for data persistence. See [DATABASE.md](./DATABASE.md) for detailed setup instructions.

### Why PostgreSQL?
- Production-ready relational database
- Excellent support for complex relationships (agents, brands, customers)
- Type-safe with Prisma ORM
- Scalable for future growth

## API Endpoints

### GET /api/brands
Fetches all luxury brands from the database.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Louis Vuitton",
      "description": "...",
      "category": "Fashion & Leather Goods",
      "founded": 1854,
      "headquarters": "Paris, France",
      "location": {
        "lat": 48.8566,
        "lng": 2.3522,
        "address": "..."
      },
      "image": "https://..."
    }
  ]
}
```

### GET /api/brands/[id]
Fetches a specific brand by ID from the database.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Louis Vuitton",
    "...": "..."
  }
}
```

### GET /api/agents
Fetches all agents with their associated brands.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@luxury.com",
      "phone": "+1-555-0101",
      "expertise": "Fashion & Leather Goods",
      "active": true,
      "brands": [
        {
          "id": "1",
          "name": "Louis Vuitton",
          "category": "Fashion & Leather Goods"
        }
      ]
    }
  ]
}
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL 12+ installed and running

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database (see [DATABASE.md](./DATABASE.md) for details):
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your PostgreSQL credentials

# Run migrations and seed
npm run db:migrate
npm run db:seed
```

### Development

Run the development server:

```bash
npm run dev
```

The API will be available at [http://localhost:3000/api](http://localhost:3000/api)

### Build

Build for production:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── agents/
│   │   │   └── route.ts          # GET all agents
│   │   └── brands/
│   │       ├── route.ts          # GET all brands
│   │       └── [id]/
│   │           └── route.ts      # GET brand by ID
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── prisma.ts                 # Prisma client singleton
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seed script
├── .env                          # Environment variables (not committed)
├── .env.example                  # Example environment file
├── package.json
└── tsconfig.json
```

## Code Quality

- TypeScript for type safety
- ESLint for code linting
- Clean, readable code following KISS principle
- Modular architecture for scalability

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/luxury_brands?schema=public"
```

See `.env.example` for the template and [DATABASE.md](./DATABASE.md) for detailed setup instructions.

## Database Management

Use these commands for database operations:

```bash
npm run db:generate    # Generate Prisma Client
npm run db:migrate     # Run database migrations
npm run db:seed        # Seed database with initial data
npm run db:studio      # Open Prisma Studio (database GUI)
```

## Testing

To test the API:

1. Ensure PostgreSQL is running and database is set up
2. Start the development server: `npm run dev`
3. Access the endpoints:
   - http://localhost:3000/api/brands
   - http://localhost:3000/api/brands/1
   - http://localhost:3000/api/agents

## Future Enhancements

- ✅ ~~Add database connection (PostgreSQL)~~
- ✅ ~~Support for agents and brand relationships~~
- Implement authentication
- Add input validation
- Implement caching
- Add rate limiting
- Write unit and integration tests
- Add customer management endpoints
