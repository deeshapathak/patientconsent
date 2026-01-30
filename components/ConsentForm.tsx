'use client'

import { useState } from 'react'

interface ConsentFormProps {
  onSubmit: (data: {
    patientName: string
    dateOfBirth: string
    email: string
    phone: string
    consentAgreed: boolean
  }) => void
}

export default function ConsentForm({ onSubmit }: ConsentFormProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    consentAgreed: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.consentAgreed) {
      newErrors.consentAgreed = 'You must agree to the consent terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Patient Information & Consent
      </h2>

      <div>
        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="patientName"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.patientName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.patientName && (
          <p className="mt-1 text-sm text-red-500">{errors.patientName}</p>
        )}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* HIPAA Consent Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          HIPAA Authorization & Consent
        </h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-64 overflow-y-auto text-sm text-gray-700">
          <p className="mb-3">
            <strong>Authorization for Use and Disclosure of Protected Health Information</strong>
          </p>
          <p className="mb-3">
            I understand that by submitting this form, I am authorizing Rhinovate and my healthcare provider to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Collect, use, and disclose my protected health information (PHI) for treatment, payment, and healthcare operations</li>
            <li>Use my photographs and medical information for the purpose of AI-powered visualization and treatment planning</li>
            <li>Store my information in secure, HIPAA-compliant systems</li>
            <li>Share my information with authorized healthcare providers involved in my care</li>
          </ul>
          <p className="mt-3">
            <strong>I understand that:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>I have the right to revoke this authorization at any time by submitting a written request</li>
            <li>Revocation will not affect actions already taken based on this authorization</li>
            <li>My information will be protected according to HIPAA regulations</li>
            <li>I may request access to my PHI at any time</li>
          </ul>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="consentAgreed"
            checked={formData.consentAgreed}
            onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
            className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="consentAgreed" className="ml-3 text-sm text-gray-700">
            <span className="text-red-500">*</span> I have read and understand the HIPAA authorization above and consent to the use and disclosure of my protected health information as described.
          </label>
        </div>
        {errors.consentAgreed && (
          <p className="mt-1 text-sm text-red-500">{errors.consentAgreed}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        Continue to Photo Upload
      </button>
    </form>
  )
}
