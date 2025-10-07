'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface ProfileData {
  motivations: string[]
  preferred_group_size: string
  connection_depth: string
  group_vibe: string
  adventure_preference: string
  experience_priority: string
  ideal_evening: string
  talk_about_topic: string
  must_pack_item: string
  storyteller_or_host: string
  social_recharge: string
  wake_up_time: string
  trip_planning: string
  activity_level: string
  bedtime: string
  cleanliness_matters: string
  drinks_smokes: string
}

export async function submitProfile(userId: string, data: ProfileData) {
  const supabase = await createClient()

  // Check if profile exists
  const { data: existing } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (existing) {
    // Update existing profile
    const { error } = await supabase.from('user_profiles').update(data).eq('user_id', userId)

    if (error) throw error
  } else {
    // Create new profile
    const { error } = await supabase.from('user_profiles').insert({ user_id: userId, ...data })

    if (error) throw error
  }

  revalidatePath('/dashboard')
}
