# Quick Start Guide - Job Board

## Step 1: Configure Environment Variables

Navigate to the backend folder and create `.env` file:

```bash
cd backend
# The .env file should already be created from .env.example
```

Update your `.env` with these values:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-board
JWT_SECRET=your_secret_key_change_this_in_production
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Step 2: Start MongoDB

### Windows:
```bash
# If MongoDB is installed as a service, it should start automatically
# Or open Services and start MongoDB service

# Or start MongoDB manually:
mongod
```

### Mac:
```bash
brew services start mongodb-community
```

### Linux:
```bash
sudo systemctl start mongod
```

## Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 4: Seed the Database with Sample Jobs

```bash
npm run seed
```

This will:
- ✅ Create sample jobs in the database
- ✅ Create a test employer account
- ✅ Display all added jobs

**You'll see output like:**
```
✅ Successfully added 10 jobs to the database!

Added Jobs:
1. Senior React Developer - Tech Innovations Inc (New York, NY)
2. Full Stack JavaScript Developer - WebDev Solutions (San Francisco, CA)
...

📝 You can now login with:
Email: admin@jobboard.com
Password: admin123
Role: Employer
```

## Step 5: Start Backend Server

```bash
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB connected
```

## Step 6: In a NEW Terminal, Start Frontend

```bash
cd frontend
npm install  # (if not already done)
npm run dev
```

You should see:
```
  VITE v4.2.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
```

## Step 7: Open Application

Open your browser and go to: **`http://localhost:3000`**

## 🎯 Test the Application

### Option 1: Login as Employer
- Email: `admin@jobboard.com`
- Password: `admin123`
- Role: Employer
- Features: View jobs, post new jobs, manage applications

### Option 2: Register as Candidate
- Click "Register" 
- Fill in details
- Select "Job Seeker" role
- Features: Browse jobs, search, apply, track applications

## 🔍 Using the Search Feature

1. Go to "Browse Jobs" page
2. Use the **Search Box** to search by:
   - Job title (e.g., "React Developer")
   - Company name (e.g., "Tech Innovations")
   - Keywords (e.g., "JavaScript")
3. Click the **🔍 Search** button
4. Use filters to refine results:
   - Category (IT, Sales, Marketing, Design)
   - Location (New York, Remote, etc.)
   - Job Type (Full-time, Part-time, etc.)
5. Click **✕ Clear Filters** to reset

## 📊 Sample Jobs Added

The seed script adds 10 sample jobs:

1. **Senior React Developer** - Tech Innovations Inc - New York, NY - $120k-$160k
2. **Full Stack JavaScript Developer** - WebDev Solutions - San Francisco, CA - $100k-$150k
3. **UI/UX Designer** - Design Studio Pro - Los Angeles, CA - $70k-$110k
4. **Data Scientist** - Data Analytics Corp - Remote - $130k-$180k
5. **Marketing Manager** - Growth Marketing Co - Boston, MA - $80k-$120k
6. **Backend Developer (Node.js)** - CloudTech Systems - Seattle, WA - $110k-$155k
7. **Product Manager** - Innovation Labs - New York, NY - $100k-$150k
8. **DevOps Engineer** - Cloud Infrastructure Co - Austin, TX - $105k-$145k
9. **Mobile iOS Developer** - Mobile First Apps - San Francisco, CA - $115k-$160k
10. **Sales Representative** - Enterprise Solutions Ltd - Chicago, IL - $50k-$100k

## ✨ Features Overview

### For Job Seekers:
- ✅ Browse all jobs
- ✅ Advanced search and filtering
- ✅ View detailed job information
- ✅ Apply with resume and cover letter
- ✅ Track application status
- ✅ Manage profile

### For Employers:
- ✅ Login with seeded account
- ✅ Post new job openings
- ✅ View all applications
- ✅ Update application status
- ✅ Manage job listings
- ✅ View hiring statistics

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check connection string in `.env`
- Verify `MONGODB_URI` is correct

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "Port 3000 already in use"
- Change port in `frontend/vite.config.js`
- Or kill the process on port 3000

### Jobs not showing up
```bash
# Re-seed the database
cd backend
npm run seed
```

## 📝 Next Steps

1. Explore the application
2. Try searching for jobs
3. Apply for a job
4. View applications in candidate dashboard
5. Try the employer dashboard features

## 🚀 Deploy to Production

See main `README.md` for deployment instructions on Vercel, Netlify, Heroku, etc.

---

**Happy job hunting! 🎉**
