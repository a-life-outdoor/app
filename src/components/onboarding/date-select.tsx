/**
 * DateSelect Component
 * 
 * Dropdown select for day, month, or year in date of birth input.
 * Designed to match iOS-style selects from Figma.
 * 
 * @example
 * <DateSelect
 *   type="day"
 *   value={day}
 *   onChange={setDay}
 * />
 */

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DateSelectProps {
  /** Type of date field */
  type: 'day' | 'month' | 'year'
  /** Currently selected value */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Disabled state */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

// Generate options based on type
function getOptions(type: DateSelectProps['type']): string[] {
  switch (type) {
    case 'day':
      return Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))
    case 'month':
      return Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
    case 'year':
      const currentYear = new Date().getFullYear()
      const startYear = currentYear - 100
      return Array.from({ length: 100 }, (_, i) => String(currentYear - i))
    default:
      return []
  }
}

function getPlaceholder(type: DateSelectProps['type']): string {
  switch (type) {
    case 'day':
      return 'DD'
    case 'month':
      return 'MM'
    case 'year':
      return 'YYYY'
  }
}

export function DateSelect({
  type,
  value,
  onChange,
  disabled = false,
  className,
}: DateSelectProps) {
  const options = getOptions(type)
  const placeholder = getPlaceholder(type)
  const id = `date-select-${type}`

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={`Select ${type}`}
        className={cn(
          // Base styles
          'w-full appearance-none rounded-lg border border-input',
          'bg-white px-4 py-3 pr-10',
          'body-text text-foreground',
          'transition-colors duration-200',
          
          // Focus state
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          
          // Disabled state
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          
          // Placeholder styling
          value === '' && 'text-muted-foreground',
          
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Dropdown Icon */}
      <ChevronDown
        className={cn(
          'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2',
          'h-5 w-5 text-muted-foreground',
          disabled && 'opacity-50'
        )}
        aria-hidden="true"
      />
    </div>
  )
}