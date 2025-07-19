'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Chat from '@/components/chat'

// Mock data with sample images and rent > 600
const mockListings = [
  {
    id: '1',
    title: 'Cozy 2BR near Campus',
    rent: 1200,
    utilities: 150,
    distanceToCampus: 0.8,
    isFurnished: true,
    allowsPets: false,
    vibeTags: ['Quiet', 'Study-friendly'],
    languages: ['English', 'Spanish'],
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop'],
    host: {
      name: 'Sarah M.',
      isVerified: true,
      university: 'NYU'
    }
  },
  {
    id: '2',
    title: 'Modern Studio Apartment',
    rent: 1400,
    utilities: 200,
    distanceToCampus: 1.2,
    isFurnished: false,
    allowsPets: true,
    vibeTags: ['Social', 'Party-friendly'],
    languages: ['English'],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop'],
    host: {
      name: 'Mike R.',
      isVerified: true,
      university: 'Columbia'
    }
  },
  {
    id: '3',
    title: 'Spacious 3BR House',
    rent: 1800,
    utilities: 250,
    distanceToCampus: 1.5,
    isFurnished: true,
    allowsPets: true,
    vibeTags: ['Clean', 'Relaxed'],
    languages: ['English', 'French'],
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop'],
    host: {
      name: 'Emma L.',
      isVerified: true,
      university: 'NYU'
    }
  },
  {
    id: '4',
    title: 'Downtown Loft',
    rent: 1600,
    utilities: 180,
    distanceToCampus: 2.1,
    isFurnished: true,
    allowsPets: false,
    vibeTags: ['Professional', 'Creative'],
    languages: ['English', 'German'],
    images: ['https://images.unsplash.com/photo-1560448075-bb485b067938?w=500&h=300&fit=crop'],
    host: {
      name: 'Alex K.',
      isVerified: true,
      university: 'Columbia'
    }
  }
]

const vibeTags = [
  'Quiet', 'Social', 'Study-friendly', 'Party-friendly', 'Clean', 'Relaxed',
  'Active', 'Creative', 'Professional', 'Outdoorsy'
]

