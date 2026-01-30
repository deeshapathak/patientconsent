# Deployment Guide

This application can be deployed on both Render and Cloudflare Pages. Follow the instructions below for your chosen platform.

## Prerequisites

- A GitHub repository with your code
- An account on Render or Cloudflare
- A secure encryption key (generate with: `openssl rand -base64 32`)

## Deploying on Render

### Option 1: Using render.yaml (Recommended)

1. **Connect your GitHub repository** to Render
2. Render will automatically detect the `render.yaml` file
3. **Set environment variables** in the Render dashboard:
   - Go to your service → Environment
   - Add: `NEXT_PUBLIC_ENCRYPTION_KEY` = `your-secure-encryption-key`
4. **Deploy**: Render will automatically build and deploy

### Option 2: Manual Setup

1. **Create a new Web Service** in Render
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Node Version**: `18` or higher
4. **Set environment variables**:
   - `NODE_ENV` = `production`
   - `NEXT_PUBLIC_ENCRYPTION_KEY` = `your-secure-encryption-key`
5. **Deploy**

### Render Environment Variables

Required:
- `NEXT_PUBLIC_ENCRYPTION_KEY` - Your encryption key (generate with `openssl rand -base64 32`)

Optional:
- `NODE_ENV` - Set to `production` (automatically set by Render)

## Deploying on Cloudflare Pages

### Setup Steps

1. **Connect your GitHub repository** to Cloudflare Pages
2. **Configure build settings**:
   - **Framework preset**: `Next.js`
   - **Build command**: `npm install && npm run build:cloudflare`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (leave as default)
   - **Node version**: `18` or higher
3. **Set environment variables** in Cloudflare Pages dashboard:
   - Go to Settings → Environment Variables
   - Add: `NEXT_PUBLIC_ENCRYPTION_KEY` = `your-secure-encryption-key`
   - Add: `CF_PAGES` = `1` (this enables Cloudflare-specific optimizations)
4. **Deploy**: Cloudflare will automatically build and deploy

### Cloudflare Environment Variables

Required:
- `NEXT_PUBLIC_ENCRYPTION_KEY` - Your encryption key (generate with `openssl rand -base64 32`)
- `CF_PAGES` - Set to `1` (enables Cloudflare Pages mode)

Optional:
- `NODE_ENV` - Set to `production` (automatically set by Cloudflare)

### Using Wrangler CLI (Alternative)

If you prefer using the Wrangler CLI:

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build:cloudflare
wrangler pages deploy .next
```

## Security Best Practices

### Encryption Key Management

⚠️ **IMPORTANT**: Never commit your encryption key to git!

1. **Generate a secure key**:
   ```bash
   openssl rand -base64 32
   ```

2. **Store it securely**:
   - Use the platform's environment variable system
   - Consider using a secrets management service (AWS Secrets Manager, HashiCorp Vault, etc.)
   - Rotate keys regularly

3. **For production**, consider:
   - Using a Key Management Service (KMS)
   - Implementing server-side encryption
   - Using environment-specific keys

### HIPAA Compliance Checklist

- ✅ All data is encrypted before storage
- ✅ Environment variables are secured
- ✅ HTTPS is enforced (both platforms provide this)
- ✅ No patient data in logs or git
- ✅ Access controls are in place
- ⚠️ **Backend API**: Implement a secure backend for actual data storage
- ⚠️ **Database**: Use encrypted, HIPAA-compliant database
- ⚠️ **Audit Logging**: Implement comprehensive audit trails
- ⚠️ **Backup**: Set up secure, encrypted backups

## Post-Deployment

### Verify Deployment

1. **Check the URL**: Visit your deployed application
2. **Test the form**: Submit a test consent form
3. **Verify encryption**: Check browser console for encryption logs (in development)
4. **Check HTTPS**: Ensure the site is served over HTTPS

### Monitoring

- **Render**: Check the Logs tab in your Render dashboard
- **Cloudflare**: Use Cloudflare Analytics and Logs

### Troubleshooting

#### Build Failures

- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

#### Environment Variables Not Working

- Ensure variables are set in the platform dashboard
- Restart the service after adding variables
- Check variable names match exactly (case-sensitive)

#### Cloudflare Pages Static Export Issues

- Ensure `CF_PAGES=1` is set
- Check that `build:cloudflare` script is used
- Verify `output: 'export'` is set in `next.config.js`

## Custom Domain Setup

### Render

1. Go to your service → Settings → Custom Domains
2. Add your domain
3. Follow DNS configuration instructions

### Cloudflare Pages

1. Go to your project → Custom Domains
2. Add your domain
3. Configure DNS (if using Cloudflare DNS, it's automatic)

## Support

For platform-specific issues:
- **Render**: https://render.com/docs
- **Cloudflare Pages**: https://developers.cloudflare.com/pages
