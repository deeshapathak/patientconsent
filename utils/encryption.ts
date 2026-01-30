import CryptoJS from 'crypto-js'

// In production, this should be stored securely (environment variable, key management service)
// For HIPAA compliance, use AES-256 encryption
// This key is set via environment variables in Render/Cloudflare dashboard
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-key-change-in-production'

// Warn if using default key in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  if (ENCRYPTION_KEY === 'default-key-change-in-production') {
    console.warn('⚠️ SECURITY WARNING: Using default encryption key. Set NEXT_PUBLIC_ENCRYPTION_KEY environment variable!')
  }
}

/**
 * Encrypts sensitive patient data
 * In production, use a proper key management service (AWS KMS, Azure Key Vault, etc.)
 */
export function encryptData(data: string): string {
  if (!data) return ''
  
  try {
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
    return encrypted
  } catch (error) {
    console.error('Encryption error:', error)
    throw new Error('Failed to encrypt data')
  }
}

/**
 * Decrypts sensitive patient data
 * Should only be used server-side with proper authentication
 */
export function decryptData(encryptedData: string): string {
  if (!encryptedData) return ''
  
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Failed to decrypt data')
  }
}

/**
 * Generates a secure hash for file integrity verification
 */
export function generateFileHash(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const hash = CryptoJS.SHA256(e.target?.result as string).toString()
        resolve(hash)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}
