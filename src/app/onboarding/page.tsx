import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import OnboardingForm from './onboarding-form'

export default async function OnboardingPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  // Check if profile already completed
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (profile && profile.wake_up_time) {
    // Profile exists and is complete, redirect to dashboard
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Let's get to know you</h1>
          <p className="text-gray-600 mt-2">
            Answer these questions to find your perfect travel companions
          </p>
        </div>
        <OnboardingForm userId={user.id} />
      </div>
    </div>
  )
}
