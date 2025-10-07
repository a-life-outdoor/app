'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitProfile } from './actions'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const TOTAL_QUESTIONS = 17

export default function OnboardingForm({ userId }: { userId: string }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [formData, setFormData] = useState({
    motivations: [] as string[],
    preferred_group_size: '',
    connection_depth: '',
    group_vibe: '',
    adventure_preference: '',
    experience_priority: '',
    ideal_evening: '',
    talk_about_topic: '',
    must_pack_item: '',
    storyteller_or_host: '',
    social_recharge: '',
    wake_up_time: '',
    trip_planning: '',
    activity_level: '',
    bedtime: '',
    cleanliness_matters: '',
    drinks_smokes: '',
  })

  const handleSingleSelect = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Auto-advance after selection
    setTimeout(() => {
      if (currentQuestion < TOTAL_QUESTIONS) {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 300)
  }

  const handleMultiSelect = (value: string) => {
    const current = formData.motivations
    if (current.includes(value)) {
      setFormData({ ...formData, motivations: current.filter(v => v !== value) })
    } else if (current.length < 2) {
      setFormData({ ...formData, motivations: [...current, value] })
    }
  }

  const handleTextInput = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    await submitProfile(userId, formData)
    router.push('/dashboard')
  }

  const canProceed = () => {
    switch (currentQuestion) {
      case 1: return formData.motivations.length > 0
      case 2: return formData.preferred_group_size !== ''
      case 3: return formData.connection_depth !== ''
      case 4: return formData.group_vibe !== ''
      case 5: return formData.adventure_preference !== ''
      case 6: return formData.experience_priority !== ''
      case 7: return formData.ideal_evening !== ''
      case 8: return formData.talk_about_topic.trim() !== ''
      case 9: return formData.must_pack_item.trim() !== ''
      case 10: return formData.storyteller_or_host !== ''
      case 11: return formData.social_recharge !== ''
      case 12: return formData.wake_up_time !== ''
      case 13: return formData.trip_planning !== ''
      case 14: return formData.activity_level !== ''
      case 15: return formData.bedtime !== ''
      case 16: return formData.cleanliness_matters !== ''
      case 17: return formData.drinks_smokes !== ''
      default: return false
    }
  }

  const progress = (currentQuestion / TOTAL_QUESTIONS) * 100

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Progress Bar */}
      <div className="w-full px-6 pt-6">
        <Progress value={progress} className="h-1" />
        <p className="text-sm text-gray-400 mt-2">
          {currentQuestion} of {TOTAL_QUESTIONS}
        </p>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          
          {/* Q1: Motivations (Multi-select) */}
          {currentQuestion === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                Why are you here? (choose up to 2)
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'make_friends', label: 'Make new friends' },
                  { value: 'experience_nature', label: 'Experience nature together' },
                  { value: 'escape_city', label: 'Escape the city stress' },
                  { value: 'inspiration_exchange', label: 'Inspiration & exchange' },
                  { value: 'sports_activities', label: 'Sports and activities with likeminded people' },
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleMultiSelect(option.value)}
                    className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all text-lg
                      ${formData.motivations.includes(option.value)
                        ? 'border-white bg-white/10'
                        : 'border-gray-700 hover:border-gray-500'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${formData.motivations.includes(option.value) ? 'border-white' : 'border-gray-500'}`}>
                        {formData.motivations.includes(option.value) && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="w-full md:w-auto px-12 py-6 text-lg rounded-xl"
              >
                Next
              </Button>
            </div>
          )}

          {/* Q2: Group Size */}
          {currentQuestion === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                What group size feels right?
              </h2>
              <RadioGroup value={formData.preferred_group_size} onValueChange={(value) => handleSingleSelect('preferred_group_size', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'small_intimate', label: 'Small & intimate (3–4 people)' },
                    { value: 'medium_lively', label: 'Slightly bigger & lively (5–6 people)' },
                    { value: 'large_groups', label: 'Big groups (7+ people)' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.preferred_group_size === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q3: Connection Depth */}
          {currentQuestion === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                How deep do you want the connection to go?
              </h2>
              <RadioGroup value={formData.connection_depth} onValueChange={(value) => handleSingleSelect('connection_depth', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'light_easy', label: 'Light & easy - see what happens' },
                    { value: 'open_real', label: 'Open conversations & real closeness' },
                    { value: 'natural_mix', label: 'A bit of both - as long as it feels natural' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.connection_depth === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q4: Group Vibe */}
          {currentQuestion === 4 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                When you're with a group of new people, what's your natural vibe?
              </h2>
              <RadioGroup value={formData.group_vibe} onValueChange={(value) => handleSingleSelect('group_vibe', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'bring_energy', label: 'I like to bring the energy and keep the group alive' },
                    { value: 'part_of_buzz', label: 'I enjoy being part of the buzz, but not always in the spotlight' },
                    { value: 'smaller_circles', label: 'I prefer to pick smaller circles or 1:1 conversations' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.group_vibe === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q5: Adventure Preference */}
          {currentQuestion === 5 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                When it comes to adventures, what excites you more?
              </h2>
              <RadioGroup value={formData.adventure_preference} onValueChange={(value) => handleSingleSelect('adventure_preference', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'new_things', label: 'Trying new things I have never done before' },
                    { value: 'balance', label: 'A good balance of new and familiar' },
                    { value: 'know_and_love', label: 'Sticking to what I know and love' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.adventure_preference === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q6: Experience Priority */}
          {currentQuestion === 6 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                What matters most to you in shared experiences?
              </h2>
              <RadioGroup value={formData.experience_priority} onValueChange={(value) => handleSingleSelect('experience_priority', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'connections', label: 'Building real connections & friendship' },
                    { value: 'nature', label: 'Experiencing nature & slowing down' },
                    { value: 'fun_stories', label: 'Having fun & creating stories to tell' },
                    { value: 'learning_growing', label: 'Learning new perspectives & growing' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.experience_priority === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q7: Ideal Evening */}
          {currentQuestion === 7 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                Your ideal evening after a day outdoors looks like…
              </h2>
              <RadioGroup value={formData.ideal_evening} onValueChange={(value) => handleSingleSelect('ideal_evening', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'laughs_jokes', label: 'A lot of laughs, jokes, and easy vibes' },
                    { value: 'deep_conversations', label: 'Deep conversations on the couch' },
                    { value: 'mix_mood', label: 'A mix of both, depending on the mood' },
                    { value: 'games_movies', label: 'Playing games or watching a movie with casual conversations' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.ideal_evening === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q8: Talk About Topic (Text Input) */}
          {currentQuestion === 8 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                What topic could you talk about for hours?
              </h2>
              <Input
                type="text"
                value={formData.talk_about_topic}
                onChange={(e) => handleTextInput('talk_about_topic', e.target.value)}
                placeholder="Type here..."
                maxLength={150}
                className="w-full px-6 py-4 text-lg bg-black border-2 border-gray-700 rounded-xl focus:border-white"
              />
              <p className="text-sm text-gray-400">This is your public display name.</p>
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="w-full md:w-auto px-12 py-6 text-lg rounded-xl"
              >
                Next
              </Button>
            </div>
          )}

          {/* Q9: Must Pack Item (Text Input) */}
          {currentQuestion === 9 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                Your "must-pack" item for any trip?
              </h2>
              <Input
                type="text"
                value={formData.must_pack_item}
                onChange={(e) => handleTextInput('must_pack_item', e.target.value)}
                placeholder="Type here..."
                maxLength={100}
                className="w-full px-6 py-4 text-lg bg-black border-2 border-gray-700 rounded-xl focus:border-white"
              />
              <p className="text-sm text-gray-400">This is your public display name.</p>
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="w-full md:w-auto px-12 py-6 text-lg rounded-xl"
              >
                Next
              </Button>
            </div>
          )}

          {/* Q10: Storyteller or Host */}
          {currentQuestion === 10 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                Are you the one telling a story or making sure everyone has a drink?
              </h2>
              <RadioGroup value={formData.storyteller_or_host} onValueChange={(value) => handleSingleSelect('storyteller_or_host', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'storyteller', label: 'Storyteller' },
                    { value: 'host', label: 'Host' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.storyteller_or_host === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q11: Social Recharge */}
          {currentQuestion === 11 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                How do you recharge after social activities?
              </h2>
              <RadioGroup value={formData.social_recharge} onValueChange={(value) => handleSingleSelect('social_recharge', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'quiet_alone', label: 'Quiet time alone with a book or music' },
                    { value: 'one_on_one', label: '1:1 hangout with a close friend' },
                    { value: 'workout_walk', label: 'A workout, walk, or run' },
                    { value: 'creative_downtime', label: 'Creative downtime (journaling, gaming, art)' },
                    { value: 'more_social', label: 'More social energy - I love keeping the momentum going' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.social_recharge === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q12: Wake Up Time */}
          {currentQuestion === 12 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                My ideal day starts at...
              </h2>
              <RadioGroup value={formData.wake_up_time} onValueChange={(value) => handleSingleSelect('wake_up_time', value)}>
                <div className="space-y-3">
                  {[
                    { value: '5am', label: '5am' },
                    { value: '7am', label: '7am' },
                    { value: '9am', label: '9am' },
                    { value: 'whenever', label: 'Whenever I wake up' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.wake_up_time === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q13: Trip Planning */}
          {currentQuestion === 13 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                I prefer trips that are...
              </h2>
              <RadioGroup value={formData.trip_planning} onValueChange={(value) => handleSingleSelect('trip_planning', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'highly_planned', label: 'Highly planned' },
                    { value: 'loosely_planned', label: 'Loosely planned' },
                    { value: 'spontaneous', label: 'Completely spontaneous' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.trip_planning === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q14: Activity Level */}
          {currentQuestion === 14 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                My activity level is...
              </h2>
              <RadioGroup value={formData.activity_level} onValueChange={(value) => handleSingleSelect('activity_level', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'relaxed', label: 'Relaxed' },
                    { value: 'moderate', label: 'Moderate' },
                    { value: 'high_energy', label: 'High-energy' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.activity_level === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q15: Bedtime */}
          {currentQuestion === 15 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                I go to bed typically around...
              </h2>
              <RadioGroup value={formData.bedtime} onValueChange={(value) => handleSingleSelect('bedtime', value)}>
                <div className="space-y-3">
                  {[
                    { value: '9pm', label: '9pm' },
                    { value: '11pm', label: '11pm' },
                    { value: '1am', label: '1am' },
                    { value: 'depends', label: 'Depends on the day' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.bedtime === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q16: Cleanliness */}
          {currentQuestion === 16 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                Cleanliness matters to me...
              </h2>
              <RadioGroup value={formData.cleanliness_matters} onValueChange={(value) => handleSingleSelect('cleanliness_matters', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'not_much', label: 'Not so much' },
                    { value: 'somewhat', label: 'Somewhat' },
                    { value: 'a_lot', label: 'A lot' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.cleanliness_matters === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q17: Drinks & Smokes */}
          {currentQuestion === 17 && (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-medium mb-8">
                What's your vibe when it comes to drinks & smokes?
              </h2>
              <RadioGroup value={formData.drinks_smokes} onValueChange={(value) => handleSingleSelect('drinks_smokes', value)}>
                <div className="space-y-3">
                  {[
                    { value: 'love_drink_smoke', label: 'Love a drink or cigarette with good conversation' },
                    { value: 'social_vibe', label: 'Happy to join the social vibe, but not really my thing' },
                    { value: 'prefer_free', label: 'I prefer to keep it alcohol & smoke free' },
                    { value: 'flexible', label: 'Totally flexible - depends on the mood' },
                  ].map(option => (
                    <div key={option.value}>
                      <label
                        htmlFor={option.value}
                        className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl border-2 transition-all cursor-pointer text-lg
                          ${formData.drinks_smokes === option.value
                            ? 'border-white bg-white/10'
                            : 'border-gray-700 hover:border-gray-500'
                          }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="w-6 h-6" />
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

        </div>
      </div>

      {/* Navigation Footer */}
      <div className="w-full px-6 pb-6">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          {currentQuestion > 1 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              className="text-gray-400 hover:text-white"
            >
              ← Back
            </Button>
          ) : (
            <div />
          )}

          {currentQuestion === TOTAL_QUESTIONS && (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="px-12 py-6 text-lg rounded-xl bg-white text-black hover:bg-gray-200"
            >
              Complete Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}