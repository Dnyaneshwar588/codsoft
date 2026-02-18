# Job Board Backend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-board
JWT_SECRET=your_secret_key_change_this
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Run the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Database Setup

### Local MongoDB
1. Install MongoDB from: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env`

### MongoDB Atlas (Cloud)
1. Create account at: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/job-board?retryWrites=true&w=majority
```

## API Testing

Use Postman or cURL to test the API:

### Test Examples

**Register**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "candidate"
  }'
```

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Jobs**
```bash
curl http://localhost:5000/api/jobs
```

## Environment Variables Explained

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens (change in production!) |
| JWT_EXPIRE | JWT expiration time (e.g., 7d, 24h) |
| EMAIL_USER | Sender email for notifications |
| EMAIL_PASS | App-specific password for email |
| NODE_ENV | development or production |
| FRONTEND_URL | Frontend URL for CORS |

## Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- cors: Cross-origin resource sharing
- dotenv: Environment variables
- nodemailer: Email service
- express-validator: Input validation

## Project Structure

```
backend/
├── models/
│   ├── User.js          # User schema
│   ├── Job.js           # Job schema
│   └── Application.js   # Application schema
├── routes/
│   ├── auth.js          # Auth endpoints
│   ├── jobs.js          # Job endpoints
│   ├── applications.js  # Application endpoints
│   ├── employer.js      # Employer dashboard
│   └── candidate.js     # Candidate dashboard
├── middleware/
│   └── auth.js          # JWT verification
├── server.js            # Main server
├── package.json
└── .env.example
```

## Common Issues

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Failed
- Check MongoDB is running
- Verify connection string in `.env`
- Check firewall settings
- For Atlas, whitelist your IP

### CORS Error
- Check `FRONTEND_URL` in `.env`
- Ensure frontend is running on correct port
- Clear browser cache

## Next Steps

1. Run the server: `npm run dev`
2. Keep this terminal open
3. Open another terminal and setup the frontend
4. Start building!

## Support

For issues or questions, refer to the main README.md
