'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface PhotoUploadProps {
  onUpload: (files: File[]) => void
}

export default function PhotoUpload({ onUpload }: PhotoUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<Record<string, string>>({})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...uploadedFiles, ...acceptedFiles]
    setUploadedFiles(newFiles)
    onUpload(newFiles)

    // Create previews for images
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviews((prev) => ({
            ...prev,
            [file.name]: reader.result as string,
          }))
        }
        reader.readAsDataURL(file)
      }
    })
  }, [uploadedFiles, onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB max file size
    multiple: true,
  })

  const removeFile = (fileName: string) => {
    const newFiles = uploadedFiles.filter((file) => file.name !== fileName)
    setUploadedFiles(newFiles)
    onUpload(newFiles)
    setPreviews((prev) => {
      const newPreviews = { ...prev }
      delete newPreviews[fileName]
      return newPreviews
    })
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isDragActive ? (
            <p className="text-blue-600 font-medium">Drop your photos here...</p>
          ) : (
            <>
              <p className="text-gray-600 font-medium">
                Drag & drop photos here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports JPEG, PNG, GIF, WebP (Max 10MB per file)
              </p>
            </>
          )}
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Uploaded Photos ({uploadedFiles.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.name}
                className="relative group border border-gray-200 rounded-lg overflow-hidden"
              >
                {previews[file.name] ? (
                  <img
                    src={previews[file.name]}
                    alt={file.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">{file.name}</span>
                  </div>
                )}
                <button
                  onClick={() => removeFile(file.name)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  aria-label="Remove photo"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 truncate">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✓ {uploadedFiles.length} photo(s) ready for upload. All files will be encrypted and stored securely.
          </p>
        </div>
      )}
    </div>
  )
}
