'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { saveBasicInfo } from './actions'
import { createClient } from '@/lib/supabase/client'

const TOTAL_BASIC_QUESTIONS = 4

export default function BasicInfoFlow() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [userId, setUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    location: '',
    gender: '',
  })

  // Get user ID on mount
  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUserId(data.user.id)
      }
    }
    getUser()
  }, [])

  // Location autocomplete
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleNext = async () => {
    if (currentQuestion < TOTAL_BASIC_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Save basic info and move to personality questions
      if (userId) {
        try {
          await saveBasicInfo(userId, formData)
          router.push('/onboarding')
        } catch (error) {
          console.error('Error saving basic info:', error)
        }
      }
    }
  }

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      router.back()
    }
  }

  const canProceed = () => {
    switch (currentQuestion) {
      case 1:
        return formData.first_name.trim() !== ''
      case 2:
        // Check if date is in valid format (DD/MM/YYYY or DDMMYYYY with 8 digits)
        const dateStr = formData.date_of_birth.replace(/\//g, '')
        return dateStr.length === 8
      case 3:
        return formData.location.trim() !== ''
      case 4:
        return formData.gender !== ''
      default:
        return false
    }
  }

  // Birthday formatting - FIXED VERSION
  const formatBirthday = (input: string) => {
    // Remove everything except digits
    const numbers = input.replace(/\D/g, '')
    
    // Limit to 8 digits max
    const limited = numbers.slice(0, 8)
    
    // Build formatted string
    let formatted = ''
    if (limited.length > 0) {
      formatted = limited.slice(0, 2) // DD
      if (limited.length >= 3) {
        formatted += '/' + limited.slice(2, 4) // MM
      }
      if (limited.length >= 5) {
        formatted += '/' + limited.slice(4, 8) // YYYY
      }
    }
    
    return formatted
  }

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBirthday(e.target.value)
    setFormData({ ...formData, date_of_birth: formatted })
  }
  
  // Location autocomplete (mock for now)
  const handleLocationChange = (value: string) => {
    setFormData({ ...formData, location: value })

    if (value.length > 2) {
      // Mock suggestions - replace with real API later
      const mockCities = [
        'Vienna, Austria',
        'Graz, Austria',
        'Salzburg, Austria',
        'Berlin, Germany',
        'Munich, Germany',
        'Zurich, Switzerland',
      ]
      const filtered = mockCities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      )
      setLocationSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const selectLocation = (location: string) => {
    setFormData({ ...formData, location })
    setShowSuggestions(false)
  }

  // Handle gender selection with auto-advance
  const handleGenderSelect = (value: string) => {
    setFormData({ ...formData, gender: value })
    // Don't auto-advance on last basic question - show Continue button
  }

  const progress = (currentQuestion / TOTAL_BASIC_QUESTIONS) * 100

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Dots */}
      <div className="w-full px-6 pt-8 pb-4">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full transition-colors ${
                step <= currentQuestion ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Q1: Name */}
          {currentQuestion === 1 && (
            <div className="space-y-8">
              {/* Icon */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
                What's your name?
              </h2>

              {/* First Name */}
              <div className="space-y-2">
                <Input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  placeholder="First name (required)"
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-gray-300 rounded-none focus:border-black focus:ring-0 placeholder:text-gray-400"
                  autoFocus
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  placeholder="Last name"
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-gray-300 rounded-none focus:border-black focus:ring-0 placeholder:text-gray-400"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Last name is optional, and only shared with matches.
                </p>
                <button className="text-sm text-purple-600 font-medium">
                  Why?
                </button>
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-12">
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Q2: Date of Birth */}
          {currentQuestion === 2 && (
            <div className="space-y-8">
              {/* Icon */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
                What's your date of birth?
              </h2>

              {/* Single Birthday Input with auto-formatting */}
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.date_of_birth}
                  onChange={handleBirthdayChange}
                  placeholder="DD/MM/YYYY"
                  className="w-full text-center text-5xl md:text-6xl font-light text-gray-900 placeholder:text-gray-300 border-0 border-b-2 border-gray-300 focus:border-black focus:ring-0 focus:outline-none bg-transparent pb-4"
                  autoFocus
                />
              </div>

              <p className="text-sm text-gray-500 mt-8">
                We use this to calculate the age on your profile.
              </p>

              {/* Next Button */}
              <div className="flex justify-end mt-12">
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Q3: Location */}
          {currentQuestion === 3 && (
            <div className="space-y-8">
              {/* Icon */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
                Where do you live?
              </h2>

              {/* Location Input */}
              <div className="relative">
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onFocus={() =>
                    formData.location.length > 2 && setShowSuggestions(true)
                  }
                  placeholder="Enter your location"
                  className="w-full px-0 py-4 text-lg border-0 border-b-2 border-gray-300 rounded-none focus:border-black focus:ring-0 placeholder:text-gray-400"
                  autoFocus
                />

                {/* Suggestions */}
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => selectLocation(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition first:rounded-t-lg last:rounded-b-lg"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-12">
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Q4: Gender */}
          {currentQuestion === 4 && (
            <div className="space-y-8">
              {/* Icon */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
                What gender describes you best?
              </h2>

              {/* Gender Options */}
              <RadioGroup
                value={formData.gender}
                onValueChange={handleGenderSelect}
              >
                <div className="space-y-4">
                  {[
                    { value: 'man', label: 'Man' },
                    { value: 'woman', label: 'Woman' },
                    { value: 'non_binary', label: 'Non-binary' },
                  ].map((option) => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-5 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${
                            formData.gender === option.value
                              ? 'border-black bg-gray-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className="w-6 h-6"
                        />
                        <span className="font-medium">{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Continue Button */}
              <div className="mt-12">
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="w-full py-6 text-lg rounded-xl bg-black text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      {currentQuestion > 1 && (
        <div className="w-full px-6 pb-6">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-black flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>
      )}
    </div>
  )
}