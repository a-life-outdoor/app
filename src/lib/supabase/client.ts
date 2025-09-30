import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env'

/**
 * Supabase Client für Browser/Client Components
 *
 * Verwendung:
 * import { createClient } from '@/lib/supabase/client'
 *
 * const supabase = createClient()
 * const { data, error } = await supabase.auth.getUser()
 */
export function createClient() {
  // Erstelle den Supabase Client mit type-safe environment variables
  return createBrowserClient(env.supabase.url, env.supabase.anonKey)
}
