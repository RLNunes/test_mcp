# Database Schema Documentation

This document provides a detailed overview of the database schema for the Luxury Brands application.

## Entity Relationship Diagram

```
┌─────────────────────────────────────────┐
│              BRANDS                      │
├─────────────────────────────────────────┤
│ PK  id: string (cuid)                   │
│ UK  name: string                         │
│     description: string                  │
│     category: string                     │
│     founded: integer                     │
│     headquarters: string                 │
│     lat: float                           │
│     lng: float                           │
│     address: string                      │
│     image: string                        │
│     createdAt: timestamp                 │
│     updatedAt: timestamp                 │
└──────────────┬──────────────────────────┘
               │
               │ 1
               │
               │ N
               │
        ┌──────┴──────────────────────────────┐
        │                                      │
┌───────▼────────────────┐       ┌────────────▼──────────────┐
│   AGENT_BRANDS         │       │       AGENTS              │
├────────────────────────┤       ├───────────────────────────┤
│ PK  id: string (cuid)  │       │ PK  id: string (cuid)     │
│ FK  agentId: string────┼───────┤ UK  email: string         │
│ FK  brandId: string    │       │     name: string          │
│     createdAt: timestamp│       │     phone: string?        │
│                        │       │     expertise: string?    │
│ UK (agentId, brandId)  │       │     active: boolean       │
│                        │       │     createdAt: timestamp  │
└────────────────────────┘       │     updatedAt: timestamp  │
                                 └───────────────────────────┘

Legend:
PK = Primary Key
FK = Foreign Key
UK = Unique Constraint
? = Nullable field
```

## Tables

### 1. brands

Stores information about luxury brands.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | STRING | PRIMARY KEY | Unique identifier (CUID) |
| name | STRING | UNIQUE, NOT NULL | Brand name (e.g., "Louis Vuitton") |
| description | STRING | NOT NULL | Detailed brand description |
| category | STRING | NOT NULL | Brand category (e.g., "Fashion & Leather Goods") |
| founded | INTEGER | NOT NULL | Year the brand was founded |
| headquarters | STRING | NOT NULL | Location of headquarters |
| lat | FLOAT | NOT NULL | Latitude coordinate for map display |
| lng | FLOAT | NOT NULL | Longitude coordinate for map display |
| address | STRING | NOT NULL | Full address of headquarters |
| image | STRING | NOT NULL | URL to brand image |
| createdAt | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Record update timestamp |

**Indexes:**
- Primary Key on `id`
- Unique Index on `name`

