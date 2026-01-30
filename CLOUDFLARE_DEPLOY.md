# Cloudflare Pages Deployment Guide

## Issue Fixed
Cloudflare Pages was trying to use `wrangler deploy` (for Workers) instead of static export. This guide shows the correct settings.

## Cloudflare Pages Dashboard Settings

### Step 1: Create/Edit Your Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Click **"Create a project"** or edit existing project
3. Connect your GitHub repository: `deeshapathak/patientconsent`

### Step 2: Configure Build Settings

**Framework preset:**
```
Next.js (Static HTML Export)
```
or
```
None (or Custom)
```

**Build command:**
```
CF_PAGES=1 npm run build
```

**Build output directory:**
```
out
```

**Root directory:**
```
/ (leave blank or use root)
```

**Node version:**
```
20
```

### Step 3: Environment Variables

Go to **Settings** → **Environment Variables** and add:

**Production:**
- **Variable name:** `NEXT_PUBLIC_ENCRYPTION_KEY`
- **Value:** `[your encryption key]`

**Preview:**
- Same as above (optional, for preview deployments)

### Step 4: Save and Deploy

1. Click **"Save and Deploy"**
2. Cloudflare will build and deploy automatically
3. No need for wrangler - it's a static site!

## Important Notes

### ✅ Correct Configuration
- **Build command:** `CF_PAGES=1 npm run build`
- **Output directory:** `out` (not `.next`)
- **Node version:** `20`
- **Framework:** Next.js Static Export or None

### ❌ Wrong Configuration
- Don't use `wrangler deploy`
- Don't use `.next` as output directory
- Don't use Node 18 (wrangler needs 20+)

## Troubleshooting

### If you see "wrangler deploy" error:
1. Go to your project → **Settings** → **Builds & deployments**
2. Make sure **"Build command"** is: `CF_PAGES=1 npm run build`
3. Make sure **"Output directory"** is: `out`
4. Make sure **"Node version"** is: `20`
5. Save and redeploy

### If build succeeds but deploy fails:
- Check that output directory is `out` (Next.js static export creates this)
- Verify `CF_PAGES=1` is set in build command
- Make sure you're using **Pages** not **Workers**

## Custom Domain Setup

1. Go to your project → **Custom domains**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `consent.rhinovate.ai`)
4. Follow DNS configuration instructions
5. Cloudflare will automatically provision SSL certificate

## Verification

After deployment, your site should be available at:
- `https://patientconsent.pages.dev` (Cloudflare subdomain)
- `https://your-custom-domain.com` (if configured)

The portal should load and work exactly like the Render deployment!
