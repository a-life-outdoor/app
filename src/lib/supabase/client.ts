import { createBrowserClient } from '@supabase/ssr'

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
  // Hole die Umgebungsvariablen aus .env.local
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Erstelle den Supabase Client
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}