**Example:**
```json
{
  "id": "clx1y2z3a4b5c6d7e8f9",
  "name": "Louis Vuitton",
  "description": "French luxury fashion house...",
  "category": "Fashion & Leather Goods",
  "founded": 1854,
  "headquarters": "Paris, France",
  "lat": 48.8566,
  "lng": 2.3522,
  "address": "22 Avenue Montaigne, 75008 Paris, France",
  "image": "https://images.unsplash.com/...",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 2. agents

Stores information about agents who help customers with brand-related inquiries.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | STRING | PRIMARY KEY | Unique identifier (CUID) |
| name | STRING | NOT NULL | Agent's full name |
| email | STRING | UNIQUE, NOT NULL | Agent's email address |
| phone | STRING | NULLABLE | Agent's phone number |
| expertise | STRING | NULLABLE | Area of expertise (e.g., "Fashion & Accessories") |
| active | BOOLEAN | NOT NULL, DEFAULT TRUE | Whether agent is currently active |
| createdAt | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Record update timestamp |

**Indexes:**
- Primary Key on `id`
- Unique Index on `email`

**Example:**
```json
{
  "id": "clx9a8b7c6d5e4f3g2h1",
  "name": "Sarah Johnson",
  "email": "sarah.johnson@luxury.com",
  "phone": "+1-555-0101",
  "expertise": "Fashion & Leather Goods",
  "active": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 3. agent_brands

Junction table implementing many-to-many relationship between agents and brands.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | STRING | PRIMARY KEY | Unique identifier (CUID) |
| agentId | STRING | FOREIGN KEY → agents.id | Reference to agent |
| brandId | STRING | FOREIGN KEY → brands.id | Reference to brand |
| createdAt | TIMESTAMP | NOT NULL, DEFAULT NOW() | Record creation timestamp |

**Indexes:**
- Primary Key on `id`
- Composite Unique Index on `(agentId, brandId)`

**Foreign Keys:**
- `agentId` references `agents(id)` with CASCADE on delete
- `brandId` references `brands(id)` with CASCADE on delete

**Example:**
```json
{
  "id": "clx5h6i7j8k9l0m1n2o3",
  "agentId": "clx9a8b7c6d5e4f3g2h1",
  "brandId": "clx1y2z3a4b5c6d7e8f9",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Relationships

### Brand ↔ Agent (Many-to-Many)

**Description:** An agent can work with multiple brands, and a brand can have multiple agents.

**Implementation:** Through the `agent_brands` junction table.

**Query Examples:**

Get all brands for an agent:
```typescript
const agent = await prisma.agent.findUnique({
  where: { id: agentId },
  include: {
    brands: {
      include: {
        brand: true
      }
    }
  }
});
```

Get all agents for a brand:
```typescript
const brand = await prisma.brand.findUnique({
  where: { id: brandId },
  include: {
    agents: {
      include: {
        agent: true
      }
    }
  }
});
```

## Future Extensions

### Customer Table (Planned)

```prisma
model Customer {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  interactions Interaction[]
  
  @@map("customers")
}
```

### Interaction Table (Planned)

```prisma
model Interaction {
  id         String   @id @default(cuid())
  customerId String
  agentId    String
  brandId    String?
  notes      String
  type       String   // "inquiry", "purchase", "complaint", etc.
  status     String   // "open", "in-progress", "closed"
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  customer Customer @relation(fields: [customerId], references: [id])
  agent    Agent    @relation(fields: [agentId], references: [id])
  brand    Brand?   @relation(fields: [brandId], references: [id])
  
  @@map("interactions")
}
```

This would create:
```
CUSTOMERS ──1:N── INTERACTIONS ──N:1── AGENTS
                       │
                       │ N:1
                       │
                    BRANDS
```

## Data Integrity

### Constraints

1. **Unique Constraints**
   - Brand names must be unique
   - Agent emails must be unique
   - Agent-brand associations must be unique (no duplicates)

2. **Foreign Key Constraints**
   - CASCADE deletion: When an agent is deleted, all their brand associations are deleted
   - CASCADE deletion: When a brand is deleted, all its agent associations are deleted

3. **Not Null Constraints**
   - All essential fields must have values
   - Optional fields: agent phone, agent expertise

### Referential Integrity

Prisma ensures referential integrity through:
- Type-safe queries prevent invalid references
- Automatic transaction management
- Database-level foreign key constraints

## Performance Considerations

### Indexes

**Current Indexes:**
1. `brands.id` (PRIMARY KEY) - Fast lookups by brand ID
2. `brands.name` (UNIQUE) - Fast lookups by brand name
3. `agents.id` (PRIMARY KEY) - Fast lookups by agent ID
4. `agents.email` (UNIQUE) - Fast lookups by agent email
5. `agent_brands(agentId, brandId)` (COMPOSITE UNIQUE) - Fast relationship queries

**Future Indexes to Consider:**
1. `brands.category` - If filtering by category becomes common
2. `agents.active` - To quickly filter active agents
3. Full-text search on `brands.description` and `brands.name`

### Query Optimization

1. **Use `select` to fetch only needed fields:**
   ```typescript
   await prisma.brand.findMany({
     select: { id: true, name: true, category: true }
   });
   ```

2. **Use pagination for large datasets:**
   ```typescript
   await prisma.brand.findMany({
     take: 10,
     skip: (page - 1) * 10
   });
   ```

3. **Batch queries when possible:**
   ```typescript
   const [brands, agents] = await Promise.all([
     prisma.brand.findMany(),
     prisma.agent.findMany()
   ]);
   ```

## Database Migrations

Migrations are stored in `backend/prisma/migrations/` and are version-controlled.

**Creating a new migration:**
```bash
npm run db:migrate
```

**Viewing migration status:**
```bash
npx prisma migrate status
```

**Rolling back (use with caution):**
```bash
npx prisma migrate reset
```

## Seeding

The seed script (`backend/prisma/seed.ts`) populates the database with:
- 8 luxury brands from the original JSON file
- 3 sample agents
- Agent-brand associations based on expertise

**Run seeding:**
```bash
npm run db:seed
```

## Resources

- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)
