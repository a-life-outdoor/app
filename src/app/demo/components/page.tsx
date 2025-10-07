/**
 * Component Library Demo
 * 
 * This file demonstrates how to use all onboarding components.
 * Use this as a reference when building actual onboarding screens.
 * 
 * File: app/demo/components/page.tsx
 */

'use client'

import { useState } from 'react'
import {
  ProgressDots,
  OnboardingHeader,
  ArrowButton,
  FormInput,
  OnboardingLayout,
  DateSelect,
  CodeInput,
  AgeModal,
  LocationInput,
} from '@/components/onboarding'
import type { Location } from '@/components/onboarding/location-input'

export default function ComponentDemo() {
  // State for various components
  const [currentStep, setCurrentStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [showAgeModal, setShowAgeModal] = useState(false)
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }, 1000)
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleCodeComplete = (completedCode: string) => {
    console.log('Code entered:', completedCode)
    // Verify code here
  }

  const handleBirthdaySubmit = () => {
    if (day && month && year) {
      setShowAgeModal(true)
    }
  }

  const handleAgeConfirm = () => {
    setShowAgeModal(false)
    handleNext()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Onboarding Component Library
        </h1>

        {/* Progress Dots Demo */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Progress Dots</h2>
          <div className="space-y-4">
            <ProgressDots current={1} total={5} />
            <ProgressDots current={3} total={5} />
            <ProgressDots current={5} total={5} />
          </div>
        </section>

        {/* Onboarding Header Demo */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Onboarding Header</h2>
          <OnboardingHeader
            icon="user"
            title="What's your name?"
            currentStep={1}
            totalSteps={5}
            subtitle="We'll use this to personalize your experience"
          />
        </section>

        {/* Form Input Demo */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Form Inputs</h2>
          <div className="space-y-6 max-w-md">
            <FormInput
              label="First name (required)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
            <FormInput
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              helperText={
                <>
                  Last name is optional and only shared with your connections.{' '}
                  <a href="#" className="text-primary font-medium">Why?</a>
                </>
              }
            />
            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              error={email && !email.includes('@') ? 'Please enter a valid email' : undefined}
            />
          </div>
        </section>

        {/* Date Select Demo */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Date Select</h2>
          <div className="flex gap-4 max-w-md">
            <DateSelect type="day" value={day} onChange={setDay} />
            <DateSelect type="month" value={month} onChange={setMonth} />
            <DateSelect type="year" value={year} onChange={setYear} />
          </div>
          <button
            onClick={handleBirthdaySubmit}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Show Age Modal
          </button>
        </section>

        {/* Code Input Demo */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Verification Code Input</h2>
          <div className="max-w-md">
            <p className="helper-text mb-4">
              Enter the 4-digit code sent to your email
            </p>
            <CodeInput
              value={code}
              onChange={setCode}
              onComplete={handleCodeComplete}
            />
            <button
              className="mt-4 text-primary font-medium text-sm"
              onClick={() => console.log('Resend code')}
            >
              Resend code
            </button>
          </div>
        </section>

        {/* Location Input Demo */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Location Input</h2>
          <div className="max-w-md">
            <LocationInput
              value={location}
              onChange={setLocation}
              placeholder="Search for your city..."
            />
            {location && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Selected Location:</p>
                <p className="text-sm text-gray-600">{location.displayName}</p>
                {location.coordinates && (
                  <p className="text-xs text-gray-500 mt-1">
                    Lat: {location.coordinates.lat.toFixed(4)}, 
                    Lon: {location.coordinates.lon.toFixed(4)}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Arrow Button Demo */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Arrow Button</h2>
          <div className="flex gap-4">
            <ArrowButton onClick={handleNext} />
            <ArrowButton onClick={handleNext} disabled />
            <ArrowButton onClick={handleNext} loading />
          </div>
        </section>

        {/* Full Layout Demo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 px-6">Complete Layout Example</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <OnboardingLayout onBack={handleBack}>
              <OnboardingHeader
                icon="email"
                title="What's your email?"
                currentStep={currentStep}
                totalSteps={5}
              />
              
              <form className="mt-8 space-y-6">
                <FormInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  helperText="Email verification helps us keep your account secure."
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="marketing"
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-600">
                    I don't want to receive marketing communications
                  </label>
                </div>
              </form>

              <div className="mt-12 flex justify-end">
                <ArrowButton 
                  onClick={handleNext} 
                  loading={isLoading}
                  disabled={!email}
                />
              </div>
            </OnboardingLayout>
          </div>
        </section>

        {/* Age Modal (controlled externally) */}
        <AgeModal
          open={showAgeModal}
          age={26}
          birthDate={new Date(1999, 5, 13)}
          onEdit={() => setShowAgeModal(false)}
          onConfirm={handleAgeConfirm}
        />
      </div>
    </div>
  )
}