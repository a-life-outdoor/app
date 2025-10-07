/**
 * LocationInput Component
 * 
 * Location search with map preview and autocomplete suggestions.
 * Uses OpenStreetMap Nominatim API (free, no API key required).
 * 
 * @example
 * <LocationInput
 *   value={location}
 *   onChange={setLocation}
 *   placeholder="Search for your city..."
 * />
 */

import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Location {
  city: string
  country: string
  displayName: string
  coordinates?: {
    lat: number
    lon: number
  }
}

export interface LocationInputProps {
  /** Current location value */
  value: Location | null
  /** Change handler */
  onChange: (location: Location | null) => void
  /** Input placeholder text */
  placeholder?: string
  /** Show error state */
  error?: string
  /** Additional CSS classes */
  className?: string
}

interface NominatimResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address: {
    city?: string
    town?: string
    village?: string
    country?: string
  }
}

export function LocationInput({
  value,
  onChange,
  placeholder = 'Search for your city...',
  error,
  className,
}: LocationInputProps) {
  const [query, setQuery] = useState(value?.displayName || '')
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch suggestions from Nominatim
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(searchQuery)}` +
        `&format=json` +
        `&addressdetails=1` +
        `&limit=5` +
        `&featuretype=city`
      )

      if (response.ok) {
        const data: NominatimResult[] = await response.json()
        setSuggestions(data)
        setShowSuggestions(true)
      }
    } catch (err) {
      console.error('Location search failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Debounced search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(newQuery)
    }, 300)
  }

  // Select a location
  const handleSelectLocation = (result: NominatimResult) => {
    const city = result.address.city || result.address.town || result.address.village || ''
    const country = result.address.country || ''

    const location: Location = {
      city,
      country,
      displayName: result.display_name,
      coordinates: {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
      },
    }

    setQuery(result.display_name)
    onChange(location)
    setShowSuggestions(false)
    setSuggestions([])
  }

  return (
    <div ref={wrapperRef} className={cn('flex flex-col gap-4', className)}>
      {/* Map Preview */}
      {value?.coordinates && (
        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-input bg-muted">
          {/* Static map image from OpenStreetMap */}
          <img
            src={`https://staticmap.openstreetmap.de/staticmap.php?center=${value.coordinates.lat},${value.coordinates.lon}&zoom=13&size=600x400&markers=${value.coordinates.lat},${value.coordinates.lon},red-pushpin`}
            alt={`Map of ${value.city}`}
            className="h-full w-full object-cover"
          />
          
          {/* Location Pin Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true)
            }}
            placeholder={placeholder}
            aria-label="Location search"
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            className={cn(
              'w-full rounded-lg border bg-white px-4 py-3 pr-10',
              'body-text text-foreground placeholder:text-muted-foreground',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              error ? 'border-red-500' : 'border-input'
            )}
          />

          {/* Loading Spinner */}
          {isLoading && (
            <Loader2 
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            role="listbox"
            className="absolute z-10 mt-2 w-full rounded-lg border border-input bg-white shadow-lg max-h-60 overflow-auto"
          >
            {suggestions.map((result) => (
              <li key={result.place_id}>
                <button
                  type="button"
                  onClick={() => handleSelectLocation(result)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-start gap-3"
                >
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="body-text text-foreground">
                    {result.display_name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* No Results Message */}
        {showSuggestions && !isLoading && query.length >= 2 && suggestions.length === 0 && (
          <div className="absolute z-10 mt-2 w-full rounded-lg border border-input bg-white shadow-lg p-4">
            <p className="helper-text text-center">
              No locations found. Try a different search.
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="helper-text text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Helper Text */}
      <p className="helper-text">
        We will use this information to show you ongoing trips and activities near your home.
      </p>
    </div>
  )
}