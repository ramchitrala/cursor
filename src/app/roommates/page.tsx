'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import LoginModal from '@/components/login-modal'

interface Roommate {
  id: string
  name: string
  age: number
  university: string
  major: string
  year: string
  avatar: string
  bio: string
  interests: string[]
  budget: number
  moveInDate: string
  compatibility: number
  isOnline: boolean
}

export default function RoommatesPage() {
  const [roommates, setRoommates] = useState<Roommate[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedRoommate, setSelectedRoommate] = useState<Roommate | null>(null)

  useEffect(() => {
    const fetchRoommates = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      const mockRoommates: Roommate[] = [
        {
          id: '1',
          name: 'Sarah Chen',
          age: 20,
          university: 'University of Example',
          major: 'Computer Science',
          year: 'Junior',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          bio: 'Looking for a quiet, studious roommate. I love coding and hiking on weekends.',
          interests: ['Programming', 'Hiking', 'Coffee', 'Reading'],
          budget: 800,
          moveInDate: 'August 2024',
          compatibility: 95,
          isOnline: true
        },
        {
          id: '2',
          name: 'Mike Rodriguez',
          age: 22,
          university: 'University of Example',
          major: 'Business Administration',
          year: 'Senior',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          bio: 'Easy-going guy who loves sports and cooking. Looking for someone who respects shared spaces.',
          interests: ['Basketball', 'Cooking', 'Netflix', 'Gym'],
          budget: 1000,
          moveInDate: 'September 2024',
          compatibility: 87,
          isOnline: false
        },
        {
          id: '3',
          name: 'Emma Thompson',
          age: 19,
          university: 'University of Example',
          major: 'Psychology',
          year: 'Sophomore',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          bio: 'Psychology major who loves art and music. Prefer a roommate who is clean and respectful.',
          interests: ['Art', 'Music', 'Psychology', 'Yoga'],
          budget: 750,
          moveInDate: 'August 2024',
          compatibility: 92,
          isOnline: true
        },
        {
          id: '4',
          name: 'Alex Johnson',
          age: 21,
          university: 'University of Example',
          major: 'Engineering',
          year: 'Junior',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          bio: 'Engineering student who enjoys gaming and tech. Looking for someone who is quiet during study hours.',
          interests: ['Gaming', 'Technology', 'Anime', 'Coffee'],
          budget: 900,
          moveInDate: 'August 2024',
          compatibility: 78,
          isOnline: true
        }
      ]
      
      setRoommates(mockRoommates)
      setLoading(false)
    }

    fetchRoommates()
  }, [])

  const handleRoommateClick = (roommate: Roommate) => {
    setSelectedRoommate(roommate)
    setShowLoginModal(true)
  }

  const filteredRoommates = roommates.filter(roommate => {
    if (filter === 'all') return true
    if (filter === 'online' && roommate.isOnline) return true
    if (filter === 'high-compatibility' && roommate.compatibility >= 90) return true
    if (filter === 'under-800' && roommate.budget <= 800) return true
    return false
  })

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="Find Roommates"
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
              Find Your Perfect Roommate
            </h1>
            <p className="text-gray-600">
              Connect with verified students who share your lifestyle and preferences
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="mb-6 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {['all', 'online', 'high-compatibility', 'under-800'].map((filterOption) => (
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
                {filterOption === 'online' && 'Online Now'}
                {filterOption === 'high-compatibility' && 'High Compatibility'}
                {filterOption === 'under-800' && 'Under $800'}
              </motion.button>
            ))}
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
              {filteredRoommates.map((roommate, index) => (
                <motion.div
                  key={roommate.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleRoommateClick(roommate)}
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
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative">
                        <img 
                          src={roommate.avatar} 
                          alt={roommate.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        {roommate.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-black">
                            {roommate.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-500">{roommate.compatibility}%</span>
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${roommate.compatibility}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {roommate.major} • {roommate.year} • {roommate.age} years old
                        </p>
                        
                        <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                          {roommate.bio}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {roommate.interests.slice(0, 3).map((interest, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                              {interest}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Budget: ${roommate.budget}/mo</span>
                          <span>{roommate.moveInDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <motion.button
                        className="px-4 py-2 bg-gray-100 text-black rounded-lg text-sm font-medium hover:bg-gray-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle view profile
                        }}
                      >
                        View Profile
                      </motion.button>
                      
                      <motion.button
                        className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRoommateClick(roommate)
                        }}
                      >
                        Message
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredRoommates.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <h3 className="text-xl font-semibold text-black mb-2">
                No roommates found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or check back later for new matches.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        teaserData={selectedRoommate ? {
          photo: selectedRoommate.avatar,
          rent: selectedRoommate.budget,
          distance: '0.5 mi',
          title: `Connect with ${selectedRoommate.name}`
        } : undefined}
        action={selectedRoommate ? `/messenger?user=${selectedRoommate.id}` : undefined}
      />
    </div>
  )
} 