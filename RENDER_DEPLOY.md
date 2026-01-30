# Render Deployment - Step by Step Guide

## Step 1: Prepare Your Code

1. **Commit and push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - Patient Consent Portal"
   git push origin main
   ```

2. **Generate your encryption key** (if you haven't already):
   ```bash
   openssl rand -base64 32
   ```
   Copy this key - you'll need it in Step 4.

## Step 2: Create Render Account & Connect GitHub

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** button → Select **"Web Service"**
3. Click **"Connect GitHub"** or **"Connect GitLab"** (if using GitHub)
4. Authorize Render to access your repositories
5. Find and select your `patientconsent` repository

## Step 3: Configure Your Web Service

### Basic Settings

**Name:**
```
patientconsent
```
(or any name you prefer)

**Region:**
```
Oregon (US West)
```
(or closest to your users)

**Branch:**
```
main
```
(or your default branch)

**Root Directory:**
```
(leave blank - uses root)
```

**Runtime:**
```
Node
```

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

**Instance Type:**
```
Starter ($7/month) - 512 MB RAM
```
(Free tier available but has limitations)

### Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

**Variable 1:**
- **Key:** `NODE_ENV`
- **Value:** `production`

**Variable 2:**
- **Key:** `NEXT_PUBLIC_ENCRYPTION_KEY`
- **Value:** `[paste your generated encryption key here]`
  - This is the key you generated with `openssl rand -base64 32`
  - ⚠️ **Keep this secret!** Never commit it to git.

### Health Check (Optional but Recommended)

**Health Check Path:**
```
/
```

## Step 4: Deploy

1. Click **"Create Web Service"** at the bottom
2. Render will automatically:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build your app (`npm run build`)
   - Start your service (`npm start`)

3. **Wait for deployment** (usually 2-5 minutes)
   - You'll see build logs in real-time
   - Look for "Build successful" message

## Step 5: Verify Deployment

1. Once deployed, Render will show you a URL like:
   ```
   https://patientconsent-xxxx.onrender.com
   ```

2. **Test your deployment:**
   - Visit the URL
   - Fill out the consent form
   - Upload a test photo
   - Complete the post-op selector
   - Submit the form

3. **Check logs** if something doesn't work:
   - Go to your service → **"Logs"** tab
   - Look for any errors

## Step 6: Custom Domain (Optional)

1. Go to your service → **"Settings"** → **"Custom Domains"**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `consent.rhinovate.ai`)
4. Follow DNS configuration instructions
5. Render will automatically provision SSL certificate

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Check that all dependencies are in `package.json`
- Verify `package.json` has correct Node version in `engines`

**Error: "Build timeout"**
- Free tier has 90-second build limit
- Upgrade to paid plan or optimize build

### App Doesn't Start

**Error: "Port already in use"**
- Render automatically assigns port via `$PORT` environment variable
- Next.js should handle this automatically, but check logs

**Error: "Module not found"**
- Ensure all imports use correct paths
- Check `tsconfig.json` paths configuration

### Environment Variables Not Working

- Verify variable names match exactly (case-sensitive)
- Ensure `NEXT_PUBLIC_` prefix is used for client-side variables
- Restart service after adding variables

### Check Logs

1. Go to your service dashboard
2. Click **"Logs"** tab
3. Look for error messages
4. Common issues:
   - Missing environment variables
   - Build errors
   - Port conflicts

## Render Dashboard Settings Summary

```
Service Name: patientconsent
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: (blank)
Build Command: npm install && npm run build
Start Command: npm start
Instance Type: Starter

Environment Variables:
  NODE_ENV = production
  NEXT_PUBLIC_ENCRYPTION_KEY = [your-32-char-key]

Health Check Path: /
Auto-Deploy: Yes (default)
```

## Cost Estimate

- **Free Tier:** $0/month (with limitations)
  - Spins down after 15 minutes of inactivity
  - 90-second build timeout
  - 512 MB RAM
  
- **Starter Plan:** $7/month
  - Always on
  - 512 MB RAM
  - Better for production

## Next Steps After Deployment

1. ✅ Test all form functionality
2. ✅ Verify encryption is working (check browser console)
3. ✅ Set up custom domain (if needed)
4. ✅ Configure monitoring/alerts
5. ✅ Set up backup procedures
6. ✅ Document your deployment URL

## Need Help?

- Render Docs: https://render.com/docs
- Render Support: support@render.com
- Check your service logs for specific errors
