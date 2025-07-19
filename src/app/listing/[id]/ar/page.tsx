'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import { Skeleton } from '@/components/ui/skeleton'

// TypeScript declaration for model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string
        alt?: string
        'camera-controls'?: boolean
        'auto-rotate'?: boolean
        'shadow-intensity'?: string
        'environment-image'?: string
      }, HTMLElement>
    }
  }
}

interface Listing {
  id: string
  title: string
  description: string
  price: number
  location: string
  university: string
  images: string[]
  modelUrl?: string
  hasAr: boolean
  host: {
    name: string
    avatar: string
  }
}

export default function ARPreviewPage() {
  const params = useParams()
  const listingId = params.id as string
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      const mockListing: Listing = {
        id: listingId,
        title: 'Cozy Room Near Campus',
        description: 'Beautiful room with great amenities, perfect for students',
        price: 850,
        location: 'Downtown',
        university: 'University of Example',
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop'
        ],
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        hasAr: true,
        host: {
          name: 'Sarah M.',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        }
      }
      
      setListing(mockListing)
      setLoading(false)
    }

    fetchListing()
  }, [listingId])

  const handleActionClick = (action: string) => {
    // Redirect to login for any action beyond explore
    window.location.href = `/login?next=${encodeURIComponent(action)}`
  }

  const nextImage = () => {
    if (listing) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)
    }
  }

  const prevImage = () => {
    if (listing) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation 
          title="AR Preview"
          showBack={true}
          showHome={true}
          showMessenger={true}
          showPlus={true}
        />
        <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="w-full h-96 rounded-lg" />
          </div>
        </main>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation 
          title="AR Preview"
          showBack={true}
          showHome={true}
          showMessenger={true}
          showPlus={true}
        />
        <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-black mb-4">Listing not found</h1>
            <p className="text-gray-600">The listing you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="AR Preview"
        showBack={true}
        showHome={true}
        showMessenger={true}
        showPlus={true}
      />
      
      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">
              {listing.title}
            </h1>
            <p className="text-gray-600">
              {listing.location} • {listing.university}
            </p>
          </motion.div>

          {/* AR/3D Viewer */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {!showFallback && listing.modelUrl ? (
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video">
                  {/* Google Model Viewer */}
                  <model-viewer
                    src={listing.modelUrl}
                    alt="3D model of the room"
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    environment-image="neutral"
                    style={{ width: '100%', height: '100%' }}
                    onError={() => setShowFallback(true)}
                  >
                    <div className="absolute top-4 right-4">
                      <motion.button
                        onClick={() => setShowFallback(true)}
                        className="bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      >
                        View Photos
                      </motion.button>
                    </div>
                  </model-viewer>
                </div>
              </div>
            ) : (
              /* 2D Gallery Fallback */
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={listing.images[currentImageIndex]} 
                    alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <motion.button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-75 text-white p-2 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  
                  <motion.button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-75 text-white p-2 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg text-sm">
                    {currentImageIndex + 1} / {listing.images.length}
                  </div>
                </div>
                
                {/* Thumbnail Navigation */}
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-black' : 'border-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Listing Details */}
          <motion.div 
            className="bg-white border border-gray-200 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-black mb-2">
                  {listing.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {listing.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{listing.location}</span>
                  <span>•</span>
                  <span>{listing.university}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-black">
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
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-sm text-gray-600">
                  {listing.host.name}
                </span>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  className="px-4 py-2 bg-gray-100 text-black rounded-lg text-sm font-medium hover:bg-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  onClick={() => handleActionClick(`/messenger?recipient=${listing.host.name}`)}
                >
                  Message Host
                </motion.button>
                
                <motion.button
                  className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  onClick={() => handleActionClick(`/listing/${listing.id}`)}
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Google Model Viewer Script */}
      <script
        type="module"
        src="https://unpkg.com/@google/model-viewer@^3.4.0/dist/model-viewer.min.js"
      />
    </div>
  )
} 