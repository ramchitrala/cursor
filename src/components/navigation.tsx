'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  title?: string
  showBack?: boolean
  showHome?: boolean
  showMessenger?: boolean
  showPlus?: boolean
  onBack?: () => void
}

export default function Navigation({ 
  title = "RoomSpot", 
  showBack = false, 
  showHome = true,
  showMessenger = true,
  showPlus = true,
  onBack 
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.back()
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <motion.nav 
      className="bg-white border-b border-gray-200 px-4 py-3"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.2, 
        ease: [0.4, 0.0, 0.2, 1] // Fluent-style ease-out
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {showBack && (
            <motion.button
              onClick={handleBack}
              className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17,
                duration: 0.2
              }}
              aria-label="Go back to previous page"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}

          {showHome && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                duration: 0.2
              }}
            >
              <Link 
                href="/"
                className={`text-lg font-bold transition-colors ${
                  isActive('/') ? 'text-black' : 'text-gray-600 hover:text-black'
                }`}
                aria-label="Go to home page"
              >
                {title}
              </Link>
            </motion.div>
          )}
        </div>

        {/* Center Section - Page Title */}
        {title !== "RoomSpot" && (
          <motion.h1 
            className="text-lg font-semibold text-black"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.1,
              duration: 0.2,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            {title}
          </motion.h1>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Messenger Icon - Fixed SVG */}
          {showMessenger && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17,
                duration: 0.2
              }}
            >
              <Link
                href="/messenger"
                className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white ${
                  isActive('/messenger') 
                    ? 'bg-black text-white' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-100'
                }`}
                aria-label="Open messenger"
                aria-describedby="messenger-description"
              >
                {/* Fixed messenger icon - complete SVG path */}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span id="messenger-description" className="sr-only">Access your conversations and messages</span>
              </Link>
            </motion.div>
          )}

          {/* Plus Icon for New Features */}
          {showPlus && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17,
                duration: 0.2
              }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
                aria-label="Open new features menu"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* User Menu */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              duration: 0.2
            }}
          >
            <Link href="/profile">
              <button
                className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-white font-semibold text-sm hover:from-gray-500 hover:to-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
                aria-label="User profile menu"
              >
                <span>U</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dropdown Menu for Plus Icon */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.2
            }}
            className="absolute right-4 top-16 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[200px]"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-black">New Features</h3>
            </div>
            
            <div className="py-1">
              <Link href="/listing/create">
                <motion.button
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-black"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create Listing</span>
                  </div>
                </motion.button>
              </Link>

              <Link href="/roommates">
                <motion.button
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-black"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Find Roommates</span>
                  </div>
                </motion.button>
              </Link>

              <Link href="/sixer">
                <motion.button
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:text-black"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Premium Features</span>
                  </div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for dropdown */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </motion.nav>
  )
} 