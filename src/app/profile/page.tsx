'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'

interface ProfileSection {
  id: string
  title: string
  icon: string
  content: React.ReactNode
}

export default function ProfilePage() {
  const [openSection, setOpenSection] = useState<string | null>('account')
  const [isEditing, setIsEditing] = useState(false)

  const profileSections: ProfileSection[] = [
    {
      id: 'account',
      title: 'Account',
      icon: '👤',
      content: (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-xl font-semibold">
              U
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">User Name</h3>
              <p className="text-gray-600">user@example.com</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="User Name"
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="user@example.com"
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "primary"}
              size="sm"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
            {isEditing && (
              <Button size="sm">
                Save Changes
              </Button>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: '⚙️',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Notification Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm text-black">Email notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm text-black">Push notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm text-black">SMS notifications</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Privacy Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm text-black">Show profile to other users</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm text-black">Allow direct messages</span>
              </label>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'verification',
      title: 'Verification Status',
      icon: '✅',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">Email Verified</h3>
                <p className="text-sm text-gray-600">Your email address has been verified</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">Phone Verification Pending</h3>
                <p className="text-sm text-gray-600">Verify your phone number for enhanced security</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">ID Verification</h3>
                <p className="text-sm text-gray-600">Upload a government-issued ID for verification</p>
              </div>
            </div>
          </div>
          
          <Button size="sm">
            Complete Verification
          </Button>
        </div>
      )
    },
    {
      id: 'subscriptions',
      title: 'Subscriptions',
      icon: '💎',
      content: (
        <div className="space-y-6">
          <div className="bg-black text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Premium Plan</h3>
                <p className="text-gray-300">Enhanced features and priority support</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$9.99</div>
                <div className="text-sm text-gray-300">per month</div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Unlimited messaging</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Priority listing visibility</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Advanced filters</span>
              </div>
            </div>
            
            <Button variant="secondary" className="w-full bg-white text-black hover:bg-gray-100">
              Manage Subscription
            </Button>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-black mb-2">Sixer Service</h3>
            <p className="text-sm text-gray-600 mb-3">
              One-time payment for quick host matching
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-black">$6.99</span>
              <Button size="sm">
                Purchase
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="Profile"
        showBack={true}
        showHome={true}
        showMessenger={true}
        showPlus={true}
      />
      
      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600">
              Manage your account, preferences, and subscriptions
            </p>
          </motion.div>

          {/* Profile Sections */}
          <div className="space-y-4">
            {profileSections.map((section, index) => (
              <motion.div
                key={section.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.1 * index, 
                  duration: 0.6, 
                  ease: [0.4, 0.0, 0.2, 1] 
                }}
              >
                {/* Section Header */}
                <motion.button
                  onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="text-2xl"
                      whileHover={{ rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28, duration: 0.2 }}
                    >
                      {section.icon}
                    </motion.div>
                    <h2 className="text-lg font-semibold text-black">
                      {section.title}
                    </h2>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: openSection === section.id ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28, duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </motion.button>

                {/* Section Content */}
                <AnimatePresence>
                  {openSection === section.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-200">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Account Actions */}
          <motion.div 
            className="mt-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-black mb-2">Account Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" fullWidth>
                  Download My Data
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  Change Password
                </Button>
                <Button variant="destructive" size="sm" fullWidth>
                  Delete Account
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 