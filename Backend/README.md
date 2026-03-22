# Student Collaboration Platform - Backend

A clean and simple backend API for a student collaboration platform built with Node.js, Express, and MongoDB.

## Features

- ✅ User authentication (Register & Login)
- ✅ Post and browse project ideas
- ✅ Join projects based on ideas
- ✅ View your joined and created projects
- ✅ JWT-based authorization
- ✅ Simple and clean codebase

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
├── config/
│   └── db.js               # MongoDB connection
├── models/
│   ├── User.js             # User schema
│   ├── Idea.js             # Idea schema
│   └── Project.js          # Project schema
├── controllers/
│   ├── authController.js   # Auth logic
│   ├── ideaController.js   # Idea logic
│   └── projectController.js# Project logic
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── ideaRoutes.js       # Idea endpoints
│   └── projectRoutes.js    # Project endpoints
└── middleware/
    └── authMiddleware.js   # JWT verification
```

## Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   - Edit `.env` file with your MongoDB URI and JWT secret
   ```
   MONGODB_URI=mongodb://localhost:27017/collaborate_db
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   ```

3. **Start MongoDB**
   - Make sure MongoDB is running on your system

4. **Start the Server**
   ```bash
   npm start        # Production
   npm run dev      # Development (with hot reload)
   ```

   Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "domain": "Tech"
}

Response: { token, user }
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

### Ideas (Public)

#### Post an Idea
```
POST /api/ideas
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "AI Chat Application",
  "description": "Build an AI-powered chat app",
  "domains": ["Tech", "Design"],
  "rolesNeeded": ["Frontend Developer", "Backend Developer"]
}

Response: { message, idea }
```

#### Get All Ideas
```
GET /api/ideas

Response: { message, count, ideas }
```

#### Get Single Idea
```
GET /api/ideas/:id

Response: { message, idea }
```

### Projects (Protected)

#### Join a Project
```
POST /api/projects/join/:ideaId
Authorization: Bearer <token>

Response: { message, project }
```

#### Get My Projects
```
GET /api/projects/my-projects
Authorization: Bearer <token>

Response: { message, joinedProjects, createdProjects }
```

## Testing the API

### Using Postman or cURL

1. **Register a user**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Alice",
       "email": "alice@example.com",
       "password": "pass123",
       "domain": "Tech"
     }'
   ```

2. **Login**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "alice@example.com",
       "password": "pass123"
     }'
   ```

3. **Post an Idea** (save token from step 2)
   ```bash
   curl -X POST http://localhost:5000/api/ideas \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Mobile App",
       "description": "Build a mobile learning app",
       "domains": ["Tech"],
       "rolesNeeded": ["Mobile Developer"]
     }'
   ```

4. **Get All Ideas**
   ```bash
   curl http://localhost:5000/api/ideas
   ```

5. **Join a Project**
   ```bash
   curl -X POST http://localhost:5000/api/projects/join/IDEA_ID \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

6. **Get My Projects**
   ```bash
   curl http://localhost:5000/api/projects/my-projects \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## User Domains

- `Tech` - Technology/Development
- `Design` - Design/UI-UX
- `Content` - Content Creation/Writing
- `Business` - Business/Management

## Project Status

- `Open` - Project is accepting new members
- `In Progress` - Project is currently active
- `Completed` - Project has been completed

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created successfully
- `400` - Bad request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not found
- `500` - Server error

## Security Notes

⚠️ **Important for Production:**
- Change `JWT_SECRET` to a strong, random value
- Use HTTPS instead of HTTP
- Implement rate limiting
- Add CORS configuration if frontend is on different domain
- Use environment variables for sensitive data

## Future Enhancements (Not in MVP)

- Email verification
- Password reset functionality
- User profile updates
- Project messaging
- Project comments
- Advanced role permissions

## Notes

- This is a minimal viable product (MVP) focused on core functionality
- No advanced role-based permissions (kept simple as per requirements)
- No graphQL, microservices, or over-engineering
- Beginner-friendly codebase with clear comments
