# Database (Legacy)

⚠️ **Note:** This folder contains legacy data from when the application used a JSON file as a database. The application now uses **PostgreSQL with Prisma ORM** for data persistence.

This JSON file is still used by the database seed script to populate the PostgreSQL database with initial brand data.

## Structure

### brands.json
A JSON file containing luxury brand data with the following schema:

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "founded": "number",
  "headquarters": "string",
  "location": {
    "lat": "number",
    "lng": "number",
    "address": "string"
  },
  "image": "string (URL)"
}
```

## Data

The database contains 8 luxury brands:
- Louis Vuitton
- Gucci
- Rolex
- Hermès
- Chanel
- Prada
- Cartier
- Burberry

Each brand includes:
- Basic information (name, description, category)
- Historical data (founding year)
- Location data (headquarters with coordinates for map display)
- Image URL

## Current Usage

This JSON file is used by the database seed script (`backend/prisma/seed.ts`) to populate the PostgreSQL database with initial brand data.

**The application now uses PostgreSQL instead of reading this file directly.**

## Migration to PostgreSQL

The application has been upgraded to use:
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Schema**: See `backend/prisma/schema.prisma`

For database setup and management, see:
- [Backend Database Documentation](../backend/DATABASE.md)
- [Database Schema](../backend/SCHEMA.md)
- [Setup Guide](../SETUP.md)

## Adding New Brands

To add new brands to the database:

1. Use Prisma Studio (recommended for development):
   ```bash
   cd backend
   npm run db:studio
   ```

2. Or use the Prisma API in your code:
   ```typescript
   await prisma.brand.create({
     data: {
       name: "Brand Name",
       description: "...",
       // ... other fields
     }
   });
   ```

3. Or add to this JSON file and re-run the seed script:
   ```bash
   cd backend
   npm run db:seed
   ```
