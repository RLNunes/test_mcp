# Database

This folder contains the fake database for the luxury brands application. It's designed for testing and development purposes.

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

## Usage

The backend API reads this JSON file to serve brand data to the frontend. In a production environment, this would be replaced with a proper database system like PostgreSQL, MongoDB, or similar.

## Adding New Brands

To add new brands, simply add a new object to the array in `brands.json` following the schema above. Make sure to:
1. Use a unique ID
2. Provide accurate location coordinates (lat/lng)
3. Include all required fields
