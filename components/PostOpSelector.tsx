'use client'

interface PostOpSelectorProps {
  value: string
  unit: 'days' | 'weeks' | 'months' | 'years'
  onChange: (value: string, unit: 'days' | 'weeks' | 'months' | 'years') => void
}

export default function PostOpSelector({ value, unit, onChange }: PostOpSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How far post-operative are you? <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Please select the time since your surgery
        </p>
        
        <div className="flex items-center space-x-4">
          {/* Number Input */}
          <div className="flex-1">
            <input
              type="number"
              min="0"
              step="1"
              value={value}
              onChange={(e) => onChange(e.target.value, unit)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter number"
            />
          </div>

          {/* Unit Dropdown */}
          <div className="w-40">
            <select
              value={unit}
              onChange={(e) => onChange(value, e.target.value as 'days' | 'weeks' | 'months' | 'years')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>
      </div>

      {value && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {value} {unit} post-operative
          </p>
        </div>
      )}

      {/* Help Text */}
      <div className="text-sm text-gray-500">
        <p className="mb-2">
          <strong>Note:</strong> This information helps us provide accurate visualization and healing timeline predictions.
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>If your surgery was less than 1 week ago, select "Days"</li>
          <li>If your surgery was 1-4 weeks ago, select "Weeks"</li>
          <li>If your surgery was 1-12 months ago, select "Months"</li>
          <li>If your surgery was more than 1 year ago, select "Years"</li>
        </ul>
      </div>
    </div>
  )
}
