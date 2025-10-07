/**
 * FormInput Component
 * 
 * Styled input field with label, helper text, and error states.
 * Designed to match the onboarding design system.
 * 
 * @example
 * <FormInput
 *   label="First name (required)"
 *   value={firstName}
 *   onChange={(e) => setFirstName(e.target.value)}
 *   helperText="This will be shown on your profile"
 *   error={errors.firstName}
 * />
 */

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above input */
  label: string
  /** Helper text shown below input */
  helperText?: string | React.ReactNode
  /** Error message (displays in red) */
  error?: string
  /** Additional classes for the input element */
  inputClassName?: string
  /** Additional classes for the wrapper */
  wrapperClassName?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { 
      label, 
      helperText, 
      error, 
      className, 
      inputClassName,
      wrapperClassName,
      id,
      ...props 
    },
    ref
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    const helperId = helperText ? `${inputId}-helper` : undefined
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className={cn('flex flex-col gap-2', wrapperClassName)}>
        {/* Label */}
        <label 
          htmlFor={inputId}
          className="body-text font-medium text-foreground"
        >
          {label}
        </label>

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={cn(helperId, errorId)}
          aria-invalid={!!error}
          className={cn(
            // Base styles
            'w-full rounded-lg border bg-white px-4 py-3',
            'body-text text-foreground placeholder:text-muted-foreground',
            'transition-colors duration-200',
            
            // Focus state
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            
            // Error state
            error ? 'border-red-500' : 'border-input',
            
            // Disabled state
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
            
            inputClassName
          )}
          {...props}
        />

        {/* Helper Text or Error */}
        {(helperText || error) && (
          <div 
            id={error ? errorId : helperId}
            className={cn(
              'helper-text',
              error && 'text-red-600'
            )}
            role={error ? 'alert' : undefined}
          >
            {error || helperText}
          </div>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'