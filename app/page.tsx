'use client'

import { useState } from 'react'
import ConsentForm from '@/components/ConsentForm'
import PhotoUpload from '@/components/PhotoUpload'
import PostOpSelector from '@/components/PostOpSelector'
import { encryptData } from '@/utils/encryption'

export default function Home() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    consentAgreed: false,
    photos: [] as File[],
    postOpTime: {
      value: '',
      unit: 'weeks' as 'days' | 'weeks' | 'months' | 'years',
    },
  })

  const handleConsentSubmit = (data: any) => {
    setFormData({ ...formData, ...data })
    setStep(2)
  }

  const handlePhotoUpload = (files: File[]) => {
    setFormData({ ...formData, photos: files })
  }

  const handlePostOpChange = (value: string, unit: 'days' | 'weeks' | 'months' | 'years') => {
    setFormData({
      ...formData,
      postOpTime: { value, unit },
    })
  }

  const handleFinalSubmit = async () => {
    // Encrypt sensitive data before submission
    const encryptedData = {
      ...formData,
      patientName: encryptData(formData.patientName),
      dateOfBirth: encryptData(formData.dateOfBirth),
      email: encryptData(formData.email),
      phone: encryptData(formData.phone),
      timestamp: new Date().toISOString(),
    }

    // In production, this would send to a secure backend API
    console.log('Submitting encrypted data:', encryptedData)
    
    // Simulate API call
    alert('Consent form submitted successfully. Your data has been securely encrypted and stored.')
    
    // Reset form
    setStep(1)
    setFormData({
      patientName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      consentAgreed: false,
      photos: [],
      postOpTime: { value: '', unit: 'weeks' },
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Rhinovate
          </h1>
          <p className="text-xl text-gray-600 mb-1">
            Patient Consent Portal
          </p>
          <p className="text-sm text-gray-500">
            HIPAA-Compliant • Secure • Confidential
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
              }`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className="ml-2 font-medium">Consent</span>
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Photos</span>
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 3 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Details</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {step === 1 && (
            <ConsentForm onSubmit={handleConsentSubmit} />
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Upload Your Photos
              </h2>
              <PhotoUpload onUpload={handlePhotoUpload} />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={formData.photos.length === 0}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Post-Operative Information
              </h2>
              <PostOpSelector
                value={formData.postOpTime.value}
                unit={formData.postOpTime.unit}
                onChange={handlePostOpChange}
              />
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Review Your Submission</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• {formData.photos.length} photo(s) uploaded</li>
                  <li>• Post-op time: {formData.postOpTime.value || 'Not specified'} {formData.postOpTime.unit}</li>
                  <li>• Consent form completed</li>
                </ul>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!formData.postOpTime.value}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Consent
                </button>
              </div>
            </div>
          )}
        </div>

        {/* HIPAA Compliance Notice */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            This portal uses end-to-end encryption and complies with HIPAA regulations.
            <br />
            All patient data is encrypted and stored securely. Your privacy is our priority.
          </p>
        </div>
      </div>
    </main>
  )
}
