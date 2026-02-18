# Job Board Frontend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 3. Configure Backend URL
The frontend is configured to proxy API calls to `http://localhost:5000` (as defined in `vite.config.js`)

Make sure your backend is running on port 5000. If using a different port, update the proxy in `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:YOUR_PORT',
    changeOrigin: true,
  },
},
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx           # Navigation component
│   ├── pages/
│   │   ├── HomePage.jsx         # Home page with featured jobs
│   │   ├── JobListingsPage.jsx  # Browse jobs
│   │   ├── JobDetailPage.jsx    # Job details & apply
│   │   ├── LoginPage.jsx        # User login
│   │   ├── RegisterPage.jsx     # User registration
│   │   ├── EmployerDashboard.jsx # Employer dashboard
│   │   └── CandidateDashboard.jsx # Candidate dashboard
│   ├── services/
│   │   └── api.js               # API service with axios
│   ├── styles/
│   │   └── global.css           # Global styles
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App styles
│   └── main.jsx                 # Entry point
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot reload on `http://localhost:3000`

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder

### Preview
```bash
npm run preview
```
Previews the production build locally

## User Roles

### Candidate (Job Seeker)
- Browse and search jobs
- Apply for jobs
- Manage applications
- View application status
- Update profile

### Employer
- Post job openings
- Manage posted jobs
- View applications
- Update application status
- Access employer dashboard

## Features Walkthrough

### Home Page
- Hero section with call to action
- Featured job listings
- Features overview

### Job Listings
- Search by job title/company
- Filter by category, location, job type
- Sort and paginate results
- Quick view job cards

### Job Details
- Full job description
- Requirements and skills
- Salary information
- Employer details
- Application form with resume upload

### Authentication
- Registration with role selection
- Secure login
- JWT token storage
- Protected routes

### Dashboards
**Employer Dashboard:**
- Post new jobs
- View job statistics
- Manage job listings
- Track applications

**Candidate Dashboard:**
- View all applications
- Track application status
- Application statistics

## Environment Configuration

The app uses these environment settings (from backend `.env`):

- Backend URL: `http://localhost:5000` (configured in `vite.config.js`)
- API calls are proxied through the development server

### For Production
Update `vite.config.js` to use your production API URL:

```javascript
proxy: {
  '/api': {
    target: 'https://your-backend-domain.com',
    changeOrigin: true,
  },
},
```

Or use environment variables with:
```bash
npm run build
```

## API Integration

The frontend uses Axios for API calls with automatic JWT token management:

```javascript
// Example API call from services/api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## Styling

- Uses CSS Grid and Flexbox for responsive layout
- Mobile-first approach
- Color scheme:
  - Primary: #007bff (Blue)
  - Secondary: #6c757d (Gray)
  - Success: #28a745 (Green)
  - Danger: #dc3545 (Red)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Authentication Flow

1. User registers with email, name, password, and role
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent with each API request
5. User redirected to respective dashboard
6. On logout, token cleared

## Common Issues

### "Cannot GET /api/jobs"
- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.js`

### Blank page or 404
- Check console for errors (F12)
- Ensure all dependencies installed: `npm install`
- Clear browser cache
- Restart dev server

### Auth not working
- Check localStorage in DevTools (F12)
- Ensure token is valid at `localStorage.getItem('token')`
- Backend should return token on login/register

### Styling issues
- Clear cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Restart dev server

## Deployment Options

### Vercel (Recommended for React)
```bash
npm run build
# Deploy the 'dist' folder
```

### Netlify
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Update `vite.config.js` with base path
2. Run `npm run build`
3. Deploy `dist` folder

## Next Steps

1. Ensure backend is running: `npm run dev` in the backend folder
2. Start frontend: `npm run dev` in frontend folder
3. Open `http://localhost:3000` in your browser
4. Register as a candidate or employer
5. Start using the application!

## Support

For issues or questions, refer to the main README.md or backend README.md
