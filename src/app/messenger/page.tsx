'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/navigation'
import Chat from '@/components/chat'
import { SkeletonList } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

interface Conversation {
  id: string
  recipient: {
    name: string
    avatar: string
    isOnline: boolean
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
  isPremium: boolean
  hasSixer: boolean
}

export default function MessengerPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [loading, setLoading] = useState(true)
  const [premiumExpiry, setPremiumExpiry] = useState<Date | null>(null)

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data with Sixer badges
      const mockConversations: Conversation[] = [
        {
          id: '1',
          recipient: {
            name: 'Sarah M.',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            isOnline: true
          },
          lastMessage: 'Thanks for the quick response!',
          timestamp: '2 min ago',
          unreadCount: 1,
          isPremium: true,
          hasSixer: true // Sixer in progress
        },
        {
          id: '2',
          recipient: {
            name: 'Mike R.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            isOnline: false
          },
          lastMessage: 'The room is still available',
          timestamp: '1 hour ago',
          unreadCount: 0,
          isPremium: false,
          hasSixer: false
        },
        {
          id: '3',
          recipient: {
            name: 'Emma L.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            isOnline: true
          },
          lastMessage: 'When can you visit?',
          timestamp: '3 hours ago',
          unreadCount: 2,
          isPremium: false,
          hasSixer: true // Sixer in progress
        }
      ]
      
      setConversations(mockConversations)
      setLoading(false)
    }

    fetchConversations()
  }, [])

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setShowChat(true)
  }

  const handleChatClose = () => {
    setShowChat(false)
    setSelectedConversation(null)
  }

  const handleActionClick = (action: string) => {
    // Redirect to login for any action beyond explore
    window.location.href = `/login?next=${encodeURIComponent(action)}`
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        title="Messages"
        showBack={false}
        showHome={true}
        showMessenger={true}
        showPlus={true}
      />
      
      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {!showChat ? (
            /* Show Conversation List */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">
                  Messages
                </h1>
                <p className="text-gray-600">
                  Connect with hosts and potential roommates
                </p>
              </div>

              {loading ? (
                <SkeletonList items={3} />
              ) : (
                <div className="space-y-4">
                  {conversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleConversationClick(conversation)}
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
                        <div className="relative">
                          <img 
                            src={conversation.recipient.avatar} 
                            alt={conversation.recipient.name}
                            className="w-12 h-12 rounded-full"
                          />
                          {conversation.recipient.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black rounded-full border-2 border-white" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-semibold text-black truncate">
                              {conversation.recipient.name}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {conversation.timestamp}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 truncate mb-2">
                            {conversation.lastMessage}
                          </p>
                          
                          <div className="flex items-center space-x-2">
                            {conversation.isPremium && (
                              <motion.div 
                                className="bg-black text-white px-2 py-1 rounded-full text-xs font-medium"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                              >
                                Premium
                              </motion.div>
                            )}
                            
                            {conversation.hasSixer && (
                              <motion.div 
                                className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs font-medium"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                              >
                                Sixer in progress
                              </motion.div>
                            )}
                            
                            {conversation.unreadCount > 0 && (
                              <div className="bg-black text-white px-2 py-1 rounded-full text-xs font-medium">
                                {conversation.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && conversations.length === 0 && (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                >
                  <h3 className="text-xl font-semibold text-black mb-2">
                    No conversations yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start browsing listings to connect with hosts
                  </p>
                  <Button 
                    onClick={() => handleActionClick('/')}
                    variant="primary"
                  >
                    Browse Listings
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Show Chat Component */
            <Chat
              isOpen={showChat}
              onClose={handleChatClose}
              recipient={selectedConversation?.recipient || { name: '', avatar: '', isOnline: false }}
              isPremium={selectedConversation?.isPremium}
              premiumExpiry={premiumExpiry}
              hideNavigation={true}
            />
          )}
        </div>
      </main>
    </div>
  )
} 