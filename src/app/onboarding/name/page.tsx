'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function OnboardingNameScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const canProceed = firstName.trim().length > 0

  return (
    <div className="min-h-screen w-full bg-[#F7F7FB]">
      <main className="mx-auto max-w-md min-h-screen px-5 pt-6 pb-28 relative">
        {/* Top progress/header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: '#A44066' }} />
          <div className="flex items-center gap-2">
            <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: '#D4D6DD' }} />
            <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: '#D4D6DD' }} />
            <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: '#D4D6DD' }} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[32px] font-semibold leading-[38px] tracking-[0.01em] text-[#2F3036] mb-6">
          What’s your name?
        </h1>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-semibold leading-[19px] tracking-[0.005em] text-[#2F3036]">
              First name <span className="font-normal text-[#6B6C72]">(required)</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder=""
              className="h-14 w-full rounded-2xl border border-[#C5C6CC] bg-white px-4 text-[16px] leading-[22px] placeholder:text-[#8F9098] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A44066]"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-semibold leading-[19px] tracking-[0.005em] text-[#2F3036]">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder=""
              className="h-14 w-full rounded-2xl border border-[#C5C6CC] bg-white px-4 text-[16px] leading-[22px] placeholder:text-[#8F9098] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A44066]"
            />
            <p className="text-[13px] leading-5 tracking-[0.01em] text-[#71727A]">
              Last name is optional and only shared with your connections.{' '}
              <button type="button" className="font-medium text-[#A44066] underline-offset-2 hover:underline">Why?</button>
            </p>
          </div>
        </div>

        {/* Floating next button */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-end px-5">
          <button
            type="button"
            disabled={!canProceed}
            aria-label="Continue"
            className="pointer-events-auto h-12 w-12 rounded-full border-2 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition bg-white"
            style={{ borderColor: canProceed ? '#A44066' : '#757575' }}
          >
            <ArrowRight
              className="h-6 w-6"
              style={{ color: canProceed ? '#A44066' : '#757575' }}
              strokeWidth={3.5}
            />
          </button>
        </div>
      </main>
    </div>
  )
}


