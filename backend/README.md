# Backend API

This is the backend API for the Luxury Brands application built with Next.js. It provides RESTful endpoints to access luxury brand data.

## Architecture

The backend follows **SOLID principles** and **KISS (Keep It Simple, Stupid)** methodology:

- **Single Responsibility Principle**: BrandService class handles only data operations
- **Open/Closed Principle**: Services can be extended without modifying existing code
- **Interface Segregation**: Clean API interfaces for brand data
- **Dependency Inversion**: Services depend on abstractions, not concrete implementations

## API Endpoints

### GET /api/brands
Fetches all luxury brands.

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
Fetches a specific brand by ID.

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

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
npm install
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
│   │   └── brands/
│   │       ├── route.ts          # GET all brands
│   │       └── [id]/
│   │           └── route.ts      # GET brand by ID
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
└── tsconfig.json
```

## Code Quality

- TypeScript for type safety
- ESLint for code linting
- Clean, readable code following KISS principle
- Modular architecture for scalability

## Environment Variables

No environment variables required for the current setup. The backend reads from the `../database/brands.json` file.

## Testing

To test the API:

1. Start the development server
2. Access the endpoints:
   - http://localhost:3000/api/brands
   - http://localhost:3000/api/brands/1

## Future Enhancements

- Add database connection (PostgreSQL, MongoDB)
- Implement authentication
- Add input validation
- Implement caching
- Add rate limiting
- Write unit and integration tests
