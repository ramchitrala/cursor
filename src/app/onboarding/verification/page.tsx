'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OnboardingVerificationPage() {
  const [countdown, setCountdown] = useState(30)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleResendEmail = async () => {
    setIsResending(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCountdown(30)
    setIsResending(false)
  }

  const handleContinue = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black">
          Verify your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification link to your email address
        </p>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <div className="bg-white border border-gray-200 px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Check your inbox
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Click the verification link in your email to complete your account setup.
              </p>
            </div>

            <div className="space-y-4">
              <motion.button
                onClick={handleContinue}
                className="w-full bg-black text-white px-3 py-2 text-sm font-semibold rounded-md hover:bg-gray-900 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                I've verified my email
              </motion.button>

              <div className="text-sm text-gray-500">
                Didn't receive the email?
              </div>

              <motion.button
                onClick={handleResendEmail}
                disabled={countdown > 0 || isResending}
                className="w-full bg-gray-100 text-black px-3 py-2 text-sm font-semibold rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                {isResending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend email'}
              </motion.button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Having trouble?{' '}
                <Link href="/support" className="font-medium text-black hover:text-gray-600 transition-colors">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 