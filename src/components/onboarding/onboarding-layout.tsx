/**
 * OnboardingLayout Component
 * 
 * Consistent layout wrapper for all onboarding screens.
 * Handles spacing, positioning, and responsive behavior.
 * 
 * @example
 * <OnboardingLayout onBack={() => router.back()}>
 *   <OnboardingHeader {...headerProps} />
 *   <form>...</form>
 *   <ArrowButton onClick={handleNext} />
 * </OnboardingLayout>
 */

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface OnboardingLayoutProps {
  /** Content to display (header, form, buttons) */
  children: React.ReactNode
  /** Callback when back button is clicked */
  onBack?: () => void
  /** Show back button in top-left */
  showBackButton?: boolean
  /** Additional CSS classes */
  className?: string
}

export function OnboardingLayout({
  children,
  onBack,
  showBackButton = true,
  className,
}: OnboardingLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Back Button */}
      {showBackButton && onBack && (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            'absolute left-6 top-6 z-10',
            'flex h-10 w-10 items-center justify-center',
            'rounded-full bg-white border border-border',
            'transition-all hover:bg-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          )}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" strokeWidth={2} />
        </button>
      )}

      {/* Main Content */}
      <main
        className={cn(
          'mx-auto flex min-h-screen max-w-md flex-col',
          'px-6 py-12 pb-24',
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}