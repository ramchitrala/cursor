'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'

export default function SixerPage() {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'intro' | 'checkout' | 'success'>('intro')

  const handleActionClick = (action: string) => {
    // Redirect to login for any action beyond explore
    window.location.href = `/login?next=${encodeURIComponent(action)}`
  }

  const handleStartSixer = async () => {
    setLoading(true)
    
    try {
      // Simulate Stripe checkout
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Call Sixer API
      const response = await fetch('/api/sixer/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 699, // $6.99 in cents
          currency: 'usd',
        }),
      })

      if (response.ok) {
        setStep('success')
      } else {
        throw new Error('Payment failed')
      }
    } catch (error) {
      console.error('Sixer payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="Sixer"
        showBack={true}
        showHome={true}
        showMessenger={true}
        showPlus={true}
      />
      
      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {step === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            >
              {/* Hero Section */}
              <div className="text-center mb-12">
                <motion.div 
                  className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                  Need a decision fast?
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  Sixer connects you directly with hosts for quick responses. 
                  Get matched within 24 hours or your money back.
                </p>
              </div>

              {/* Features */}
              <motion.div 
                className="space-y-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Priority Matching</h3>
                    <p className="text-gray-600">Get matched with verified hosts within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <motion.div 
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Direct Communication</h3>
                    <p className="text-gray-600">Chat directly with hosts without waiting</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <motion.div 
                    className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Money Back Guarantee</h3>
                    <p className="text-gray-600">If no match within 24 hours, get your money back</p>
                  </div>
                </div>
              </motion.div>

              {/* Pricing */}
              <motion.div 
                className="bg-gray-50 rounded-lg p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">
                    $6.99
                  </div>
                  <p className="text-gray-600">One-time payment</p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <Button
                  onClick={handleStartSixer}
                  loading={loading}
                  fullWidth
                  size="lg"
                  className="mb-4"
                >
                  {loading ? 'Processing...' : 'Start Sixer'}
                </Button>
                
                <p className="text-sm text-gray-500">
                  By continuing, you agree to our terms and privacy policy
                </p>
              </motion.div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-center"
            >
              <motion.div 
                className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 28 }}
              >
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              
              <h1 className="text-3xl font-bold text-black mb-4">
                Sixer Started!
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                We're matching you with verified hosts. You'll receive notifications 
                when hosts respond to your request.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={() => handleActionClick('/messenger')}
                  fullWidth
                  size="lg"
                >
                  View Conversations
                </Button>
                
                <Button
                  onClick={() => handleActionClick('/')}
                  variant="outline"
                  fullWidth
                >
                  Continue Browsing
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
} 