# Frontend-Backend Integration Guide

## ✅ Connection Complete!

Your frontend React app is now connected to the backend API.

### What Was Done:

1. **Backend Updates**
   - Added CORS configuration to allow frontend requests
   - Backend running on `http://localhost:5000`

2. **Frontend API Service**
   - Created `src/services/api.js` - Centralized API calls
   - All endpoints use JWT authentication
   - Token stored in localStorage

3. **Updated Pages**
   - **Login Page** - Connects to `/api/auth/login`
   - **Register Page** - Connects to `/api/auth/register`
   - **PostIdea Page** - Connects to `/api/ideas` (create idea)

## 🚀 How to Run

### Terminal 1 - Backend (Already Running)
```bash
cd Backend
npm start
# Server running on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
# From project root
npm run dev
# Frontend running on http://localhost:5173
```

## 🔌 API Connection Details

### Backend API Base URL
```
http://localhost:5000/api
```

### JWT Authentication
- Token saved to `localStorage` as `authToken`
- Automatically attached to requests via Authorization header
- Format: `Authorization: Bearer <token>`

### API Service Location
```
src/services/api.js
```

Contains three modules:
- `authAPI` - Register, Login, Logout
- `ideaAPI` - Create and browse ideas
- `projectAPI` - Join projects, view user projects

## 📝 API Endpoints Available

### Auth (Public)
```
POST /api/auth/register
POST /api/auth/login
```

### Ideas (Public read, Protected write)
```
POST /api/ideas (requires token)
GET /api/ideas
GET /api/ideas/:id
```

### Projects (Protected)
```
POST /api/projects/join/:ideaId (requires token)
GET /api/projects/my-projects (requires token)
```

## 🧪 Testing Workflow

1. **Register** at `/register`
2. **Login** at `/login`
3. **Post Idea** at `/post-idea`
4. **View Projects** at `/dashboard`

## 📋 Usage Examples

### Import API in a Component
```jsx
import { authAPI, ideaAPI, projectAPI } from '../services/api';

// Register
await authAPI.register(name, email, password, domain);

// Login
await authAPI.login(email, password);

// Create Idea
await ideaAPI.createIdea(title, description, domains, rolesNeeded);

// Get Ideas
const { ideas } = await ideaAPI.getAllIdeas();

// Join Project
await projectAPI.joinProject(ideaId);

// Get My Projects
const { joinedProjects, createdProjects } = await projectAPI.getMyProjects();
```

## ⚠️ Important Notes

- Backend must be running before frontend
- Both apps must be running to test
- Tokens expire after 7 days
- Clear localStorage if you want to logout completely

## 📊 Data Flow

```
Frontend Form
    ↓
API Service (api.js)
    ↓
HTTP Request with JWT Token
    ↓
Backend API
    ↓
MongoDB Database
    ↓
Response Back to Frontend
```

## 🎯 Next Steps (If Needed)

1. **Dashboard Page** - Fetch and display ideas
   ```jsx
   const { ideas } = await ideaAPI.getAllIdeas();
   ```

2. **Project Page** - Show joined projects
   ```jsx
   const data = await projectAPI.getMyProjects();
   ```

3. **Profile Page** - Display user info from localStorage

4. **Add Logout** - Call `authAPI.logout()`

## 🐛 Troubleshooting

**CORS Error?**
- Ensure backend is running on port 5000
- Check if CORS is configured in Backend/server.js

**401 Unauthorized Error?**
- Ensure you're logged in
- Check if token exists in localStorage
- Token might be expired

**Network Error?**
- Check backend is running
- Verify localhost:5000 is accessible
- Check firewall settings

## 📱 Browser DevTools Tips

- **Network Tab** - See API requests
- **Application** - Check localStorage for `authToken`
- **Console** - Check error messages

All set! Your full-stack app is ready to use. 🎉
