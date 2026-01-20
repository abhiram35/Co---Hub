# 🔧 DEBUGGING CHECKLIST - "Failed to Fetch" Error

## 📋 SYSTEMATIC DEBUG PROCESS

### Step 1: VERIFY BACKEND IS RUNNING
**What to check:** Is the Node.js server actually running?

```bash
# In terminal where Backend is running, you should see:
✅ Server running on port 5000
✅ MongoDB connected successfully
```

**If NOT seeing this:**
- Restart backend: `cd Backend && npm start`
- Check port 5000 is free: `netstat -ano | findstr :5000`

**Status:** ✓ Yes / ✗ No / ? Unknown

---

### Step 2: CHECK BACKEND CONFIGURATION
**File:** `Backend/server.js`

```javascript
// ✅ Must have CORS with credentials
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true  // ← IMPORTANT!
}));

// ✅ Must have JSON middleware
app.use(express.json());

// ✅ Routes must be mounted
app.use('/api/auth', authRoutes);
```

**Status:** ✓ Correct / ✗ Missing / ? Need to check

---

### Step 3: VERIFY ROUTES EXIST
**File:** `Backend/routes/authRoutes.js`

```javascript
// Must have:
router.post('/register', authController.register);  // ✅
router.post('/login', authController.login);        // ✅
```

**Check endpoint:** http://localhost:5000/api/auth/register

**Status:** ✓ Exists / ✗ Missing / ? Need to check

---

### Step 4: VERIFY FRONTEND API SERVICE
**File:** `src/services/api.js`

```javascript
// ✅ Must have credentials on ALL fetch calls
const response = await fetch(`${API_BASE_URL}/auth/register`, {
  method: 'POST',
  headers: getHeaders(),
  credentials: 'include',  // ← THIS IS THE FIX!
  body: JSON.stringify({ name, email, password, domain }),
});
```

**Key changes needed:**
- [ ] `credentials: 'include'` in `authAPI.register()`
- [ ] `credentials: 'include'` in `authAPI.login()`
- [ ] `credentials: 'include'` in `ideaAPI.createIdea()`
- [ ] `credentials: 'include'` in `ideaAPI.getAllIdeas()`
- [ ] `credentials: 'include'` in `projectAPI.joinProject()`
- [ ] Try-catch blocks for error logging

**Status:** ✓ Fixed / ✗ Not fixed / ? In progress

---

### Step 5: TEST IN BROWSER
**Steps:**

1. Open http://localhost:5173/register
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Fill in registration form
5. Click "Create Account"

**What you should see in Console:**

✅ **Success (No errors):**
```
(no error messages)
(page redirects to dashboard)
```

❌ **CORS Error:**
```
Failed to fetch
TypeError: Failed to fetch
```

❌ **Network Error:**
```
Failed to connect to http://localhost:5000/api/auth/register
```

**Your Console Output:**

```
[Paste here]
```

---

### Step 6: CHECK NETWORK TAB
**Steps:**

1. DevTools → **Network** tab
2. Clear network log
3. Try registration
4. Look for `register` request

**What you should see:**

| Item | Value |
|------|-------|
| URL | `http://localhost:5000/api/auth/register` |
| Method | `POST` |
| Status | `201` ✓ (or `200`) |
| Response | `{token, user}` |

**If you see:**

| Item | Problem |
|------|---------|
| Status | `500` | Backend error - check backend logs |
| Status | `404` | Route doesn't exist |
| Status | `CORS error` | CORS misconfigured |
| Status | `(pending)` | Request hanging - backend not responding |

**Your Network Info:**

```
Status: ___
URL: ___
Response Size: ___
```

---

### Step 7: VERIFY localStorage
**Steps:**

1. DevTools → **Application** tab
2. Left sidebar → **localStorage**
3. Select your domain (localhost:5173)
4. Look for `authToken`

**What you should see:**

✅ **Success:**
```
authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y5...
```

❌ **Problem:**
```
(No authToken entry)
(authToken is empty/null)
```

**Your localStorage:**

```
authToken: [paste here]
```

---

## 🎯 ROOT CAUSE ANALYSIS

Based on your debugging, identify the root cause:

### Scenario A: "Failed to fetch" in Console
**Most likely cause:** Missing `credentials: 'include'`
**Fix:** See Step 4 above
**Action:** Add credentials to all fetch calls ✅ DONE

### Scenario B: Status 404 in Network
**Cause:** Route not found
**Fix:** Check backend route is correct
**Check:**
- [ ] File exists: `Backend/routes/authRoutes.js`
- [ ] Route exists: `router.post('/register', ...)`
- [ ] Mounted: `app.use('/api/auth', authRoutes)`

### Scenario C: Status 500 in Network
**Cause:** Backend error
**Fix:** Check backend console logs
**Look for:**
- ReferenceError, SyntaxError, or other JS errors
- MongoDB connection issues
- Invalid data validation

### Scenario D: Backend not running
**Cause:** Terminal process died or not started
**Fix:** Restart backend
```bash
cd Backend
npm start
```

### Scenario E: Timeout / (pending)
**Cause:** Backend crashed or not responding
**Fix:** Restart backend and check logs

---

## ✅ FINAL VERIFICATION

After fixing, verify everything works:

- [ ] Backend running on port 5000 ✓
- [ ] Frontend running on port 5173 ✓
- [ ] `credentials: 'include'` added to all fetches ✓
- [ ] CORS configured correctly ✓
- [ ] No console errors ✓
- [ ] Network request returns 201/200 ✓
- [ ] authToken saved in localStorage ✓
- [ ] Page redirects to dashboard ✓

---

## 🚀 READY TO TEST?

1. Make sure all fixes are applied
2. Restart both backend and frontend
3. Go to http://localhost:5173/register
4. Try registering
5. Check console for errors
6. Check network tab
7. Look for authToken in localStorage

**If you see an error, paste it in the Context above and I'll help!**

---

## 📞 HELP NEEDED?

Include:
1. **Exact error message** from console
2. **Network tab info** (status, response)
3. **Backend console output**
4. **localStorage content**

This will help identify the exact issue!
