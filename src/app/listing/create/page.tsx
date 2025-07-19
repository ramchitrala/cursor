'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/navigation'

interface ListingData {
  title: string
  rent: string
  utilities: string
  distanceToCampus: string
  isFurnished: boolean
  allowsPets: boolean
  vibeTags: string[]
  languages: string[]
  description: string
  images: string[]
}

const vibeTags = [
  'Quiet', 'Social', 'Study-friendly', 'Party-friendly', 'Clean', 'Relaxed',
  'Active', 'Creative', 'Professional', 'Outdoorsy'
]

const languages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean',
  'Arabic', 'Russian', 'Portuguese'
]

export default function CreateListingPage() {
  const router = useRouter()
  const [whatsappMessage, setWhatsappMessage] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState('')
  const [showManualForm, setShowManualForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [listingData, setListingData] = useState<ListingData>({
    title: '',
    rent: '',
    utilities: '',
    distanceToCampus: '',
    isFurnished: false,
    allowsPets: false,
    vibeTags: [],
    languages: [],
    description: '',
    images: []
  })

  const handleAnalyze = async () => {
    if (!whatsappMessage.trim()) {
      setAnalysisError('Please enter a WhatsApp message to analyze')
      return
    }

    setIsAnalyzing(true)
    setAnalysisError('')

    try {
      const response = await fetch('/api/ai/parse-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: whatsappMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze message')
      }

      const data = await response.json()
      
      if (data.success) {
        setListingData(prev => ({
          ...prev,
          ...data.listing
        }))
        setShowManualForm(true)
      } else {
        setAnalysisError(data.error || 'Failed to analyze message')
      }
    } catch (error) {
      setAnalysisError('Failed to analyze message. Please try again or use manual form.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleManualForm = () => {
    setShowManualForm(true)
    setAnalysisError('')
  }

  const handleInputChange = (field: keyof ListingData, value: any) => {
    setListingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleVibeTag = (tag: string) => {
    setListingData(prev => ({
      ...prev,
      vibeTags: prev.vibeTags.includes(tag)
        ? prev.vibeTags.filter(t => t !== tag)
        : [...prev.vibeTags, tag]
    }))
  }

  const toggleLanguage = (language: string) => {
    setListingData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call to create listing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store in localStorage for demo purposes
      const existingListings = JSON.parse(localStorage.getItem('listings') || '[]')
      const newListing = {
        id: Date.now().toString(),
        ...listingData,
        createdAt: new Date().toISOString(),
        host: {
          name: 'You',
          isVerified: true,
          university: 'Your University'
        },
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop']
      }
      
      localStorage.setItem('listings', JSON.stringify([newListing, ...existingListings]))
      
      setShowSuccess(true)
      
      // Show success animation and redirect
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
      
    } catch (error) {
      console.error('Error creating listing:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="Create Listing" 
        showBack={true}
      />

      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-black mb-2">
              Create Your Listing
            </h1>
            <p className="text-gray-600 mb-8">
              Use AI to parse WhatsApp messages or fill out the form manually
            </p>
          </motion.div>

          {!showManualForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* AI Analysis Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-black">AI-Powered Analysis</h2>
                    <p className="text-sm text-gray-600">Paste a WhatsApp message and let AI extract listing details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      WhatsApp Message
                    </label>
                    <textarea
                      value={whatsappMessage}
                      onChange={(e) => setWhatsappMessage(e.target.value)}
                      placeholder="Paste your WhatsApp message here..."
                      className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black resize-none"
                      rows={6}
                    />
                  </div>

                  {analysisError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4"
                    >
                      <p className="text-sm text-red-600">{analysisError}</p>
                    </motion.div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="flex-1 inline-flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg text-base font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>Analyzing...</span>
                        </div>
                      ) : (
                        'Analyze with AI'
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={handleManualForm}
                      className="flex-1 inline-flex items-center justify-center border border-gray-300 bg-white text-black py-3 px-6 rounded-lg text-base font-semibold hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Fill Manually
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* AI Analysis Animation */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-xl border border-gray-200 p-8 text-center"
                  >
                    <div className="flex flex-col items-center space-y-6">
                      {/* Gemini Logo Animation */}
                      <motion.div
                        className="relative"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-orange-500 flex items-center justify-center">
                          <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        </div>
                      </motion.div>

                      <div className="space-y-2">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-lg font-semibold text-black"
                        >
                          Analyzing with Gemini
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          className="text-sm text-gray-600 flex items-center justify-center space-x-2"
                        >
                          <span>Powered by</span>
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="text-gray-500">Google</span>
                        </motion.p>
                      </div>

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Form Header */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-black mb-2">Review & Edit Listing</h2>
                <p className="text-gray-600">Review the extracted information and make any necessary changes</p>
              </div>

              {/* Listing Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Listing Title
                    </label>
                    <input
                      type="text"
                      value={listingData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="e.g., Cozy 2BR near Campus"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Monthly Rent ($)
                    </label>
                    <input
                      type="number"
                      value={listingData.rent}
                      onChange={(e) => handleInputChange('rent', e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="1200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Utilities ($)
                    </label>
                    <input
                      type="number"
                      value={listingData.utilities}
                      onChange={(e) => handleInputChange('utilities', e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="150"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Distance to Campus (miles)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={listingData.distanceToCampus}
                      onChange={(e) => handleInputChange('distanceToCampus', e.target.value)}
                      className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="0.8"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Vibe Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {vibeTags.map(tag => (
                      <motion.button
                        key={tag}
                        type="button"
                        onClick={() => toggleVibeTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          listingData.vibeTags.includes(tag)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map(language => (
                      <motion.button
                        key={language}
                        type="button"
                        onClick={() => toggleLanguage(language)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          listingData.languages.includes(language)
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {language}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Description
                  </label>
                  <textarea
                    value={listingData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black resize-none"
                    placeholder="Describe your listing..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-black mb-2">
                    Additional Options
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={listingData.isFurnished}
                        onChange={(e) => handleInputChange('isFurnished', e.target.checked)}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm text-black">Furnished</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={listingData.allowsPets}
                        onChange={(e) => handleInputChange('allowsPets', e.target.checked)}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm text-black">Allows pets</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center bg-black text-white py-3 px-6 rounded-lg text-base font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Publish Listing'
                    )}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={() => setShowManualForm(false)}
                    className="flex-1 inline-flex items-center justify-center border border-gray-300 bg-white text-black py-3 px-6 rounded-lg text-base font-semibold hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back to AI Analysis
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Success Animation */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
                  >
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-semibold text-black mb-2"
                  >
                    Listing Published!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 mb-6"
                  >
                    Your listing is now live and students can start contacting you.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center space-x-2 text-sm text-gray-500"
                  >
                    <div className="animate-pulse">Redirecting to dashboard...</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
} 