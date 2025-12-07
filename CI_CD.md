# CI/CD Setup Guide

This guide explains how to set up continuous integration and deployment for the Luxury Brands application.

## GitHub Actions Workflows

The project includes two GitHub Actions workflows:

1. **`deploy-vercel.yml`** - Automated deployment to Vercel
2. **`docker-build.yml`** - Build and test Docker images

## Setting Up Vercel Deployment (Optional)

To enable automated deployments to Vercel on every push to `main`:

### 1. Create Vercel Projects

Create two projects in Vercel (one for backend, one for frontend):
- Go to https://vercel.com/new
- Import your repository twice (once for backend, once for frontend)
- Configure root directories (`backend` and `frontend`)

### 2. Get Vercel Credentials

1. **Vercel Token**:
   - Go to https://vercel.com/account/tokens
   - Create a new token
   - Copy the token

2. **Organization ID**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Link projects
   cd backend && vercel link
   cd ../frontend && vercel link
   
   # Get org ID from .vercel/project.json
   cat .vercel/project.json
   ```

3. **Project IDs**:
   - Backend project ID: Found in `backend/.vercel/project.json`
   - Frontend project ID: Found in `frontend/.vercel/project.json`

### 3. Add GitHub Secrets

Add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these secrets:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `VERCEL_TOKEN` | Your Vercel API token | `ABCdef123...` |
| `VERCEL_ORG_ID` | Your Vercel organization ID | `team_abc123...` |
| `VERCEL_PROJECT_ID_BACKEND` | Backend project ID | `prj_abc123...` |
| `VERCEL_PROJECT_ID_FRONTEND` | Frontend project ID | `prj_def456...` |

### 4. Enable Workflow

The workflow will now run automatically on:
- Every push to `main` branch (production deployment)
- Every pull request (preview deployment)

### 5. Monitor Deployments

- View workflow runs in the "Actions" tab of your repository
- Deployment URLs are posted as comments on pull requests
- Check Vercel dashboard for deployment status

## Docker Build Workflow

The Docker workflow automatically:
- ✅ Builds backend and frontend Docker images
- ✅ Tests the Docker Compose setup
- ✅ Verifies API and frontend are accessible
- ✅ Runs on every push and pull request

No setup required - it works out of the box!

## Manual Deployment

If you prefer manual deployments:

### Vercel CLI

```bash
# Backend
cd backend
vercel --prod

# Frontend
cd frontend
vercel --prod
```

### Docker

```bash
# Build and push to registry
docker build -t your-registry/backend:latest ./backend
docker push your-registry/backend:latest

docker build -t your-registry/frontend:latest ./frontend
docker push your-registry/frontend:latest
```

## Workflow Files

### deploy-vercel.yml

Triggers on:
- Push to `main` branch
- Pull requests to `main`

Jobs:
1. **deploy-backend**: Builds and deploys backend to Vercel
2. **deploy-frontend**: Builds and deploys frontend to Vercel (waits for backend)

### docker-build.yml

Triggers on:
- Push to `main` or `develop` branches
- Pull requests to `main`

Jobs:
1. **build-backend**: Builds backend Docker image
2. **build-frontend**: Builds frontend Docker image
3. **test-docker-compose**: Tests full stack with Docker Compose

## Customization

### Change Deployment Branch

Edit `.github/workflows/deploy-vercel.yml`:

```yaml
on:
  push:
    branches:
      - main        # Change to your branch
      - production  # Add more branches
```

### Add Environment Variables

Edit workflow files to add environment variables:

```yaml
- name: Set environment variables
  run: |
    echo "MY_VAR=value" >> $GITHUB_ENV
```

### Skip CI/CD

Add `[skip ci]` to your commit message:

```bash
git commit -m "Update docs [skip ci]"
```

## Troubleshooting

### Vercel Deployment Fails

**"Project not found"**
- Verify `VERCEL_PROJECT_ID_BACKEND` and `VERCEL_PROJECT_ID_FRONTEND` are correct
- Ensure projects are linked: `vercel link`

**"Invalid token"**
- Regenerate Vercel token
- Update `VERCEL_TOKEN` secret in GitHub

### Docker Build Fails

**"Build timeout"**
- Increase timeout in workflow file
- Optimize Dockerfile (use build cache)

**"Tests fail"**
- Check service logs: `docker-compose logs`
- Ensure ports 3000/3001 are available

## Best Practices

1. ✅ **Use branches**: Develop in feature branches, merge to main
2. ✅ **Review deployments**: Check preview deployments on PRs before merging
3. ✅ **Monitor logs**: Watch GitHub Actions and Vercel logs for issues
4. ✅ **Secure secrets**: Never commit secrets to the repository
5. ✅ **Test locally**: Run `docker-compose up` before pushing

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Docker Documentation](https://docs.docker.com/)

---

**Congratulations!** Your CI/CD pipeline is now set up for automated deployments! 🚀
