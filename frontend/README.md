# Frontend - Luxury Brands

This is the frontend application for the Luxury Brands platform built with Next.js, React, TypeScript, and Tailwind CSS.

## Architecture

The application follows **SOLID principles** and **KISS (Keep It Simple, Stupid)** methodology:

### Design Principles

- **Single Responsibility**: Each component and service has one clear purpose
- **Open/Closed**: Components are open for extension but closed for modification
- **Interface Segregation**: Clean interfaces between services and components
- **Dependency Inversion**: Services depend on abstractions, not implementations
- **KISS**: Simple, readable, and maintainable code

### Project Structure

```
frontend/
├── app/
│   ├── brands/[id]/
│   │   └── page.tsx          # Brand details page
│   ├── globals.css           # Global styles with Tailwind
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (brand listing)
├── components/
│   ├── BrandCard.tsx         # Brand card component
│   ├── Button.tsx            # Reusable button component
│   ├── Card.tsx              # Card component system
│   ├── Loading.tsx           # Loading state components
│   └── Map.tsx               # Interactive map component
├── services/
│   └── brandService.ts       # API service layer
├── types/
│   └── brand.ts              # TypeScript interfaces
└── public/                   # Static assets
```

## Features

- **Brand Listing**: View all luxury brands in a beautiful grid layout
- **Brand Details**: Detailed view of each brand with description and info
- **Interactive Maps**: See brand headquarters location on an interactive map
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern UI**: Clean design with Tailwind CSS
- **Type Safety**: Full TypeScript support

## Technologies

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Leaflet**: Interactive maps
- **React Icons**: Icon library
- **Headless UI**: Unstyled, accessible UI components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend API running on port 3000

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3001](http://localhost:3001)

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

## API Integration

The frontend connects to the backend API at `http://localhost:3000`. The service layer (`services/brandService.ts`) handles all API communication following the Dependency Inversion Principle.

### API Endpoints Used

- `GET /api/brands` - Fetch all brands
- `GET /api/brands/:id` - Fetch brand by ID

## Component System

### Design System Components

The application uses a custom design system built with Tailwind CSS:

- **Card**: Flexible card component with variants
- **Button**: Reusable button with multiple variants and sizes
- **Loading**: Loading states and spinners
- **Map**: Interactive map with markers

### Usage Example

```typescript
import { Card, CardImage, CardBody, CardTitle, CardText } from '@/components/Card';

<Card hover onClick={handleClick}>
  <CardImage src={imageUrl} alt={title} />
  <CardBody>
    <CardTitle>{title}</CardTitle>
    <CardText>{description}</CardText>
  </CardBody>
</Card>
```

## Styling

The project uses Tailwind CSS for styling with a custom configuration. The design follows modern UI/UX principles:

- Clean and minimalist design
- Consistent spacing and typography
- Smooth transitions and hover effects
- Accessible color contrast
- Responsive breakpoints

## Code Quality

- TypeScript for type safety
- ESLint for code linting
- Component-based architecture
- Service layer pattern for API calls
- Clean, readable code following KISS principle

## Environment Configuration

Update the API base URL in `services/brandService.ts` if your backend runs on a different port:

```typescript
const brandService = createBrandService('http://localhost:3000');
```

## Testing

To manually test the application:

1. Start the backend API server
2. Start the frontend development server
3. Open http://localhost:3001
4. Navigate through brand listings and details

## Future Enhancements

- Add search and filtering functionality
- Implement pagination for brand listing
- Add brand comparison feature
- Implement user authentication
- Add favorites/bookmarks
- Write unit and integration tests
- Add E2E tests with Playwright
