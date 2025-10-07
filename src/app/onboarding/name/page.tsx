'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function OnboardingNameScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const canProceed = firstName.trim().length > 0

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex items-center justify-center p-4">
      {/* Mobile frame (375x812) */}
      <div className="relative w-[375px] h-[812px] bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        {/* iOS-style status bar (44px) */}
        <div className="absolute inset-x-0 top-0 h-11 backdrop-blur-xl bg-white/70">
          <div className="h-full flex items-center justify-between px-4">
            <div className="text-[15px] font-semibold tracking-[-0.165px] text-[#1F2024]">9:41</div>
            <div className="flex items-center gap-2 text-[#1F2024]">
              <div className="flex items-end gap-[3px]">
                <span className="inline-block h-[14px] w-[3px] rounded-[1.2px] bg-black" />
                <span className="inline-block h-[10px] w-[3px] rounded-[1.2px] bg-black" />
                <span className="inline-block h-[6px] w-[3px] rounded-[1.2px] bg-black" />
                <span className="inline-block h-[2px] w-[3px] rounded-[1.2px] bg-black" />
              </div>
              <div className="h-[17px] w-[19px] bg-[#1F2024]/90 rounded-[2px]" />
              <div className="relative h-5 w-[29px]">
                <div className="absolute inset-0 rounded-[3px] border border-[#1F2024]" />
                <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 h-2 w-[2px] bg-[#1F2024] rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="absolute inset-x-0 top-11 bottom-0">
          {/* Header icons and badges */}
          <div className="relative h-12">
            <div className="absolute left-6 top-[18px] h-6 w-6 rounded-full" style={{ backgroundColor: '#A44066' }} />
            <div className="absolute left-[55px] top-[22px] h-[5px] w-[5px] rounded-full" style={{ backgroundColor: '#D4D6DD' }} />
            <div className="absolute left-[69px] top-[22px] h-[5px] w-[5px] rounded-full" style={{ backgroundColor: '#D4D6DD' }} />
            <div className="absolute left-[83px] top-[22px] h-[5px] w-[5px] rounded-full" style={{ backgroundColor: '#D4D6DD' }} />
          </div>

          {/* Title + form */}
          <div className="px-6">
            <h1 className="text-[28px] font-semibold leading-[33px] tracking-[0.01em] text-[#2F3036] mb-6">
              Personal details
            </h1>

            <div className="flex flex-col gap-4">
              {/* First name (required) */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold leading-[19px] tracking-[0.005em] text-[#2F3036]">
                  First name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="h-12 w-full rounded-xl border border-[#C5C6CC] px-4 text-[14px] leading-[18px] placeholder:text-[#8F9098] focus:outline-none focus:ring-2 focus:ring-[#A44066]"
                  autoFocus
                />
              </div>

              {/* Last name (optional) */}
              <div className="flex flex-col gap-2">
                <label className="text-[16px] font-semibold leading-[19px] tracking-[0.005em] text-[#2F3036]">
                  Last name (optional)
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="h-12 w-full rounded-xl border border-[#C5C6CC] px-4 text-[14px] leading-[18px] placeholder:text-[#8F9098] focus:outline-none focus:ring-2 focus:ring-[#A44066]"
                />
                <p className="text-[12px] leading-4 tracking-[0.01em] text-[#71727A]">
                  Last name is optional and only shared with your connections. <button type="button" className="font-medium text-[#A44066] underline-offset-2 hover:underline">Why?</button>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom controller area */}
          <div className="absolute inset-x-0 bottom-0 h-[124px]">
            {/* Home indicator */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 h-[6px] w-[133px] rounded-[3px] bg-[#1F2024]" />

            {/* Arrow button (bottom-right) */}
            <div className="absolute right-6 bottom-[64px]">
              <button
                type="button"
                disabled={!canProceed}
                aria-label="Continue"
                className="h-10 w-10 rounded-full border-2 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition"
                style={{
                  borderColor: canProceed ? '#A44066' : '#757575',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <ArrowRight
                  className="h-5 w-5"
                  style={{ color: canProceed ? '#A44066' : '#757575' }}
                  strokeWidth={3.5}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


