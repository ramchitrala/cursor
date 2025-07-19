'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/navigation'
import Link from 'next/link'

interface SupportCategory {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const supportCategories: SupportCategory[] = [
    {
      id: 'verification',
      title: 'Email Verification',
      description: 'Help with email verification and account setup',
      icon: '📧',
      href: '/support/verification'
    },
    {
      id: 'account',
      title: 'Account Issues',
      description: 'Problems with login, password, or account settings',
      icon: '🔐',
      href: '/support/account'
    },
    {
      id: 'listings',
      title: 'Listings & Bookings',
      description: 'Help with creating listings or booking rooms',
      icon: '🏠',
      href: '/support/listings'
    },
    {
      id: 'roommates',
      title: 'Roommate Matching',
      description: 'Issues with finding or connecting with roommates',
      icon: '👥',
      href: '/support/roommates'
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      description: 'Questions about payments, refunds, or billing',
      icon: '💳',
      href: '/support/payments'
    },
    {
      id: 'technical',
      title: 'Technical Support',
      description: 'App issues, bugs, or technical problems',
      icon: '🔧',
      href: '/support/technical'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="Support"
        showBack={true}
        showHome={true}
        showMessenger={true}
        showPlus={false}
      />
      
      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">
              How can we help you?
            </h1>
            <p className="text-gray-600">
              Choose a category below or contact our support team directly
            </p>
          </motion.div>

          {/* Support Categories */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
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
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Support */}
          <motion.div 
            className="bg-gray-50 rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h2 className="text-xl font-semibold text-black mb-4">
              Still need help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-black mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <motion.a
                  href="mailto:support@roomspot.com"
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@roomspot.com
                </motion.a>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-black mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our support team during business hours (9 AM - 6 PM EST).
                </p>
                <motion.button
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Start Chat
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            className="bg-white border border-gray-200 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h2 className="text-xl font-semibold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-medium text-black mb-2">
                  How do I verify my email address?
                </h3>
                <p className="text-gray-600">
                  After signing up, check your email for a verification link. Click the link to verify your account. If you don't see the email, check your spam folder.
                </p>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-medium text-black mb-2">
                  Can I use a non-.edu email address?
                </h3>
                <p className="text-gray-600">
                  Currently, we only accept .edu email addresses to ensure all users are verified students. This helps maintain a safe and trustworthy community.
                </p>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-medium text-black mb-2">
                  How do I create a listing?
                </h3>
                <p className="text-gray-600">
                  After logging in, click the "+" button in the navigation and select "Create Listing". You'll need to provide details about your room and upload photos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-black mb-2">
                  How do I find roommates?
                </h3>
                <p className="text-gray-600">
                  Visit the "Find Roommates" section to browse profiles of other students. You can filter by compatibility, budget, and other preferences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 