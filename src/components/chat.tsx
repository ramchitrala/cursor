'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navigation from './navigation'

interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: Date
  status: 'sending' | 'sent' | 'delivered' | 'read'
}

interface ChatProps {
  isOpen: boolean
  onClose: () => void
  recipient: {
    name: string
    avatar: string
    isOnline: boolean
  }
  isPremium?: boolean
  premiumExpiry?: Date | null
  hideNavigation?: boolean
}

export default function Chat({ isOpen, onClose, recipient, isPremium = false, premiumExpiry, hideNavigation = false }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I saw your listing for the 2BR apartment. Is it still available?',
      sender: 'other',
      timestamp: new Date(Date.now() - 300000),
      status: 'read'
    },
    {
      id: '2',
      text: 'Yes, it is! When are you looking to move in?',
      sender: 'user',
      timestamp: new Date(Date.now() - 240000),
      status: 'read'
    },
    {
      id: '3',
      text: 'I\'m looking for September 1st. What\'s the rent again?',
      sender: 'other',
      timestamp: new Date(Date.now() - 180000),
      status: 'read'
    },
    {
      id: '4',
      text: 'It\'s $1200/month plus $150 for utilities. The place is fully furnished!',
      sender: 'user',
      timestamp: new Date(Date.now() - 120000),
      status: 'read'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Micro-animations
  const inputScale = useMotionValue(1)
  const inputScaleTransform = useTransform(inputScale, [0.95, 1], [0.95, 1])
  const inputSpring = useSpring(inputScaleTransform, { stiffness: 300, damping: 20 })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simulate message sending with micro-animations
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      )
      setIsSending(false)
    }, 800)

    // Simulate typing indicator with enhanced animations
    setTimeout(() => {
      setIsTyping(true)
    }, 1200)

    // Use Gemini AI for intelligent responses
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          context: {
            recipient: recipient.name,
            isPremium: isPremium
          }
        })
      })

      const data = await response.json()
      
      setTimeout(() => {
        setIsTyping(false)
        
        if (data.success) {
          // AI response
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.response,
            sender: 'other',
            timestamp: new Date(),
            status: 'sent'
          }
          
          setMessages(prev => [...prev, aiMessage])
        } else {
          // Fallback response
          const fallbackMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: getRandomResponse(),
            sender: 'other',
            timestamp: new Date(),
            status: 'sent'
          }
          
          setMessages(prev => [...prev, fallbackMessage])
        }
      }, 2000 + Math.random() * 1000)
      
    } catch (error) {
      console.error('AI Chat Error:', error)
      
      setTimeout(() => {
        setIsTyping(false)
        
        // Fallback response
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getRandomResponse(),
          sender: 'other',
          timestamp: new Date(),
          status: 'sent'
        }
        
        setMessages(prev => [...prev, fallbackMessage])
      }, 2000)
    }
  }

  const getRandomResponse = () => {
    const responses = [
      'That sounds perfect! Can we schedule a viewing this weekend?',
      'I\'m definitely interested. What\'s your availability for a tour?',
      'Perfect! Do you have any photos of the kitchen and bathroom?',
      'That works for me. What\'s the application process like?',
      'Sounds great! Are utilities included in the rent?',
      'I\'d love to see it. When are you free to show the place?'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getDaysUntilExpiry = () => {
    if (!premiumExpiry) return null
    const now = new Date()
    const diff = premiumExpiry.getTime() - now.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const handleBack = () => {
    onClose()
    router.back()
  }

  if (!isOpen) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      {!hideNavigation && (
        <Navigation 
          title={recipient.name}
          showBack={true}
          showHome={false}
          showMessenger={false}
          showPlus={false}
          onBack={handleBack}
        />
      )}

      {/* Premium Banner */}
      {isPremium && premiumExpiry && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="px-4 py-3 bg-gray-50 border-b border-gray-200"
          role="status"
          aria-live="polite"
        >
          <motion.div 
            className="flex items-center justify-between text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <motion.svg 
                className="h-4 w-4 text-black" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </motion.svg>
              <span className="text-black font-medium">Premium Feature</span>
            </div>
            <motion.span 
              className="text-gray-600"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getDaysUntilExpiry()} days remaining
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="mx-auto w-full max-w-screen-xl px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-4">
                {hideNavigation && (
                  <motion.button
                    onClick={handleBack}
                    className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    aria-label="Go back to previous page"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                )}
                
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src={`https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=100&h=100&fit=crop&crop=face`}
                      alt={`${recipient.name}'s profile picture`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${recipient.name}&background=000000&color=ffffff&size=100`
                      }}
                    />
                  </div>
                  {recipient.isOnline && (
                    <motion.div 
                      className="absolute -bottom-1 -right-1 h-4 w-4 bg-black rounded-full border-2 border-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                      aria-label="Online status indicator"
                    />
                  )}
                  {isPremium && (
                    <motion.div 
                      className="absolute -top-1 -right-1 h-5 w-5 bg-black rounded-full flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 500 }}
                      aria-label="Premium user badge"
                    >
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>
                
                <div>
                  <h3 className="font-semibold text-black text-lg">{recipient.name}</h3>
                  <p className="text-sm text-gray-500">
                    {recipient.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <motion.button
                className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="More options"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  role="article"
                  aria-label={`Message from ${message.sender === 'user' ? 'you' : recipient.name}`}
                >
                  <motion.div 
                    className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-black text-white'
                          : 'bg-white text-black border border-gray-200 shadow-sm'
                      }`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 500
                      }}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </motion.div>
                    <motion.div 
                      className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && (
                        <motion.div 
                          className="flex items-center space-x-1"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                          aria-label={`Message status: ${message.status}`}
                        >
                          {message.status === 'sending' && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-3 w-3 border border-gray-400 border-t-transparent rounded-full"
                              aria-hidden="true"
                            />
                          )}
                          {message.status === 'sent' && (
                            <motion.svg 
                              className="h-3 w-3" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                              aria-hidden="true"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                          {message.status === 'delivered' && (
                            <motion.svg 
                              className="h-3 w-3" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                              aria-hidden="true"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                          {message.status === 'read' && (
                            <motion.svg 
                              className="h-3 w-3 text-black" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                              aria-hidden="true"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Enhanced Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex justify-start"
                    role="status"
                    aria-live="polite"
                    aria-label="Recipient is typing"
                  >
                    <motion.div 
                      className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                          className="h-2 w-2 bg-black rounded-full"
                          aria-hidden="true"
                        />
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          className="h-2 w-2 bg-black rounded-full"
                          aria-hidden="true"
                        />
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          className="h-2 w-2 bg-black rounded-full"
                          aria-hidden="true"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="flex-1 relative"
                  style={{ scale: inputSpring }}
                >
                  <motion.input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value)
                      inputScale.set(1)
                    }}
                    onKeyPress={handleKeyPress}
                    onFocus={() => inputScale.set(1.02)}
                    onBlur={() => inputScale.set(1)}
                    placeholder="Type a message..."
                    className="block w-full appearance-none rounded-full border border-gray-200 bg-gray-50 px-4 py-4 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 pr-16 text-base"
                    aria-label="Message input"
                    aria-describedby="send-button"
                  />
                  <motion.button
                    id="send-button"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isSending}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black p-3 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    animate={isSending ? { rotate: [0, 360] } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17,
                      duration: isSending ? 1 : 0.3
                    }}
                    aria-label={isSending ? "Sending message..." : "Send message"}
                  >
                    {isSending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border border-white border-t-transparent rounded-full"
                        aria-hidden="true"
                      />
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 