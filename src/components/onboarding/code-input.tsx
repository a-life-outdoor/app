/**
 * CodeInput Component
 * 
 * 4-digit verification code input with auto-focus and paste support.
 * Each digit gets its own input box.
 * 
 * @example
 * <CodeInput
 *   value={code}
 *   onChange={setCode}
 *   onComplete={(code) => verifyCode(code)}
 * />
 */

import React, { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface CodeInputProps {
  /** Current code value (0-4 digits) */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Called when all 4 digits are entered */
  onComplete?: (code: string) => void
  /** Number of digits (default: 4) */
  length?: number
  /** Show error state */
  error?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

export function CodeInput({
  value,
  onChange,
  onComplete,
  length = 4,
  error = false,
  disabled = false,
  className,
}: CodeInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Focus first empty input on mount
  useEffect(() => {
    const firstEmptyIndex = value.length
    if (firstEmptyIndex < length) {
      const input = inputRefs.current[firstEmptyIndex]
      if (input) {
        input.focus()
      }
    }
  }, [value.length, length])

  // Check if code is complete
  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value)
    }
  }, [value, length, onComplete])

  const handleChange = (index: number, digit: string) => {
    // Only allow digits
    if (digit && !/^\d$/.test(digit)) return

    const newValue = value.split('')
    newValue[index] = digit
    const updatedValue = newValue.join('').slice(0, length)
    
    onChange(updatedValue)

    // Auto-focus next input
    if (digit && index < length - 1) {
      const nextInput = inputRefs.current[index + 1]
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      
      if (value[index]) {
        // Clear current digit
        const newValue = value.split('')
        newValue[index] = ''
        onChange(newValue.join(''))
      } else if (index > 0) {
        // Move to previous input and clear it
        const newValue = value.split('')
        newValue[index - 1] = ''
        onChange(newValue.join(''))
        const prevInput = inputRefs.current[index - 1]
        if (prevInput) {
          prevInput.focus()
        }
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = inputRefs.current[index - 1]
      if (prevInput) {
        prevInput.focus()
      }
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      const nextInput = inputRefs.current[index + 1]
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange(pastedData)
    
    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, length - 1)
    const input = inputRefs.current[nextIndex]
    if (input) {
      input.focus()
    }
  }

  return (
    <div 
      className={cn('flex gap-3 justify-center', className)}
      role="group"
      aria-label="Verification code input"
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          disabled={disabled}
          aria-label={`Digit ${index + 1}`}
          className={cn(
            // Base styles
            'h-16 w-16 rounded-lg border-2 bg-white',
            'text-center text-2xl font-semibold text-foreground',
            'transition-all duration-200',
            
            // Focus state
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            focusedIndex === index && 'scale-105',
            
            // Error state
            error ? 'border-red-500' : 'border-input',
            
            // Filled state
            value[index] && 'border-primary',
            
            // Disabled state
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted'
          )}
        />
      ))}
    </div>
  )
}