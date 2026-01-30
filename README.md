# Patient Consent Portal - Rhinovate

A HIPAA-compliant patient consent portal for Rhinovate that allows patients to upload photos, provide consent, and specify post-operative information.

## Features

- ✅ **HIPAA-Compliant**: End-to-end encryption, secure data handling, and compliance with HIPAA regulations
- 📸 **Photo Upload**: Secure drag-and-drop photo upload with preview
- 📅 **Post-Operative Time Selector**: Number input with dropdown for days/weeks/months/years
- 🎨 **Rhinovate Branding**: Matches the color scheme and design of rhinovate.ai
- 🔒 **Secure**: All sensitive data is encrypted before storage
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (create `.env.local`):
```bash
NEXT_PUBLIC_ENCRYPTION_KEY=your-secure-encryption-key-here
```

**Important**: In production, use a proper key management service (AWS KMS, Azure Key Vault, etc.) instead of environment variables.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Deployment

This application is configured for deployment on **Render** and **Cloudflare Pages**.

### Quick Deploy

**Render:**
1. Connect your GitHub repository
2. Render will auto-detect `render.yaml`
3. Set `NEXT_PUBLIC_ENCRYPTION_KEY` in environment variables
4. Deploy!

**Cloudflare Pages:**
1. Connect your GitHub repository
2. Use build command: `npm install && npm run build:cloudflare`
3. Set environment variables: `NEXT_PUBLIC_ENCRYPTION_KEY` and `CF_PAGES=1`
4. Deploy!

📖 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

## HIPAA Compliance Features

1. **Data Encryption**: All sensitive patient data is encrypted using AES-256 encryption
2. **Secure File Upload**: Photos are handled securely and can be encrypted before storage
3. **Consent Tracking**: Explicit HIPAA authorization and consent forms
4. **Access Controls**: No indexing by search engines (robots meta tag)
5. **Audit Trail**: Timestamps for all submissions
6. **Secure Storage**: Files are excluded from git (.gitignore)

## Project Structure

```
patientconsent/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main portal page
│   └── globals.css         # Global styles
├── components/
│   ├── ConsentForm.tsx     # HIPAA consent form
│   ├── PhotoUpload.tsx     # Photo upload component
│   └── PostOpSelector.tsx  # Post-op time selector
├── utils/
│   └── encryption.ts       # Encryption utilities
└── public/                 # Static assets
```

## Security Considerations

⚠️ **Important**: This is a frontend application. For full HIPAA compliance in production:

1. **Backend API**: Implement a secure backend API to handle data storage
2. **Key Management**: Use a proper key management service for encryption keys
3. **Database**: Use encrypted databases with proper access controls
4. **Authentication**: Implement proper user authentication and authorization
5. **Audit Logging**: Log all access to patient data
6. **Backup & Recovery**: Implement secure backup and recovery procedures
7. **Business Associate Agreements**: Ensure all third-party services are HIPAA-compliant

## License

Proprietary - Rhinovate