const languages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean',
  'Arabic', 'Russian', 'Portuguese'
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    minRent: '600',
    maxRent: '',
    maxDistance: '',
    leaseLength: '',
    vibeTags: [] as string[],
    languages: [] as string[],
    allowsPets: false,
    isFurnished: false
  })
  const [showFilters, setShowFilters] = useState(false)
  const [userListings, setUserListings] = useState<any[]>([])
  const [showPremiumPopup, setShowPremiumPopup] = useState(false)
  const [showPremiumList, setShowPremiumList] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [hasPaidPremium, setHasPaidPremium] = useState(false)
  const [selectedRecipient, setSelectedRecipient] = useState({
    name: 'Sarah M.',
    avatar: '',
    isOnline: true
  })

  useEffect(() => {
    // Load user's listings from localStorage
    const savedListings = JSON.parse(localStorage.getItem('listings') || '[]')
    setUserListings(savedListings)

    // Check if user has paid premium
    const premiumStatus = localStorage.getItem('hasPaidPremium')
    setHasPaidPremium(premiumStatus === 'true')

    // Show premium popup after 3 seconds if user has listings
    if (savedListings.length > 0) {
      setTimeout(() => {
        setShowPremiumPopup(true)
      }, 3000)
    }
  }, [])

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleVibeTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      vibeTags: prev.vibeTags.includes(tag)
        ? prev.vibeTags.filter((t: string) => t !== tag)
        : [...prev.vibeTags, tag]
    }))
  }

  const toggleLanguage = (language: string) => {
    setFilters(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l: string) => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handlePremiumPay = () => {
    setShowPremiumPopup(false)
    setShowPremiumList(true)
    // Simulate payment
    localStorage.setItem('hasPaidPremium', 'true')
    setHasPaidPremium(true)
  }

  const handleMessageClick = (recipientName: string) => {
    setSelectedRecipient({
      name: recipientName,
      avatar: '',
      isOnline: true
    })
    setShowChat(true)
    setShowPremiumList(false)
  }

  const allListings = [...userListings, ...mockListings]

  const getTotalUnreadMessages = () => {
    // Mock unread count - in real app this would come from backend
    return userListings.length > 0 ? 3 : 0
  }

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navigation */}
      <Navigation 
        title="Dashboard"
        showBack={false}
        showHome={true}
        showMessenger={true}
        showPlus={true}
      />

      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-black">Filters</h2>
                  <motion.button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden text-sm text-gray-600 hover:text-black"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showFilters ? 'Hide' : 'Show'}
                  </motion.button>
                </div>

                <motion.div 
                  className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Rent Range */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Rent Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minRent}
                        onChange={(e) => handleFilterChange('minRent', e.target.value)}
                        className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxRent}
                        onChange={(e) => handleFilterChange('maxRent', e.target.value)}
                        className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-sm"
                      />
                    </div>
                  </div>

                  {/* Distance */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Max Distance (miles)
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      value={filters.maxDistance}
                      onChange={(e) => handleFilterChange('maxDistance', e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-sm"
                    />
                  </div>

                  {/* Lease Length */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Lease Length
                    </label>
                    <select
                      value={filters.leaseLength}
                      onChange={(e) => handleFilterChange('leaseLength', e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-sm"
                    >
                      <option value="">Any length</option>
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                    </select>
                  </div>

                  {/* Vibe Tags */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Vibe
                    </label>
                    <div className="space-y-2">
                      {vibeTags.map(tag => (
                        <motion.label 
                          key={tag} 
                          className="flex items-center space-x-3"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <input
                            type="checkbox"
                            checked={filters.vibeTags.includes(tag)}
                            onChange={() => toggleVibeTag(tag)}
                            className="rounded border-gray-300 text-black focus:ring-black"
                          />
                          <span className="text-sm text-black">{tag}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Languages
                    </label>
                    <div className="space-y-2">
                      {languages.map(language => (
                        <motion.label 
                          key={language} 
                          className="flex items-center space-x-3"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <input
                            type="checkbox"
                            checked={filters.languages.includes(language)}
                            onChange={() => toggleLanguage(language)}
                            className="rounded border-gray-300 text-black focus:ring-black"
                          />
                          <span className="text-sm text-black">{language}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  {/* Other Filters */}
                  <div className="space-y-3">
                    <motion.label 
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.allowsPets}
                        onChange={(e) => handleFilterChange('allowsPets', e.target.checked)}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm text-black">Allows pets</span>
                    </motion.label>
                    
                    <motion.label 
                      className="flex items-center space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.isFurnished}
                        onChange={(e) => handleFilterChange('isFurnished', e.target.checked)}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm text-black">Furnished</span>
                    </motion.label>
                  </div>

                  <motion.button
                    onClick={() => setFilters({
                      minRent: '600',
                      maxRent: '',
                      maxDistance: '',
                      leaseLength: '',
                      vibeTags: [],
                      languages: [],
                      allowsPets: false,
                      isFurnished: false
                    })}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear all filters
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3"
            variants={itemVariants}
          >
            {/* Search Bar */}
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location, university, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pl-10 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
                <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>

            {/* Your Listings Section */}
            {userListings.length > 0 && (
              <motion.div 
                className="mb-8"
                variants={itemVariants}
              >
                <h2 className="text-xl font-semibold text-black mb-6">Your Listings</h2>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                >
                  {userListings.map((listing, index) => (
                    <motion.div 
                      key={listing.id} 
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer relative"
                      variants={itemVariants}
                      whileHover={{ 
                        y: -5,
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.location.href = `/listing/${listing.id}`}
                    >
                      {/* New Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          New
                        </motion.span>
                      </div>

                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        <img 
                          src={listing.images[0]} 
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-black/80 text-white text-sm px-3 py-1 rounded-lg">
                          ${listing.rent}/mo
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-black text-base line-clamp-1">{listing.title}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-sm text-gray-600">
                            {listing.distanceToCampus} mi from campus
                          </span>
                          {listing.host.isVerified && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Verified
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {listing.vibeTags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {listing.host.name} • {listing.host.university}
                          </div>
                          <motion.button
                            className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* AI Recommendations */}
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-black mb-6">
                {userListings.length > 0 ? 'Recommended for you' : 'Available Listings'}
              </h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {mockListings.map((listing, index) => (
                  <motion.div 
                    key={listing.id} 
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = `/listing/${listing.id}`}
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <img 
                        src={listing.images[0]} 
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-black/80 text-white text-sm px-3 py-1 rounded-lg">
                        ${listing.rent}/mo
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-black text-base line-clamp-1">{listing.title}</h3>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-sm text-gray-600">
                          {listing.distanceToCampus} mi from campus
                        </span>
                        {listing.host.isVerified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {listing.vibeTags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {listing.host.name} • {listing.host.university}
                        </div>
                        <motion.button
                          className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Create Listing CTA */}
            <motion.div 
              className="bg-white rounded-xl border border-gray-200 p-8 text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-semibold text-black mb-3">
                Have a room to rent?
              </h3>
              <p className="text-base text-gray-600 mb-6">
                List your room and find the perfect roommate
              </p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/listing/create"
                  className="inline-flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg text-base font-semibold hover:bg-gray-800 transition-colors"
                >
                  Create Listing
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center border border-gray-300 bg-white text-black py-3 px-6 rounded-lg text-base font-semibold hover:bg-gray-50 transition-colors"
                >
                  Take Quiz
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Premium Popup */}
      <AnimatePresence>
        {showPremiumPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto text-center shadow-2xl border border-white/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6"
              >
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-semibold text-black mb-3"
              >
                🎉 Your listing is live!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 mb-4"
              >
                <span className="font-semibold text-purple-600">23 people</span> are searching for a spot in your locality!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-gray-500 mb-6"
              >
                Pay a premium fee of <span className="font-semibold text-black">$4.99</span> to view who's looking and confirm tenancy sooner.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.button
                  onClick={handlePremiumPay}
                  className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg text-base font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pay $4.99
                </motion.button>
                
                <motion.button
                  onClick={() => setShowPremiumPopup(false)}
                  className="flex-1 inline-flex items-center justify-center border border-gray-300 bg-white text-black py-3 px-6 rounded-lg text-base font-semibold hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Maybe Later
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium List */}
      <AnimatePresence>
        {showPremiumList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-black">People Looking in Your Area</h3>
                <motion.button
                  onClick={() => setShowPremiumList(false)}
                  className="text-gray-500 hover:text-black"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {['S', 'M', 'A', 'J', 'E', 'K'][i]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black">{['Sarah', 'Mike', 'Alex', 'Jenny', 'Emma', 'Kevin'][i]}</h4>
                        <p className="text-sm text-gray-600">{['NYU', 'Columbia', 'NYU', 'Columbia', 'NYU', 'Columbia'][i]} • Looking for roommate</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                          <span className="text-xs text-gray-500">2.1 mi away</span>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleMessageClick(['Sarah', 'Mike', 'Alex', 'Jenny', 'Emma', 'Kevin'][i])}
                        className="inline-flex items-center justify-center rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Message
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Component */}
      <Chat
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        recipient={selectedRecipient}
      />
    </motion.div>
  )
} 