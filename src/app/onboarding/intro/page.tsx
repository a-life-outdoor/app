'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function OnboardingIntro() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl text-center space-y-8">
        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          No two adventures are the same.
          <br />
          Neither are the people on them.
          <br />
          <span className="text-gray-600">
            Let's capture what makes you, you.
          </span>
        </h1>

        {/* CTA Button */}
        <Button
          onClick={() => router.push('/onboarding/basic-info')}
          className="px-12 py-6 text-lg rounded-xl bg-black text-white hover:bg-gray-800"
        >
          Enter basic info
        </Button>
      </div>
    </div>
  )
}