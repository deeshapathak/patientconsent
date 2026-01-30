# Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

- [ ] Generate secure encryption key: `openssl rand -base64 32`
- [ ] Set `NEXT_PUBLIC_ENCRYPTION_KEY` environment variable in deployment platform
- [ ] Verify all environment variables are set correctly
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Review security headers configuration
- [ ] Ensure HTTPS is enabled (automatic on Render/Cloudflare)

## Platform-Specific

### Render
- [ ] `render.yaml` is committed to repository
- [ ] Environment variables set in Render dashboard
- [ ] Health check path configured (`/`)
- [ ] Auto-deploy enabled (if desired)

### Cloudflare Pages
- [ ] `CF_PAGES=1` environment variable set
- [ ] Build command: `npm install && npm run build:cloudflare`
- [ ] Output directory: `.next`
- [ ] Node version: 18+
- [ ] Environment variables set in Cloudflare dashboard

## Security

- [ ] Encryption key is NOT in git
- [ ] `.env.local` is in `.gitignore`
- [ ] No sensitive data in code or comments
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CORS policies reviewed (if applicable)

## Testing

- [ ] Form submission works
- [ ] Photo upload works
- [ ] Post-op selector works
- [ ] Data encryption is working
- [ ] Error handling works
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility tested

## Post-Deployment

- [ ] Verify site is accessible
- [ ] Test form submission end-to-end
- [ ] Check browser console for errors
- [ ] Verify encryption is working
- [ ] Monitor logs for errors
- [ ] Set up monitoring/alerts (if available)

## HIPAA Compliance

- [ ] Backend API implemented (if storing data)
- [ ] Database is encrypted and HIPAA-compliant
- [ ] Access controls implemented
- [ ] Audit logging configured
- [ ] Backup procedures in place
- [ ] Business Associate Agreements signed (if using third-party services)
- [ ] Privacy policy and terms of service updated
- [ ] Patient data retention policy defined

## Documentation

- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] Team members have access to deployment platform
- [ ] Rollback procedure documented
