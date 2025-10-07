/**
 * ProgressDots Component
 * 
 * Displays onboarding progress as a series of dots.
 * Active dot is highlighted in primary color.
 * 
 * @example
 * <ProgressDots current={2} total={5} />
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressDotsProps {
  /** Current step (1-indexed) */
  current: number
  /** Total number of steps */
  total: number
  /** Additional CSS classes */
  className?: string
}

export function ProgressDots({ current, total, className }: ProgressDotsProps) {
  return (
    <div 
      className={cn('flex items-center justify-center gap-2', className)}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${current} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1
        const isActive = step === current
        const isPast = step < current

        return (
          <div
            key={step}
            className={cn(
              'h-2 w-2 rounded-full transition-all duration-300',
              isActive && 'bg-primary scale-125',
              isPast && 'bg-primary/60',
              !isActive && !isPast && 'bg-border'
            )}
            aria-current={isActive ? 'step' : undefined}
          />
        )
      })}
    </div>
  )
}