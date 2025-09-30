import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Supabase Client für Server Components & API Routes
 * 
 * Verwendung in Server Components:
 * import { createClient } from '@/lib/supabase/server'
 * 
 * const supabase = await createClient()
 * const { data: { user } } = await supabase.auth.getUser()
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Wie der Client Cookies liest
        getAll() {
          return cookieStore.getAll()
        },
        // Wie der Client Cookies setzt
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // In Server Components kann setAll fehlschlagen
            // Das ist ok - Auth funktioniert trotzdem
          }
        },
      },
    }
  )
}