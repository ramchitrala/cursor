'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import Navigation from '@/components/navigation'
import Chat from '@/components/chat'

interface ListingData {
  id: string
  title: string
  rent: number
  utilities: number
  distanceToCampus: number
  isFurnished: boolean
  allowsPets: boolean
  vibeTags: string[]
  languages: string[]
  description: string
  images: string[]
  host: {
    name: string
    isVerified: boolean
    university: string
  }
  createdAt: string
}

export default function ListingDetailPage() {
  const params = useParams()
  const listingId = params.id as string
  const [listing, setListing] = useState<ListingData | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [selectedRecipient, setSelectedRecipient] = useState({
    name: 'Host',
    avatar: '',
    isOnline: true
  })

  useEffect(() => {
    // Load listing from localStorage or mock data
    const savedListings = JSON.parse(localStorage.getItem('listings') || '[]')
    const foundListing = savedListings.find((l: any) => l.id === listingId)
    
    if (foundListing) {
      setListing(foundListing)
    } else {
      // Mock listing for demo
      setListing({
        id: listingId,
        title: 'Cozy 2BR near Campus',
        rent: 1200,
        utilities: 150,
        distanceToCampus: 0.8,
        isFurnished: true,
        allowsPets: false,
        vibeTags: ['Quiet', 'Study-friendly'],
        languages: ['English', 'Spanish'],
        description: 'Beautiful 2-bedroom apartment located just 0.8 miles from campus. Fully furnished with modern amenities, perfect for students. Quiet building with great neighbors.',
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop'],
        host: {
          name: 'Sarah M.',
          isVerified: true,
          university: 'NYU'
        },
        createdAt: new Date().toISOString()
      })
    }
  }, [listingId])

  const handleMessageClick = () => {
    setSelectedRecipient({
      name: listing?.host?.name || 'Host',
      avatar: '',
      isOnline: true
    })
    setShowChat(true)
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-black border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="Listing Details" 
        showBack={true}
      />

      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative"
            >
              <img 
                src={listing.images[0]} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/80 text-white text-lg px-4 py-2 rounded-lg font-semibold">
                ${listing.rent}/mo
              </div>
            </motion.div>

            {/* Listing Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">{listing.title}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span>{listing.distanceToCampus} mi from campus</span>
                  {listing.host.isVerified && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified Host
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <div className="text-2xl font-bold text-black">${listing.rent}</div>
                  <div className="text-sm text-gray-600">Monthly Rent</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <div className="text-2xl font-bold text-black">${listing.utilities}</div>
                  <div className="text-sm text-gray-600">Utilities</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <div className="text-2xl font-bold text-black">{listing.distanceToCampus}mi</div>
                  <div className="text-sm text-gray-600">From Campus</div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <div className="text-2xl font-bold text-black">{listing.vibeTags.length}</div>
                  <div className="text-sm text-gray-600">Vibe Tags</div>
                </motion.div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-black mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{listing.description}</p>
              </div>

              {/* Vibe Tags */}
              <div>
                <h2 className="text-xl font-semibold text-black mb-3">Vibe</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.vibeTags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h2 className="text-xl font-semibold text-black mb-3">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.languages.map((language, index) => (
                    <motion.span
                      key={language}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
                    >
                      {language}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-black mb-3">Details</h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600">Furnished:</span>
                      <span className={listing.isFurnished ? 'text-green-600' : 'text-red-600'}>
                        {listing.isFurnished ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600">Pets allowed:</span>
                      <span className={listing.allowsPets ? 'text-green-600' : 'text-red-600'}>
                        {listing.allowsPets ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-black mb-3">Host</h2>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {listing.host.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-black">{listing.host.name}</div>
                      <div className="text-sm text-gray-600">{listing.host.university}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <motion.button
                  onClick={handleMessageClick}
                  className="flex-1 inline-flex items-center justify-center bg-black text-white py-4 px-6 rounded-lg text-base font-semibold hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message Host
                </motion.button>
                
                <motion.button
                  className="flex-1 inline-flex items-center justify-center border border-gray-300 bg-white text-black py-4 px-6 rounded-lg text-base font-semibold hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Save Listing
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Chat Component */}
      <Chat
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        recipient={selectedRecipient}
      />
    </div>
  )
} 