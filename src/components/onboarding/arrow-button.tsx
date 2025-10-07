/**
 * ArrowButton Component
 * 
 * Rounded arrow button for navigation between onboarding steps.
 * Positioned in bottom-right corner by default.
 * 
 * @example
 * <ArrowButton 
 *   onClick={handleNext}
 *   disabled={!isFormValid}
 * />
 */

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ArrowButtonProps {
  /** Click handler for navigation */
  onClick: () => void
  /** Disable the button when form is invalid */
  disabled?: boolean
  /** Show loading spinner instead of arrow */
  loading?: boolean
  /** Additional CSS classes */
  className?: string
  /** Accessible label for screen readers */
  ariaLabel?: string
}

export function ArrowButton({
  onClick,
  disabled = false,
  loading = false,
  className,
  ariaLabel = 'Continue to next step',
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={cn(
        // Base styles
        'flex h-14 w-14 items-center justify-center rounded-full',
        'border-2 transition-all duration-200',
        
        // Enabled state
        'border-primary/20 bg-white hover:bg-primary hover:border-primary',
        'hover:scale-105 active:scale-95',
        
        // Disabled state
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'disabled:hover:bg-white disabled:hover:scale-100',
        
        // Focus state
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary focus-visible:ring-offset-2',
        
        className
      )}
    >
      {loading ? (
        <div 
          className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
          role="status"
          aria-label="Loading"
        />
      ) : (
        <ArrowRight 
          className={cn(
            'h-6 w-6 transition-colors',
            'text-primary group-hover:text-white'
          )}
          strokeWidth={2.5}
        />
      )}
    </button>
  )
}