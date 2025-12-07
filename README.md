# Luxury Brands Application

A modern, scalable web application for discovering luxury brands around the world. Built with Next.js, React, TypeScript, and Tailwind CSS, following SOLID principles and KISS methodology.

## Features

- 🏢 **Brand Discovery**: Browse a curated collection of luxury brands
- 📍 **Interactive Maps**: View brand headquarters on interactive maps powered by Leaflet
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎨 **Modern Design**: Clean, professional interface with Tailwind CSS
- ⚡ **Fast Performance**: Built with Next.js for optimal performance
- 🔒 **Type Safety**: Full TypeScript support throughout

## 🚀 Deploy Your Own

Want to make this app accessible via URL? We've got you covered!

<div align="center">

### Quick Deploy Options

| Platform | Difficulty | Time | Cost | Guide |
|----------|-----------|------|------|-------|
| **Vercel** ⭐ | Easy | 5 min | Free | [Quick Guide](./QUICK_DEPLOY.md#option-1-vercel-easiest---recommended) |
| **Docker** 🐳 | Medium | 10 min | $6/mo | [Quick Guide](./QUICK_DEPLOY.md#option-2-docker-deploy-anywhere) |
| **Railway** 🚂 | Easy | 8 min | $5/mo | [Full Guide](./DEPLOYMENT.md#railway) |

📖 **Full Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md) | [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) | [CI_CD.md](./CI_CD.md)

</div>

---

## Project Structure

The project is organized into three main folders following separation of concerns:

```
test_mcp/
├── frontend/          # Next.js React application (port 3001)
├── backend/           # Next.js API server (port 3000)
├── database/          # Fake JSON database for testing
└── README.md          # This file
```

### Frontend
The client-side application built with Next.js, React, and Tailwind CSS. Provides a beautiful, responsive UI for browsing luxury brands.

- **Technology**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Port**: 3001
- **Features**: Brand listing, brand details, interactive maps

[Read more →](./frontend/README.md)

### Backend
The API server built with Next.js API routes and PostgreSQL database. Provides RESTful endpoints for accessing brand and agent data.

- **Technology**: Next.js 15, TypeScript, PostgreSQL, Prisma ORM
- **Port**: 3000
- **Endpoints**: `/api/brands`, `/api/brands/:id`, `/api/agents`
- **Database**: PostgreSQL with Prisma ORM

[Read more →](./backend/README.md)

### Database
PostgreSQL database with Prisma ORM for managing brands, agents, and their relationships.

- **Technology**: PostgreSQL, Prisma ORM
- **Models**: Brand, Agent, AgentBrand (many-to-many relationship)
- **Data**: 8 luxury brands, sample agents with brand associations
- **Features**: Type-safe queries, migrations, seeding

[Read more →](./backend/DATABASE.md)

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- PostgreSQL 12 or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/RLNunes/test_mcp.git
cd test_mcp
```

2. Set up PostgreSQL database
```bash
# Create database (using psql or your preferred tool)
createdb luxury_brands
```

3. Install backend dependencies and set up database
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm run db:migrate    # Run migrations
npm run db:seed       # Seed with initial data
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

#### Quick Start (Using Scripts)

1. **Start all services:**
```bash
./start-all.sh
```

This will automatically:
- Install dependencies if needed
- Start backend on port 3000
- Start frontend on port 3001
- Show service URLs and PIDs

2. **Stop all services:**
```bash
./stop-all.sh
```

3. **Access the app:** http://localhost:3001

#### Manual Start (Two Terminals)

If you prefer to run services manually:

1. Start the backend API server (Terminal 1):
```bash
cd backend
npm install
npm run dev
```
The API will be available at http://localhost:3000

2. Start the frontend application (Terminal 2):
```bash
cd frontend
npm install
npm run dev
```
The app will be available at http://localhost:3001

3. Open your browser and navigate to http://localhost:3001

## Architecture

### Design Principles

This project follows industry best practices:

- **SOLID Principles**
  - Single Responsibility: Each class/component has one purpose
  - Open/Closed: Open for extension, closed for modification
  - Liskov Substitution: Components can be substituted with their subtypes
  - Interface Segregation: Clean, focused interfaces
  - Dependency Inversion: Depend on abstractions, not implementations

- **KISS (Keep It Simple, Stupid)**
  - Clear, readable code
  - Minimal complexity
  - Easy to understand and maintain

- **Separation of Concerns**
  - Frontend, Backend, and Database are completely separated
  - Each layer has a specific responsibility
  - Easy to scale and modify independently

### Technology Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Leaflet (Maps)
- React Icons

**Backend:**
- Next.js 15 (API Routes)
- TypeScript
- PostgreSQL (Database)
- Prisma ORM (Database toolkit)

**Development:**
- ESLint
- TypeScript strict mode
- npm package manager
- Prisma Studio (Database GUI)

## API Documentation

### GET /api/brands
Retrieves all luxury brands.

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

### GET /api/brands/:id
Retrieves a specific brand by ID.

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
Retrieves all agents with their associated brands.

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

## Development

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Component-based architecture
- Service layer pattern
- Clean, documented code

### Database Management

Manage the database using these commands:

```bash
cd backend
npm run db:generate    # Generate Prisma Client
npm run db:migrate     # Run database migrations
npm run db:seed        # Seed database with initial data
npm run db:studio      # Open Prisma Studio (database GUI)
```

### Building for Production

Build the backend:
```bash
cd backend
npm run build
npm start
```

Build the frontend:
```bash
cd frontend
npm run build
npm start
```

## Deployment

Ready to make your app accessible to anyone via URL?

Check out our comprehensive **[Deployment Guide](./DEPLOYMENT.md)** for step-by-step instructions on deploying to:

- **Vercel** (Recommended - easiest for Next.js apps)
- **Docker** (Deploy anywhere with containers)
- **Railway, Heroku, Render, and more**

The guide includes:
- ✅ Database setup (PostgreSQL hosting options)
- ✅ Environment variable configuration
- ✅ Deployment steps for multiple platforms
- ✅ Troubleshooting tips
- ✅ Security and performance best practices

[📖 Read the Deployment Guide →](./DEPLOYMENT.md)

## Contributing

When contributing to this project:

1. Follow the existing code style
2. Maintain SOLID principles
3. Keep it simple (KISS)
4. Write clear, self-documenting code
5. Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Enhancements

- [ ] Add search and filtering
- [ ] Implement user authentication
- [ ] Add admin panel for managing brands and agents
- [x] ~~Connect to a real database (PostgreSQL)~~
- [x] ~~Support for agents and brand relationships~~
- [ ] Add customer management features
- [ ] Add unit and integration tests
- [ ] Implement CI/CD pipeline
- [x] ~~Add Docker support~~
- [x] ~~Deploy to production~~

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, React, and TypeScript