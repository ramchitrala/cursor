'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import LoginModal from '@/components/login-modal'

interface Listing {
  id: string
  title: string
  description: string
  price: number
  location: string
  university: string
  image: string
  hasAr: boolean
  host: {
    name: string
    avatar: string
  }
  amenities: string[]
  distance: string
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      const mockListings: Listing[] = [
        {
          id: '1',
          title: 'Cozy Room Near Campus',
          description: 'Beautiful room with great amenities, perfect for students',
          price: 850,
          location: 'Downtown',
          university: 'University of Example',
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
          hasAr: true,
          host: {
            name: 'Sarah M.',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
          },
          amenities: ['WiFi', 'Kitchen', 'Laundry'],
          distance: '0.5 mi'
        },
        {
          id: '2',
          title: 'Modern Apartment Share',
          description: 'Spacious room in a modern apartment complex',
          price: 1200,
          location: 'University District',
          university: 'University of Example',
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
          hasAr: false,
          host: {
            name: 'Mike R.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
          },
          amenities: ['WiFi', 'Gym', 'Parking'],
          distance: '1.2 mi'
        },
        {
          id: '3',
          title: 'Student Housing Unit',
          description: 'Furnished room with utilities included',
          price: 750,
          location: 'Campus Area',
          university: 'University of Example',
          image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
          hasAr: true,
          host: {
            name: 'Emma L.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
          },
          amenities: ['WiFi', 'Kitchen', 'Furnished'],
          distance: '0.3 mi'
        },
        {
          id: '4',
          title: 'Luxury Studio Apartment',
          description: 'High-end studio with premium amenities',
          price: 1500,
          location: 'Uptown',
          university: 'University of Example',
          image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
          hasAr: false,
          host: {
            name: 'Alex K.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
          },
          amenities: ['WiFi', 'Gym', 'Pool', 'Doorman'],
          distance: '2.1 mi'
        }
      ]
      
      setListings(mockListings)
      setLoading(false)
    }

    fetchListings()
  }, [])

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing)
    setShowLoginModal(true)
  }

  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true
    if (filter === 'ar' && listing.hasAr) return true
    if (filter === 'under-1000' && listing.price < 1000) return true
    if (filter === 'under-800' && listing.price < 800) return true
    
    if (priceRange === 'all') return true
    if (priceRange === 'under-800' && listing.price < 800) return true
    if (priceRange === '800-1200' && listing.price >= 800 && listing.price <= 1200) return true
    if (priceRange === 'over-1200' && listing.price > 1200) return true
    
    return false
  })

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="All Listings"
        showBack={true}
        showHome={true}
        showMessenger={true}
        showPlus={true}
      />
      
      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">
              Available Listings
            </h1>
            <p className="text-gray-600">
              {filteredListings.length} listings found
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="mb-6 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {['all', 'ar', 'under-1000', 'under-800'].map((filterOption) => (
              <motion.button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                {filterOption === 'all' && 'All'}
                {filterOption === 'ar' && 'AR View'}
                {filterOption === 'under-1000' && 'Under $1000'}
                {filterOption === 'under-800' && 'Under $800'}
              </motion.button>
            ))}
          </motion.div>

          {/* Price Range Filter */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <label className="block text-sm font-medium text-black mb-2">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="under-800">Under $800</option>
              <option value="800-1200">$800 - $1200</option>
              <option value="over-1200">Over $1200</option>
            </select>
          </motion.div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            >
              {filteredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleListingClick(listing)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 * index, 
                    duration: 0.6, 
                    ease: [0.4, 0.0, 0.2, 1] 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* AR Preview Icon */}
                    {listing.hasAr && (
                      <motion.div 
                        className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-75 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleListingClick(listing)
                        }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-black mb-2">
                          {listing.title}
                        </h3>
                        <p className="text-gray-600 mb-2 line-clamp-2">
                          {listing.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <span>{listing.location}</span>
                          <span>•</span>
                          <span>{listing.distance} from campus</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {listing.amenities.slice(0, 3).map((amenity, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-black">
                          ${listing.price}
                        </div>
                        <div className="text-sm text-gray-500">per month</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={listing.host.avatar} 
                          alt={listing.host.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-600">
                          {listing.host.name}
                        </span>
                      </div>
                      
                      <motion.button
                        className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleListingClick(listing)
                        }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredListings.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <h3 className="text-xl font-semibold text-black mb-2">
                No listings found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or check back later for new listings.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        teaserData={selectedListing ? {
          photo: selectedListing.image,
          rent: selectedListing.price,
          distance: selectedListing.distance,
          title: selectedListing.title
        } : undefined}
        action={selectedListing ? `/listing/${selectedListing.id}` : undefined}
      />
    </div>
  )
} 