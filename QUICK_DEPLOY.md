# Quick Deployment Guide

Get your Luxury Brands app online in minutes!

## Choose Your Deployment Method

### 🚀 Option 1: Vercel (Easiest - Recommended)

**Perfect for**: Quick deployment with minimal setup

1. **Create accounts**:
   - [Vercel](https://vercel.com/signup) (free tier)
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Neon](https://neon.tech) (free tier)

2. **Deploy backend**:
   ```bash
   # Push to GitHub first
   git push origin main
   
   # Import to Vercel
   # - Go to vercel.com/new
   # - Select repository
   # - Set Root Directory: backend
   # - Add environment variable: DATABASE_URL
   # - Deploy
   ```

3. **Setup database**:
   ```bash
   vercel login
   cd backend
   vercel link
   vercel env pull .env.local
   npx prisma migrate deploy
   npm run db:seed
   ```

4. **Deploy frontend**:
   ```bash
   # Import to Vercel again
   # - Set Root Directory: frontend
   # - Add environment variable: NEXT_PUBLIC_API_URL (your backend URL)
   # - Deploy
   ```

**Done!** Your app is live at your Vercel URL. Share it with anyone! 🎉

[Full Vercel Guide →](./DEPLOYMENT.md#vercel-deployment-recommended)

---

### 🐳 Option 2: Docker (Deploy Anywhere)

**Perfect for**: Self-hosting, cloud VMs, or local deployment

1. **Install Docker**: https://docs.docker.com/get-docker/

2. **Quick start**:
   ```bash
   # Clone and start
   git clone https://github.com/RLNunes/test_mcp.git
   cd test_mcp
   ./docker-start.sh
   ```

3. **Access your app**:
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000

**Deploy to cloud**:
- AWS EC2, DigitalOcean, Google Cloud, etc.
- Just run `docker-compose up -d` on your server
- Configure firewall to allow ports 3000 and 3001

[Full Docker Guide →](./DEPLOYMENT.md#docker-deployment)

---

### ☁️ Option 3: Other Cloud Platforms

Quick links to deploy on other platforms:

- **Railway**: [Guide](./DEPLOYMENT.md#railway) - Easy deployment with built-in PostgreSQL
- **Heroku**: [Guide](./DEPLOYMENT.md#heroku) - Classic platform with PostgreSQL add-on
- **Render**: [Guide](./DEPLOYMENT.md#render) - Free tier available
- **Netlify**: [Guide](./DEPLOYMENT.md#netlify) - For frontend (needs separate backend)

---

## What You'll Need

### For Vercel Deployment
- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ PostgreSQL database (Vercel Postgres or Neon - free)

### For Docker Deployment
- ✅ Docker installed
- ✅ Docker Compose installed
- ✅ Server or cloud VM (optional, for public access)

---

## Troubleshooting

**"Cannot connect to database"**
- Check DATABASE_URL is set correctly
- Ensure migrations are run: `npx prisma migrate deploy`

**"API requests failing"**
- Verify NEXT_PUBLIC_API_URL matches your backend URL
- Check CORS settings in backend/next.config.ts

**"Build failed"**
- Check build logs for errors
- Ensure Node.js version is 18+

[More troubleshooting →](./DEPLOYMENT.md#troubleshooting)

---

## Need More Help?

📖 **Full Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Detailed step-by-step instructions
- Multiple platform options
- Environment variables reference
- Security and performance tips

---

## Success! What's Next?

After deployment:
- ✅ Share your URL with users
- ✅ Set up a custom domain (optional)
- ✅ Monitor your app's performance
- ✅ Set up automatic deployments from GitHub

**Your Luxury Brands app is now accessible to anyone worldwide!** 🌍
