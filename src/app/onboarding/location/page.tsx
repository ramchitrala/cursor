'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LocationPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Request location permission on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          setError('Unable to get your location. Please enable location services.')
        }
      )
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!location) {
      setError('Please allow location access to continue')
      setIsLoading(false)
      return
    }

    try {
      // TODO: Save location data to backend
      console.log('Saving location:', { location, address })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Failed to save location. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualLocation = () => {
    // For demo purposes, set a default location
    setLocation({ lat: 40.7128, lng: -74.0060 }) // NYC coordinates
    setAddress('New York, NY')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-black"></div>
            <span className="text-xl font-bold">RoomSpot</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Final Step
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Set Your Location
            </h1>
            <p className="text-muted-foreground">
              Help us find roommates near your campus. We'll use this to match you with nearby students.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-red-800">{error}</span>
                </div>
              </div>
            )}

            {location ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-green-800">Location captured successfully</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address (Optional)
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
                    />
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Coordinates:</div>
                    <div className="font-mono text-sm">
                      {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleManualLocation}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Use Different Location
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-black/90 disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? 'Saving...' : 'Complete Setup'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Allow Location Access
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We need your location to help you find roommates near your campus. Your location is only used for matching and is never shared with other users.
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-black/90 transition-colors"
                  >
                    Allow Location Access
                  </button>
                  
                  <button
                    onClick={handleManualLocation}
                    className="w-full px-6 py-3 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Enter Location Manually
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="/privacy" className="text-foreground hover:underline">Privacy Policy</a>
              {' '}and{' '}
              <a href="/terms" className="text-foreground hover:underline">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 