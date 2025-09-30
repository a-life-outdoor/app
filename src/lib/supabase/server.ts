import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'

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

  return createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      // Wie der Client Cookies liest
      getAll() {
        return cookieStore.getAll()
      },
      // Wie der Client Cookies setzt
      setAll(
        cookiesToSet: Array<{
          name: string
          value: string
          options?: Record<string, unknown>
        }>
      ) {
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
  })
}
