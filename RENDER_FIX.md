# Fix Render Docker Error - Step by Step

## The Problem
Render is trying to use Docker instead of Node.js. This happens when a service is created as a "Docker" service instead of a "Web Service" with Node.js.

## Solution: Change Service Type in Render Dashboard

### Step 1: Go to Your Service Settings
1. Log into https://dashboard.render.com
2. Click on your `patientconsent` service
3. Click the **"Settings"** tab at the top

### Step 2: Find and Change the Runtime/Environment
Look for one of these sections:

**Option A: If you see "Environment" dropdown:**
- Change from `Docker` → `Node`
- Or change from `Dockerfile` → `Node`

**Option B: If you see "Runtime" dropdown:**
- Change from `Docker` → `Node`

**Option C: If you see "Build Type" or "Service Type":**
- Change from `Docker` → `Native`

### Step 3: Verify Build Settings
Make sure these are set correctly:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

### Step 4: Save and Redeploy
1. Scroll down and click **"Save Changes"**
2. Go to **"Manual Deploy"** tab
3. Click **"Deploy latest commit"**

## If You Can't Find Runtime/Environment Option

Your service might be locked as Docker type. **Delete and recreate:**

### Delete Current Service
1. Go to Settings → Scroll to bottom
2. Click **"Delete Service"**
3. Confirm deletion

### Create New Web Service
1. Click **"New +"** → **"Web Service"** (NOT "Docker Web Service")
2. Connect GitHub → Select `patientconsent` repo
3. Render should auto-detect `render.yaml`
4. **VERIFY** it shows:
   - Environment: `Node` (NOT Docker)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add environment variable:
   - Key: `NEXT_PUBLIC_ENCRYPTION_KEY`
   - Value: `[your encryption key]`
6. Click **"Create Web Service"**

## Quick Checklist
- [ ] Service type is "Web Service" (not "Docker Web Service")
- [ ] Environment/Runtime is set to "Node" (not "Docker")
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Environment variable `NEXT_PUBLIC_ENCRYPTION_KEY` is set

## Still Having Issues?

Take a screenshot of your Render service Settings page and check:
- What does it say under "Environment" or "Runtime"?
- What does it say under "Build Command"?
- What does it say under "Start Command"?

The key is: **It must say "Node" not "Docker" anywhere in the settings.**
