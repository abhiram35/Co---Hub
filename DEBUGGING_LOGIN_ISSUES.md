# Login "Failed to Fetch" Error - Debugging Guide

## Changes Made

### 1. **Enhanced Error Handling in `api.js`**
   - Added `APIError` custom error class to differentiate error types
   - Improved `handleResponse()` to handle:
     - **Network errors**: Connection failures, server unreachable
     - **Authentication errors (401)**: Invalid credentials
     - **Validation errors (400)**: Missing/invalid fields
     - **Server errors (5xx)**: Server-side failures
     - **Invalid JSON responses**: Server didn't return valid JSON
   
   - Updated `login()` and `register()` functions with try-catch blocks
   - Network errors now show specific message: 
     > "Unable to connect to server. Please check your internet connection or ensure the server is running on http://localhost:5000"

### 2. **Specific Error Messages for Users**
   - Instead of generic "Failed to fetch", users now see:
     - **401 errors**: "Invalid email or password. Please check and try again."
     - **500 errors**: "Server error. Please try again later."
     - **Network errors**: "Unable to connect to server..."
     - **Other errors**: The actual error message from the server

---

## Root Cause Analysis

### Current Issue: MongoDB Connection Failure
Backend output shows:
```
❌ MongoDB connection failed: connect ECONNREFUSED ::1:27017
```

**This is the main problem!** The backend is running but:
- MongoDB is not installed/running on your machine
- The login endpoint tries to query the database
- Database query fails, causing error
- Frontend receives the error but displays generic "Failed to fetch"

---

## How to Fix

### Option 1: Install & Run MongoDB Locally (Recommended for Development)

**Install MongoDB:**
1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer and choose default settings
3. MongoDB will run as a Windows Service automatically

**Verify MongoDB is running:**
```powershell
# Check if MongoDB service is running
Get-Service MongoDB | Select-Object Name, Status
```

**Restart backend after MongoDB is running:**
- Kill the backend terminal (press Ctrl+C)
- Run: `npm run dev` in the Backend folder

### Option 2: Use MongoDB Atlas (Cloud Database)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster (free tier available)
4. Get your connection string
5. Update `.env` in Backend folder:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collaborhub
   ```
6. Restart the backend server

### Option 3: Run MongoDB in Docker (If Docker Installed)

```powershell
docker run -d -p 27017:27017 --name mongodb mongo
```

---

## Debugging Checklist

- [x] Backend server running on `http://localhost:5000`
- [x] Frontend server running on `http://localhost:3000`
- [ ] MongoDB service running locally OR MongoDB Atlas connected
- [ ] Backend logs show successful MongoDB connection (not ECONNREFUSED)
- [ ] CORS headers properly configured (already done in server.js)
- [ ] Content-Type header set to application/json (already done in api.js)

---

## Testing the Login

1. **Start MongoDB** (if not already running)
2. **Restart backend server** to reconnect to MongoDB
3. **Open browser** → `http://localhost:3000`
4. **Register a test account** OR use existing credentials
5. **Submit login form** - should now work!

---

## Expected Error Messages (After Fix)

✅ **Valid email but wrong password:**
- "Invalid email or password. Please check and try again."

✅ **Server error (MongoDB down):**
- "Server error. Please try again later."

✅ **Network unreachable:**
- "Unable to connect to server. Please check your internet connection..."

✅ **Success:**
- Redirected to `/dashboard`

---

## Advanced Debugging

If still getting errors, open **Browser Console** (F12):

1. **Network tab** - Check API requests
   - Verify request goes to `http://localhost:5000/api/auth/login`
   - Check response status code (should be 200 for success, 401 for auth failure)
   
2. **Console tab** - Check error details
   - Look for specific error type and message
   - Check if error.type is 'network', 'auth', 'server', etc.

3. **Backend logs** - Check what's happening on server
   - Kill terminal and run backend with: `npm run dev`
   - Watch for database connection errors or route handlers being called

---

## File Changes Summary

**Modified:** `/Frontend/src/services/api.js`
- Added APIError class
- Enhanced handleResponse() function
- Wrapped login/register in try-catch blocks
- Added specific error messages

**Backend files** (no changes needed, already have good error handling)
- `/Backend/server.js` - CORS already configured
- `/Backend/controllers/authController.js` - Error responses already proper

---

## Key Points to Remember

1. **"Failed to fetch" = Network problem** (server not reachable or connection issue)
2. **401 error = Authentication problem** (wrong credentials)
3. **500 error = Server problem** (usually database connection)
4. **Backend must have working MongoDB connection** to handle login requests

---

## Quick Fix Checklist (In Order)

1. ✅ Code changes made - error handling improved
2. ⏳ Install/verify MongoDB is running
3. ⏳ Restart backend server
4. ⏳ Clear browser cache (Ctrl+Shift+Del) and reload
5. ⏳ Try login again
6. ⏳ Check browser console for specific error message
7. ⏳ Check backend logs for database connection errors

Good luck! 🚀
