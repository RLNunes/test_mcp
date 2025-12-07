# Deployment Guide

This guide covers multiple deployment options for making the Luxury Brands application accessible via URL.

## Table of Contents

1. [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
2. [Docker Deployment](#docker-deployment)
3. [Other Cloud Platforms](#other-cloud-platforms)

---

## Vercel Deployment (Recommended)

Vercel is the easiest and most recommended way to deploy this Next.js application, as it's built by the creators of Next.js.

### Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier available)
- A [GitHub account](https://github.com)
- A PostgreSQL database (we recommend [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))

### Step 1: Set Up PostgreSQL Database

#### Option A: Vercel Postgres (Recommended)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name (e.g., `luxury-brands-db`)
6. Select a region close to your users
7. Click "Create"
8. Copy the `DATABASE_URL` from the connection string

#### Option B: Other PostgreSQL Providers

You can also use:
- **Neon**: https://neon.tech (free tier, serverless)
- **Railway**: https://railway.app (free tier available)
- **Supabase**: https://supabase.com (free tier available)
- **AWS RDS**: https://aws.amazon.com/rds/ (paid)

### Step 2: Deploy Backend API

1. **Fork or Push to GitHub**
   ```bash
   # If you haven't already, push your code to GitHub
   git remote add origin https://github.com/YOUR_USERNAME/test_mcp.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure the project:
     - **Framework Preset**: Next.js
     - **Root Directory**: `backend`
     - **Build Command**: `npm run build` (or leave default)
     - **Output Directory**: `.next` (or leave default)

3. **Set Environment Variables**
   - Add the following environment variable:
     - `DATABASE_URL`: Your PostgreSQL connection string
   - Example: `postgresql://user:pass@host.com:5432/dbname?sslmode=require`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://luxury-brands-backend.vercel.app`)

5. **Run Database Migrations**
   
   After the first deployment, you need to set up the database schema:
   
   - Install Vercel CLI (if not already installed):
     ```bash
     npm i -g vercel
     ```
   
   - Login to Vercel:
     ```bash
     vercel login
     ```
   
   - Link your project:
     ```bash
     cd backend
     vercel link
     ```
   
   - Pull environment variables:
     ```bash
     vercel env pull .env.local
     ```
   
   - Run migrations:
     ```bash
     npx prisma migrate deploy
     ```
   
   - Seed the database:
     ```bash
     npm run db:seed
     ```

### Step 3: Deploy Frontend

1. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository again
   - Configure the project:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build` (or leave default)
     - **Output Directory**: `.next` (or leave default)

2. **Set Environment Variables**
   - Add the following environment variable:
     - `NEXT_PUBLIC_API_URL`: Your backend URL from Step 2
   - Example: `https://luxury-brands-backend.vercel.app`

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app is now live! 🎉

4. **Access Your App**
   - Visit your frontend URL (e.g., `https://luxury-brands.vercel.app`)
   - Share this URL with anyone to access your app

### Step 4: Custom Domain (Optional)

1. Go to your frontend project in Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Your app will be available at your custom domain

### Automatic Deployments

Vercel automatically deploys your app when you push to GitHub:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

---

## Docker Deployment

Deploy using Docker and Docker Compose on any cloud provider or your own server.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/RLNunes/test_mcp.git
   cd test_mcp
   ```

2. **Set environment variables**
   ```bash
   # Create .env file in the root directory
   echo "DB_PASSWORD=your_secure_password" > .env
   ```

3. **Build and start containers**
   ```bash
   docker-compose up -d
   ```

4. **Seed the database** (first time only)
   ```bash
   # Wait for services to start (about 30 seconds)
   sleep 30
   
   # Seed database with initial data
   docker-compose exec backend npm run db:seed
   ```

5. **Access your application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - Database: localhost:5432

### Deploying to Cloud Platforms

#### AWS EC2

1. Launch an EC2 instance (Ubuntu 20.04 or later)
2. Install Docker and Docker Compose
3. Clone your repository
4. Run `docker-compose up -d`
5. Configure security groups to allow traffic on ports 3000 and 3001
6. Use an Elastic IP for a permanent address

#### DigitalOcean Droplet

1. Create a Droplet with Docker pre-installed
2. SSH into your droplet
3. Clone your repository
4. Run `docker-compose up -d`
5. Your app is accessible via the droplet's IP address

#### Google Cloud Run

Google Cloud Run supports Docker containers:

1. Build your Docker images
2. Push to Google Container Registry
3. Deploy to Cloud Run
4. Configure environment variables
5. Set up Cloud SQL for PostgreSQL

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after changes
docker-compose up -d --build

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npm run db:seed

# Access database
docker-compose exec db psql -U postgres -d luxury_brands
```

---

## Other Cloud Platforms

### Railway

[Railway](https://railway.app) offers easy deployment with PostgreSQL included:

1. Sign up at https://railway.app
2. Create a new project
3. Add PostgreSQL database from the service catalog
4. Deploy backend:
   - Add service from GitHub repo
   - Set root directory to `backend`
   - Set `DATABASE_URL` environment variable (use Railway's provided connection string)
   - Deploy
5. Deploy frontend:
   - Add another service from GitHub repo
   - Set root directory to `frontend`
   - Set `NEXT_PUBLIC_API_URL` to your backend URL
   - Deploy

### Heroku

1. Create a Heroku account
2. Install Heroku CLI
3. Create two apps: one for backend, one for frontend
4. Add Heroku Postgres to backend app
5. Deploy using Git:
   ```bash
   # Backend
   cd backend
   heroku git:remote -a your-backend-app
   git push heroku main
   
   # Frontend
   cd ../frontend
   heroku git:remote -a your-frontend-app
   git push heroku main
   ```

### Render

[Render](https://render.com) offers free tier hosting:

1. Sign up at https://render.com
2. Create a PostgreSQL database
3. Create a Web Service for backend
   - Connect GitHub repository
   - Set root directory to `backend`
   - Add `DATABASE_URL` environment variable
4. Create a Web Service for frontend
   - Connect GitHub repository
   - Set root directory to `frontend`
   - Add `NEXT_PUBLIC_API_URL` environment variable

### Netlify

For the frontend only (backend needs separate hosting):

1. Sign up at https://netlify.com
2. Import your GitHub repository
3. Set build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`
4. Set environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy backend elsewhere (Vercel, Railway, etc.)

---

## Environment Variables Reference

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NODE_ENV` | Environment mode | `production` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.example.com` |
| `NODE_ENV` | Environment mode | `production` |

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Frontend loads successfully
- [ ] API endpoints are accessible
- [ ] Database connection is working
- [ ] Brand data is displayed correctly
- [ ] Maps are rendering properly
- [ ] All features work as expected
- [ ] HTTPS is enabled
- [ ] Custom domain is configured (if applicable)
- [ ] Environment variables are set correctly
- [ ] Database is seeded with initial data

---

## Troubleshooting

### "Cannot connect to database"

- Verify `DATABASE_URL` environment variable is set correctly
- Check that database allows connections from your deployment platform
- Ensure database exists and migrations have been run

### "API requests failing"

- Verify `NEXT_PUBLIC_API_URL` is set correctly in frontend
- Check CORS settings in backend `next.config.ts`
- Ensure backend is deployed and accessible

### "Build failed"

- Check build logs for specific errors
- Verify all dependencies are listed in `package.json`
- Ensure Node.js version is 18 or higher

### "Database schema out of sync"

```bash
# Run migrations
npx prisma migrate deploy

# Or reset database (development only!)
npx prisma migrate reset
```

---

## Cost Considerations

### Free Tier Options

- **Vercel**: Free for hobby projects (100GB bandwidth)
- **Neon**: Free tier with 0.5 GB storage
- **Railway**: $5 free credit per month
- **Render**: Free tier with limitations
- **Supabase**: Free tier with 500MB database

### Paid Options

For production apps with higher traffic:
- **Vercel Pro**: $20/month
- **AWS RDS**: Variable, starts ~$15/month
- **Heroku**: Starts at $7/month for database

---

## Security Recommendations

1. **Use environment variables** for all sensitive data
2. **Enable SSL/TLS** (automatic on most platforms)
3. **Set strong database passwords**
4. **Restrict database access** to your deployment platform IPs
5. **Keep dependencies updated** with `npm audit`
6. **Enable rate limiting** for API endpoints
7. **Monitor logs** for suspicious activity

---

## Performance Optimization

1. **Enable CDN** (automatic on Vercel)
2. **Use connection pooling** for database
3. **Enable caching** for static assets
4. **Optimize images** with Next.js Image component
5. **Monitor performance** with Vercel Analytics

---

## Need Help?

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Vercel documentation](https://vercel.com/docs)
- Open an issue on GitHub
- Consult the [Prisma documentation](https://www.prisma.io/docs)

---

**Congratulations!** Your Luxury Brands application is now accessible to anyone via URL! 🚀
