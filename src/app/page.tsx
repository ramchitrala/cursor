'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import Typical from 'react-typical'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'

interface School {
  id: string
  'school.name': string
  'school.city': string
  'school.state': string
}

interface SearchResult {
  type: 'school' | 'zip'
  value: string
  display: string
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(true)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounced search query for API calls
  const [debouncedQuery, setDebouncedQuery] = useState('')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 200)
    
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch schools from API
  const { data: schools, error } = useSWR(
    debouncedQuery.length >= 2 
      ? `https://api.data.gov/ed/collegescorecard/v1/schools?school.name=${encodeURIComponent(debouncedQuery)}&fields=id,school.name,school.city,school.state&per_page=20`
      : null,
    async (url) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch schools')
      const data = await response.json()
      return data.results || []
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )

  // Generate search results
  const searchResults: SearchResult[] = []
  
  if (schools && schools.length > 0) {
    schools.forEach((school: School) => {
      searchResults.push({
        type: 'school',
        value: `${school['school.name']}, ${school['school.city']}, ${school['school.state']}`,
        display: `${school['school.name']} • ${school['school.city']}, ${school['school.state']}`
      })
    })
  } else if (debouncedQuery.length >= 2 && !schools) {
    // Check if input matches ZIP code pattern
    const zipPattern = /^\d{5}$/
    if (zipPattern.test(debouncedQuery)) {
      searchResults.push({
        type: 'zip',
        value: debouncedQuery,
        display: `Search by ZIP: ${debouncedQuery}`
      })
    } else if (debouncedQuery.length >= 3) {
      searchResults.push({
        type: 'zip',
        value: '',
        display: 'Enter a 5-digit ZIP code to search by location'
      })
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showResults) return
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            handleResultSelect(searchResults[selectedIndex])
          } else if (searchQuery.trim()) {
            handleSearch()
          }
          break
        case 'Escape':
          setShowResults(false)
          setSelectedIndex(-1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showResults, selectedIndex, searchResults, searchQuery])

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Redirect to search results
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  const handleResultSelect = (result: SearchResult) => {
    setSearchQuery(result.value)
    setShowResults(false)
    setSelectedIndex(-1)
    
    // Auto-search when school is selected
    if (result.type === 'school') {
      setTimeout(() => handleSearch(), 100)
    }
  }

  const handleActionClick = (action: string) => {
    // Check if user is authenticated (simplified for demo)
    const isAuthenticated = false // In real app, check auth state
    
    if (!isAuthenticated && (action === '/create-listing' || action === '/roommates' || action === '/listings')) {
      // Show login modal for gated actions
      // setShowLoginModal(true) // This state variable is not defined in the original file
      return
    }
    
    // Navigate to the action
    if (action === '/create-listing') {
      window.location.href = '/listing/create'
    } else {
      window.location.href = action
    }
  }

  // Typing animation phrases
  const typingPhrases = [
    'Search your university',
    'Search your locality', 
    'Search by ZIP',
    'Search by city',
    'Search by state'
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation 
        title="RoomSpot"
        showBack={false}
        showHome={true}
        showMessenger={true}
        showPlus={true}
      />
      
      {/* Hero Section - 100vh, no scroll */}
      <div className="h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              Find Your Perfect
              <span className="block text-gray-600">Room & Roommate</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Search thousands of rooms near your university. Connect with roommates, 
              explore listings, and find your ideal living space.
            </p>
          </motion.div>

          {/* Animated Search Bar */}
          <motion.div 
            ref={searchRef}
            className="relative max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowResults(true)
                  setSelectedIndex(-1)
                }}
                onFocus={() => setShowResults(true)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent pr-32"
                aria-label="Search by university name"
                placeholder=""
              />
              
              {/* Animated placeholder text */}
              {!searchQuery && (
                <div className="absolute inset-0 flex items-center px-6 pointer-events-none">
                  <span className="text-lg text-gray-400">
                    <Typical
                      steps={typingPhrases}
                      loop={Infinity}
                      wrapper="span"
                      speed={50}
                      backSpeed={30}
                      backDelay={2000}
                    />
                  </span>
                </div>
              )}
              
              <motion.button
                type="submit"
                disabled={isSearching}
                onClick={handleSearch}
                className="absolute right-2 top-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </motion.button>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[60vh] overflow-y-auto z-50"
                >
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={`${result.type}-${index}`}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        index === selectedIndex 
                          ? 'bg-gray-100' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleResultSelect(result)}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      transition={{ duration: 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          result.type === 'school' ? 'bg-black' : 'bg-gray-400'
                        }`}>
                          {result.type === 'school' ? (
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-gray-700">{result.display}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <motion.div 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleActionClick('/listings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-black rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Browse Listings</h3>
                  <p className="text-gray-600">Explore available rooms and apartments</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleActionClick('/roommates')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-black rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-black">Find Roommates</h3>
                  <p className="text-gray-600">Connect with potential roommates</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleActionClick('/create-listing')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-black rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-black">List Your Room</h3>
                  <p className="text-gray-600">Share your space with others</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sixer Promo Banner */}
          <motion.div 
            className="mt-16 bg-black text-white rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Need a decision fast?</h3>
                <p className="text-gray-300">Try Sixer – $6.99 once.</p>
              </div>
              <Button 
                onClick={() => handleActionClick('/sixer')}
                variant="secondary"
                className="bg-white text-black hover:bg-gray-100"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 