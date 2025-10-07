/**
 * OnboardingHeader Component
 * 
 * Displays progress dots, icon, and heading for each onboarding step.
 * 
 * @example
 * <OnboardingHeader 
 *   icon="user"
 *   title="What's your name?"
 *   currentStep={1}
 *   totalSteps={5}
 * />
 */

import React from 'react'
import { User, Mail, Calendar, MapPin, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProgressDots } from './progress-dots'

const iconMap = {
  user: User,
  email: Mail,
  calendar: Calendar,
  location: MapPin,
  personality: Heart,
} as const

export interface OnboardingHeaderProps {
  /** Icon to display (mapped to Lucide icons) */
  icon: keyof typeof iconMap
  /** Main heading text */
  title: string
  /** Current step number (1-indexed) */
  currentStep: number
  /** Total number of steps */
  totalSteps: number
  /** Optional subtitle or description */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

export function OnboardingHeader({
  icon,
  title,
  currentStep,
  totalSteps,
  subtitle,
  className,
}: OnboardingHeaderProps) {
  const Icon = iconMap[icon]

  return (
    <header className={cn('flex flex-col items-start gap-6', className)}>
      {/* Progress Dots */}
      <ProgressDots current={currentStep} total={totalSteps} />

      {/* Icon */}
      <div 
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
      </div>

      {/* Title & Subtitle */}
      <div className="flex flex-col gap-2">
        <h1 className="heading-1 text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="helper-text">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}