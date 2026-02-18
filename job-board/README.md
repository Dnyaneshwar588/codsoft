# Job Board Website

A comprehensive job board platform where employers can post job openings and job seekers can search, apply for jobs, and manage their applications.

## Features

- **Home Page**: Welcome message and featured job listings
- **Job Listings Page**: Browse all available jobs with search and filtering
- **Job Detail Page**: Detailed information about a specific job
- **User Authentication**: Secure login and registration (Employer/Candidate roles)
- **Employer Dashboard**: Post, manage, and track job applications
- **Candidate Dashboard**: Manage profile and track applications
- **Job Application Process**: Submit applications with resume and cover letter
- **Search Functionality**: Find jobs by title, company, location, type
- **Email Notifications**: (Configurable) Email alerts for applications
- **Mobile Responsive**: Works seamlessly on all devices
- **Security**: Password hashing, JWT authentication

## Tech Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Nodemailer** - Email service (optional)

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
job-board/
├── backend/
│   ├── models/           # Database models
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── applications.js
│   │   ├── employer.js
│   │   └── candidate.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js
│   ├── server.js         # Main server file
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── services/     # API service
    │   ├── styles/       # Global styles
    │   ├── App.jsx       # Main app component
    │   └── main.jsx      # Entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-board
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/featured` - Get featured jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create a job (Employer only)
- `PUT /api/jobs/:id` - Update a job (Employer only)
- `DELETE /api/jobs/:id` - Delete a job (Employer only)

### Applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications/candidate/my-applications` - Get candidate's applications
- `GET /api/applications/employer/applications` - Get employer's applications
- `PUT /api/applications/:id` - Update application status

### Employer
- `GET /api/employer/dashboard` - Get employer dashboard data
- `GET /api/employer/jobs` - Get employer's jobs

### Candidate
- `GET /api/candidate/profile` - Get candidate profile
- `PUT /api/candidate/profile` - Update candidate profile
- `GET /api/candidate/dashboard` - Get candidate dashboard

## Usage

### For Job Seekers
1. Register as a "Job Seeker" on the registration page
2. Browse available jobs on the Jobs page
3. View detailed job information
4. Apply for jobs with resume and cover letter
5. Track your applications on the Candidate Dashboard
6. Update your profile

### For Employers
1. Register as an "Employer" on the registration page
2. Post new job openings from your dashboard
3. View and manage all your job postings
4. Track applications received for each job
5. Update application statuses (reviewed, shortlisted, rejected, accepted)

## Password Requirements
- Minimum 6 characters
- Must include a mix of characters for security

## Deployment

### Hosting Options
- **Backend**: Heroku, Railway, AWS, DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages, AWS S3
- **Database**: MongoDB Atlas (Cloud), AWS, DigitalOcean

### Deployment Steps
1. Update environment variables for production
2. Build the frontend: `npm run build`
3. Deploy backend and frontend separately
4. Configure CORS for your production URLs
5. Set up email notifications if needed

## Future Enhancements

- Email notifications for new applications
- Advanced user profiles with portfolio links
- Job recommendations based on skills
- Company profiles and reviews
- Interview scheduling
- Payment integration for featured jobs
- Admin dashboard
- Analytics and reporting

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- CORS enabled for secure cross-origin requests
- Input validation on all endpoints
- Protected routes for authenticated users only

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or the connection string is correct
- Check your `.env` file for the correct `MONGODB_URI`

### CORS Error
- Make sure the backend CORS is configured correctly
- Check that both frontend and backend are running on correct ports
- Update CORS origin in `server.js` if needed

### Port Already in Use
- Change the port in `.env` (backend) or `vite.config.js` (frontend)
- Or kill the process using the port

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue in the repository or contact the development team.

---

**Happy Coding!** 🚀
