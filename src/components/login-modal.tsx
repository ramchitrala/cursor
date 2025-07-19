'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  teaserData?: {
    photo: string
    rent: number
    distance: string
    title: string
  }
  action?: string
}

export default function LoginModal({ isOpen, onClose, teaserData, action }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to login with next parameter
    window.location.href = `/login?next=${encodeURIComponent(action || '/')}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black">
                  Sign in to continue
                </h2>
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              <p className="text-gray-600 mt-2">
                Create an account or sign in to access full details
              </p>
            </div>

            {/* Teaser Card */}
            {teaserData && (
              <motion.div 
                className="p-6 bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <img 
                      src={teaserData.photo} 
                      alt={teaserData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black bg-opacity-80 text-white text-sm px-3 py-1 rounded-lg">
                      ${teaserData.rent}/mo
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-black text-base mb-2">
                      {teaserData.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{teaserData.distance} from campus</span>
                      <span className="text-black font-medium">
                        Unlock full details →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-black mb-2">
                    Join RoomSpot
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Connect with roommates, browse listings, and find your perfect home
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleLogin}
                    loading={isLoading}
                    fullWidth
                    size="lg"
                    className="bg-black text-white hover:bg-gray-900"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in / Create Account'}
                  </Button>
                  
                  <Button
                    onClick={onClose}
                    variant="outline"
                    fullWidth
                    size="lg"
                  >
                    Continue browsing
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500">
                  By continuing, you agree to our{' '}
                  <a href="/terms" className="text-black hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-black hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 