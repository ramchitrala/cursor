'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Chat from './chat'

interface Conversation {
  id: string
  recipient: {
    name: string
    avatar: string
    isOnline: boolean
    isPremium?: boolean
  }
  lastMessage: string
  timestamp: Date
  unreadCount: number
  isPremium?: boolean
}

interface MessengerProps {
  isOpen: boolean
  onClose: () => void
  hasPaidPremium?: boolean
}

export default function Messenger({ isOpen, onClose, hasPaidPremium = false }: MessengerProps) {
  const [activeTab, setActiveTab] = useState<'conversations' | 'premium'>('conversations')
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      recipient: {
        name: 'Sarah M.',
        avatar: '',
        isOnline: true
      },
      lastMessage: 'Hi! I saw your listing for the 2BR apartment. Is it still available?',
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 2
    },
    {
      id: '2',
      recipient: {
        name: 'Mike R.',
        avatar: '',
        isOnline: false
      },
      lastMessage: 'Thanks for showing me the place yesterday!',
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 0
    },
    {
      id: '3',
      recipient: {
        name: 'Emma L.',
        avatar: '',
        isOnline: true
      },
      lastMessage: 'When can I come see the apartment?',
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 1
    }
  ])

  const [premiumUsers, setPremiumUsers] = useState<Conversation[]>([
    {
      id: 'premium-1',
      recipient: {
        name: 'Alex K.',
        avatar: '',
        isOnline: true,
        isPremium: true
      },
      lastMessage: 'Looking for a room in your area!',
      timestamp: new Date(Date.now() - 600000),
      unreadCount: 0,
      isPremium: true
    },
    {
      id: 'premium-2',
      recipient: {
        name: 'Jenny W.',
        avatar: '',
        isOnline: false,
        isPremium: true
      },
      lastMessage: 'Interested in your listing',
      timestamp: new Date(Date.now() - 1200000),
      unreadCount: 0,
      isPremium: true
    },
    {
      id: 'premium-3',
      recipient: {
        name: 'Kevin T.',
        avatar: '',
        isOnline: true,
        isPremium: true
      },
      lastMessage: 'Available for September move-in',
      timestamp: new Date(Date.now() - 900000),
      unreadCount: 0,
      isPremium: true
    }
  ])

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setShowChat(true)
  }

  const handleChatClose = () => {
    setShowChat(false)
    setSelectedConversation(null)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return date.toLocaleDateString()
  }

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-black">Messages</h3>
                  <p className="text-sm text-gray-500">
                    {getTotalUnreadCount()} unread messages
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <motion.button
                onClick={() => setActiveTab('conversations')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'conversations'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Conversations
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('premium')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'premium'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Premium Users
                {!hasPaidPremium && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
                  >
                    $
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'conversations' ? (
                  <motion.div
                    key="conversations"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-1"
                  >
                    {conversations.map((conversation, index) => (
                      <motion.div
                        key={conversation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleConversationClick(conversation)}
                        className="flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {conversation.recipient.name.charAt(0)}
                            </span>
                          </div>
                          {conversation.recipient.isOnline && (
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-black truncate">
                              {conversation.recipient.name}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium"
                          >
                            {conversation.unreadCount}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="premium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-1"
                  >
                    {!hasPaidPremium && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="m-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-black">Premium Access</h4>
                            <p className="text-sm text-gray-600">View people looking in your area</p>
                          </div>
                        </div>
                        <motion.button
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Pay $4.99 to Unlock
                        </motion.button>
                      </motion.div>
                    )}
                    
                    {premiumUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => hasPaidPremium ? handleConversationClick(user) : null}
                        className={`flex items-center space-x-3 p-4 transition-colors ${
                          hasPaidPremium ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-50'
                        }`}
                        whileHover={hasPaidPremium ? { scale: 1.02 } : {}}
                        whileTap={hasPaidPremium ? { scale: 0.98 } : {}}
                      >
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.recipient.name.charAt(0)}
                            </span>
                          </div>
                          {user.recipient.isOnline && (
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-black truncate">
                              {user.recipient.name}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatTime(user.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {user.lastMessage}
                          </p>
                        </div>
                        {!hasPaidPremium && (
                          <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center">
                            <svg className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Chat Component */}
      <Chat
        isOpen={showChat}
        onClose={handleChatClose}
        recipient={selectedConversation?.recipient || { name: '', avatar: '', isOnline: false }}
      />
    </AnimatePresence>
  )
} 