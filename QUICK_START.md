# Quick Start Guide

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your encryption key

# Run development server
npm run dev
```

Visit http://localhost:3000

## Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Render auto-detects `render.yaml`
4. Add environment variable: `NEXT_PUBLIC_ENCRYPTION_KEY`
5. Deploy!

## Deploy to Cloudflare Pages

1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Build settings:
   - Build command: `npm install && npm run build:cloudflare`
   - Output directory: `.next`
   - Node version: `18`
4. Environment variables:
   - `NEXT_PUBLIC_ENCRYPTION_KEY` = your encryption key
   - `CF_PAGES` = `1`
5. Deploy!

## Generate Encryption Key

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXT_PUBLIC_ENCRYPTION_KEY` value.
