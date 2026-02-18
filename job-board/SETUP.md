# Job Board - Complete Setup Instructions

## 📋 Overview
This is a full-stack **Job Board** application built with React, Node.js, and MongoDB.

## 🚀 Quick Setup

### Step 1: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### Step 2: Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

## 📝 Project Features

### User Roles
1. **Job Seekers (Candidates)**
   - Browse and search available jobs
   - Filter by location, category, job type
   - Apply for jobs with resume and cover letter
   - Track applications and their status
   - Manage profile

2. **Employers**
   - Post and manage job openings
   - View all received applications
   - Update application status
   - Track hiring metrics
   - Access employer dashboard

### Pages Included
- ✅ Home Page - Featured jobs & overview
- ✅ Job Listings - Browse & search
- ✅ Job Detail - Full job description
- ✅ Login/Register - Secure authentication
- ✅ Employer Dashboard - Manage jobs
- ✅ Candidate Dashboard - Manage applications

## 🛠️ Technology Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcryptjs (Password hashing)

**Frontend:**
- React 18
- React Router
- Axios
- Vite (Fast build tool)

## 📁 Project Structure

```
job-board/
├── backend/              # Node.js/Express API
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Main server
│   └── package.json
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── services/    # API calls
│   └── package.json
└── README.md
```

## 🔐 Authentication

- Users register as **Candidate** or **Employer**
- Passwords hashed with bcryptjs
- JWT tokens for session management
- Automatic token refresh in API calls

## 💾 Database Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB Community
# Run: mongod
# Connection: mongodb://localhost:27017/job-board
```

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to `.env`: `MONGODB_URI=<connection-string>`

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/featured` - Featured jobs
- `GET /api/jobs/:id` - Job detail
- `POST /api/jobs` - Create job (employer)
- `PUT /api/jobs/:id` - Update job (employer)
- `DELETE /api/jobs/:id` - Delete job (employer)

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications/candidate/my-applications` - My applications
- `GET /api/applications/employer/applications` - Received applications
- `PUT /api/applications/:id` - Update status

### Dashboards
- `GET /api/employer/dashboard` - Employer stats
- `GET /api/employer/jobs` - Employer's jobs
- `GET /api/candidate/dashboard` - Candidate stats
- `GET /api/candidate/profile` - Candidate profile

## 🖥️ Deployment

### Backend Deployment Options
- **Heroku** - Free tier available
- **Railway.app** - Simple deployment
- **Render** - Free tier available
- **AWS**, **DigitalOcean** - Paid options
- **Azure**, **Google Cloud** - Enterprise options

### Frontend Deployment Options
- **Vercel** - Best for React (automatically deploy)
- **Netlify** - Easy GitHub integration
- **GitHub Pages** - Free static hosting
- **AWS S3** - With CloudFront

### Steps to Deploy
1. Build frontend: `npm run build` → creates `dist/` folder
2. Push code to GitHub
3. Connect your repo to Vercel/Netlify
4. Set environment variables
5. Deploy automatically on push

## 🧪 Testing the Application

### Test Account 1 (Candidate)
```
Email: candidate@example.com
Password: password123
Role: Job Seeker
```

### Test Account 2 (Employer)
```
Email: employer@example.com
Password: password123
Role: Employer
```

## 📊 Features by User Type

### Candidate Can:
- ✅ Register/Login
- ✅ Browse all jobs
- ✅ Search and filter jobs
- ✅ View job details
- ✅ Apply for jobs
- ✅ View applications
- ✅ Track application status
- ✅ Update profile

### Employer Can:
- ✅ Register/Login
- ✅ Post job listings
- ✅ Edit job postings
- ✅ Delete job postings
- ✅ View received applications
- ✅ Update application status
- ✅ View hiring statistics

## 🔒 Security Features

- Passwords hashed with bcryptjs
- JWT token-based authentication
- Protected API routes
- Password minimum length requirement
- CORS enabled for frontend only
- Input validation on all endpoints

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Check `.env` file has correct `MONGODB_URI`
- Ensure MongoDB is running (local) or accessible (Atlas)
- Check firewall/VPN settings

### CORS Errors
- Ensure both frontend and backend are running
- Check `FRONTEND_URL` in backend `.env`
- Frontend should be on `:3000`, Backend on `:5000`

### Module Not Found
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Restart development server

## 📚 Additional Resources

- Node.js: https://nodejs.org
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- React: https://react.dev
- Vite: https://vitejs.dev

## 🎯 Next Steps

1. **Setup** - Follow Quick Setup above
2. **Explore** - Test all features
3. **Customize** - Add your branding
4. **Deploy** - Host on your choice of platform

## 📝 Notes

- Default admin/test accounts not included (users must register)
- Email notifications are optional (requires SMTP setup)
- Database uses MongoDB for flexibility and scalability
- API is RESTful and can be consumed by mobile apps too

## 💡 Future Enhancements

- Email notifications for new jobs & applications
- Advanced user profiles with portfolios
- Job recommendations engine
- Company profiles & reviews
- Interview scheduling system
- Payment/subscription for featured listings
- Admin dashboard
- Analytics and reporting

## 📄 License

This project is open source.

## 🤝 Contributing

Feel free to fork, modify, and improve!

---

**Happy coding! 🚀**

For detailed setup info, see:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
