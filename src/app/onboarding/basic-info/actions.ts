'use server'

import { createClient } from '@/lib/supabase/server'

interface BasicInfoData {
  first_name: string
  last_name: string
  date_of_birth: string
  location: string
  gender: string
}

export async function saveBasicInfo(userId: string, data: BasicInfoData) {
  const supabase = await createClient()

  // Parse DD/MM/YYYY to YYYY-MM-DD
  const parts = data.date_of_birth.split('/')
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`

  // Wait a moment for trigger to complete
  await new Promise(resolve => setTimeout(resolve, 500))

  // Save profile
  const { error: profileError } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: userId,
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: formattedDate,
      location: data.location,
      gender: data.gender,
    })

  if (profileError) {
    console.error('Error saving profile:', profileError)
    throw profileError
  }

  return { success: true }
}
