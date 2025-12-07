#!/bin/bash

# Luxury Brands App - Docker Quick Start
# This script sets up and starts the application using Docker

set -e

echo "🚀 Luxury Brands Application - Docker Deployment"
echo "================================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed."
    echo "   Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed."
    echo "   Please install Docker Compose from https://docs.docker.com/compose/install/"
    exit 1
fi

# Check if .env file exists, create if not
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    echo "DB_PASSWORD=postgres" > .env
    echo "✅ Created .env file with default settings"
    echo "   You can edit .env to change the database password"
    echo ""
fi

echo "🐳 Starting Docker containers..."
echo ""

# Build and start containers
docker-compose up -d --build

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 30

# Seed the database on first run
echo ""
echo "🔄 Running database migrations..."
docker-compose exec -T backend npx prisma migrate deploy 2>/dev/null || echo "⚠️  Migrations may have already been applied"

echo ""
echo "🌱 Seeding database with initial data..."
docker-compose exec -T backend npm run db:seed 2>/dev/null || echo "⚠️  Seeding skipped (database may already be seeded)"

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ All services are running!"
    echo ""
    echo "🌐 Your application is now accessible at:"
    echo "   Frontend: http://localhost:3001"
    echo "   Backend API: http://localhost:3000"
    echo "   Database: localhost:5432"
    echo ""
    echo "📊 To view logs: docker-compose logs -f"
    echo "🛑 To stop: docker-compose down"
    echo ""
    echo "🎉 Enjoy your Luxury Brands application!"
else
    echo ""
    echo "⚠️  Warning: Some services may not have started correctly."
    echo "   Run 'docker-compose logs' to check for errors."
fi
