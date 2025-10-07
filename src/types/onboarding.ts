/**
 * TypeScript Types for Onboarding Flow
 */

export interface BasicInfo {
  firstName: string
  lastName?: string
  email: string
  dateOfBirth: Date
  location: Location
}

export interface Location {
  city: string
  country: string
  displayName: string
  coordinates?: {
    lat: number
    lon: number
  }
}

export interface DateOfBirth {
  day: string
  month: string
  year: string
}

export interface EmailVerification {
  email: string
  code: string
  isVerified: boolean
}

export interface MarketingPreferences {
  acceptMarketing: boolean
}

export interface OnboardingState {
  currentStep: number
  totalSteps: number
  basicInfo: Partial<BasicInfo>
  emailVerification: Partial<EmailVerification>
  marketingPreferences: MarketingPreferences
  isComplete: boolean
}

export interface OnboardingStep {
  id: string
  title: string
  icon: 'user' | 'email' | 'calendar' | 'location' | 'personality'
  path: string
  isComplete: boolean
}

export interface FormErrors {
  [key: string]: string | undefined
}