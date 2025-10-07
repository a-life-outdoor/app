import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Wenn nicht eingeloggt, redirect zu Login
  if (error || !user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">Micro Adventures</h1>
            <form action="/auth/logout" method="post">
              <button type="submit" className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                Log out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600 mt-2">User ID: {user.id}</p>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Next: Complete your profile to start matching with other travelers.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
