/**
 * Zod Validation Schemas for Onboarding
 * 
 * All form validation logic in one place.
 * Use these schemas in server actions and client-side forms.
 */

import { z } from 'zod'

/**
 * Name validation
 */
export const nameSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z
    .string()
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]*$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .optional()
    .or(z.literal('')),
})

/**
 * Email validation
 */
export const emailSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  
  acceptMarketing: z.boolean().default(true),
})

/**
 * Verification code validation
 */
export const verificationCodeSchema = z.object({
  code: z
    .string()
    .length(4, 'Verification code must be 4 digits')
    .regex(/^\d{4}$/, 'Verification code must contain only numbers'),
})

/**
 * Date of birth validation
 */
export const dateOfBirthSchema = z.object({
  day: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])$/, 'Invalid day'),
  
  month: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, 'Invalid month'),
  
  year: z
    .string()
    .regex(/^\d{4}$/, 'Invalid year')
    .refine(
      (year) => {
        const yearNum = parseInt(year)
        const currentYear = new Date().getFullYear()
        return yearNum >= currentYear - 100 && yearNum <= currentYear - 18
      },
      { message: 'You must be 18 or older' }
    ),
})

/**
 * Location validation
 */
export const locationSchema = z.object({
  city: z.string().min(2, 'City name is required'),
  country: z.string().min(2, 'Country is required'),
  displayName: z.string().min(1, 'Location is required'),
  coordinates: z.object({
    lat: z.number(),
    lon: z.number(),
  }).optional(),
})

/**
 * Complete basic info validation
 */
export const basicInfoSchema = z.object({
  firstName: nameSchema.shape.firstName,
  lastName: nameSchema.shape.lastName,
  email: emailSchema.shape.email,
  dateOfBirth: z.date().refine(
    (date) => {
      const age = Math.floor((Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
      return age >= 18
    },
    { message: 'You must be at least 18 years old' }
  ),
  location: locationSchema,
})

/**
 * Helper function to calculate age from date
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

/**
 * Helper function to convert DateOfBirth to Date object
 */
export function dateOfBirthToDate(dob: { day: string; month: string; year: string }): Date {
  const year = parseInt(dob.year)
  const month = parseInt(dob.month) - 1 // JS months are 0-indexed
  const day = parseInt(dob.day)
  
  return new Date(year, month, day)
}

/**
 * Validate date components and return errors
 */
export function validateDateOfBirth(dob: { day: string; month: string; year: string }) {
  try {
    dateOfBirthSchema.parse(dob)
    const date = dateOfBirthToDate(dob)
    const age = calculateAge(date)
    
    if (age < 18) {
      return { isValid: false, error: 'You must be 18 or older to create an account' }
    }
    
    return { isValid: true, date, age }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message }
    }
    return { isValid: false, error: 'Invalid date of birth' }
  }
}