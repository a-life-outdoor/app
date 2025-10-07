/**
 * AgeModal Component
 * 
 * Confirmation modal that displays calculated age from birthday.
 * Shows formatted birthdate and allows user to edit or confirm.
 * 
 * @example
 * <AgeModal
 *   open={showModal}
 *   age={26}
 *   birthDate={new Date(1999, 5, 13)}
 *   onEdit={() => setShowModal(false)}
 *   onConfirm={handleConfirm}
 * />
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface AgeModalProps {
  /** Control modal visibility */
  open: boolean
  /** Calculated age */
  age: number
  /** Birth date object */
  birthDate: Date
  /** Edit button handler (close modal, go back to date inputs) */
  onEdit: () => void
  /** Confirm button handler (proceed to next step) */
  onConfirm: () => void
  /** Additional CSS classes */
  className?: string
}

export function AgeModal({
  open,
  age,
  birthDate,
  onEdit,
  onConfirm,
  className,
}: AgeModalProps) {
  if (!open) return null

  // Format date as "June 13, 1999"
  const formattedDate = birthDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Check if user is under 18
  const isUnderage = age < 18

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-modal-title"
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) onEdit()
      }}
    >
      <div
        className={cn(
          'w-full max-w-sm rounded-2xl bg-white p-8',
          'shadow-xl animate-in fade-in-0 zoom-in-95 duration-200',
          className
        )}
      >
        {/* Age Display */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <h2 
            id="age-modal-title"
            className="text-4xl font-bold text-foreground"
          >
            You're {age}
          </h2>
          <p className="text-lg text-muted-foreground">
            Born {formattedDate}
          </p>
        </div>

        {/* Underage Warning */}
        {isUnderage && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <p className="text-sm font-medium text-red-800">
              You must be 18 or older to create an account.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Edit Button */}
          <button
            type="button"
            onClick={onEdit}
            className={cn(
              'flex-1 rounded-xl border-2 border-primary bg-white px-6 py-3',
              'body-text font-semibold text-primary',
              'transition-all hover:bg-primary/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            )}
          >
            Edit
          </button>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={isUnderage}
            className={cn(
              'flex-1 rounded-xl border-2 border-primary bg-primary px-6 py-3',
              'body-text font-semibold text-white',
              'transition-all hover:bg-primary/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary'
            )}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}