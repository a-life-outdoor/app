/**
 * Logout Route Handler
 * 
 * Handles user logout by calling Supabase signOut
 * and redirecting to login page.
 * 
 * File: src/app/auth/logout/route.ts
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to log out' },
      { status: 500 }
    )
  }

  // Redirect to login page
  return NextResponse.redirect(
    new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  )
}

export async function GET() {
  // Also support GET requests for direct browser navigation
  const supabase = await createClient()
  
  await supabase.auth.signOut()

  // Redirect to login page
  return NextResponse.redirect(
    new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  )
}