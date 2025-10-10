# Contributing to Luxury Brands Application

Thank you for your interest in contributing to the Luxury Brands Application! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Follow the coding standards
- Write clear, maintainable code
- Test your changes before submitting

## Development Setup

1. **Fork and Clone**
```bash
git clone https://github.com/RLNunes/test_mcp.git
cd test_mcp
```

2. **Install Dependencies**
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. **Start Development Servers**
```bash
# Use the startup script
./start-all.sh

# Or manually
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev  # Terminal 2
```

## Project Structure

```
test_mcp/
├── frontend/          # React/Next.js frontend
├── backend/           # Next.js API backend
├── database/          # JSON fake database
└── README.md
```

## Development Guidelines

### SOLID Principles

This project follows SOLID principles:

1. **Single Responsibility**: Each class/component should have one responsibility
2. **Open/Closed**: Open for extension, closed for modification
3. **Liskov Substitution**: Subtypes must be substitutable for base types
4. **Interface Segregation**: Many specific interfaces are better than one general
5. **Dependency Inversion**: Depend on abstractions, not concretions

### KISS (Keep It Simple, Stupid)

- Write simple, readable code
- Avoid unnecessary complexity
- Use clear variable and function names
- Comment only when necessary to explain "why", not "what"

### Code Style

**TypeScript:**
- Use TypeScript for all new code
- Define proper interfaces and types
- Use strict type checking
- Avoid `any` type when possible

**React Components:**
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow naming conventions (PascalCase for components)

**Styling:**
- Use Tailwind CSS utility classes
- Follow the existing design system
- Keep styles consistent across components
- Use responsive design principles

### Testing

Before submitting your changes:

1. **Run Linters:**
```bash
cd backend && npm run lint
cd frontend && npm run lint
```

2. **Manual Testing:**
- Test all affected features
- Check responsive design
- Verify API endpoints
- Test error handling

3. **Browser Testing:**
- Chrome/Chromium
- Firefox
- Safari (if possible)

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

Follow the coding guidelines above and ensure:
- Code is clean and readable
- No console.log statements in production code
- Error handling is implemented
- Types are properly defined

### 3. Test Your Changes

```bash
# Backend lint
cd backend && npm run lint

# Frontend lint
cd frontend && npm run lint

# Manual testing
./start-all.sh
# Then test in browser
```

### 4. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add search functionality to brand listing"
# or
git commit -m "fix: resolve map rendering issue on mobile"
```

Commit message format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Screenshots (if UI changes)
- Link to related issues

## Adding New Features

### Adding a New API Endpoint

1. Create route in `backend/app/api/`
2. Follow service layer pattern
3. Add TypeScript interfaces
4. Update API documentation
5. Test with curl or Postman

### Adding a New Component

1. Create component in `frontend/components/`
2. Use TypeScript with proper props interface
3. Follow existing component patterns
4. Add to exports if reusable
5. Document props and usage

### Adding to Database

1. Edit `database/brands.json`
2. Follow existing schema
3. Ensure all fields are present
4. Test with API endpoints

## Common Tasks

### Update Dependencies

```bash
cd backend && npm update
cd frontend && npm update
```

### Clean Install

```bash
cd backend && rm -rf node_modules package-lock.json && npm install
cd frontend && rm -rf node_modules package-lock.json && npm install
```

### Build for Production

```bash
cd backend && npm run build
cd frontend && npm run build
```

## Questions?

If you have questions:
1. Check existing documentation
2. Search existing issues
3. Open a new issue with your question

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
