'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/navigation'

interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'scale' | 'checkbox'
  options?: string[]
  scaleLabels?: { min: string; max: string }
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'cleanliness',
    question: 'How would you describe your cleanliness level?',
    type: 'scale',
    scaleLabels: { min: 'Very messy', max: 'Very clean' }
  },
  {
    id: 'noise',
    question: 'How do you feel about noise in your living space?',
    type: 'scale',
    scaleLabels: { min: 'Need complete silence', max: 'Don\'t mind noise' }
  },
  {
    id: 'social',
    question: 'How social are you with roommates?',
    type: 'scale',
    scaleLabels: { min: 'Keep to myself', max: 'Very social' }
  },
  {
    id: 'study',
    question: 'What\'s your study environment preference?',
    type: 'multiple-choice',
    options: ['Complete silence', 'Some background noise', 'Music is fine', 'Don\'t mind any noise']
  },
  {
    id: 'sleep',
    question: 'What\'s your typical sleep schedule?',
    type: 'multiple-choice',
    options: ['Early bird (before 10 PM)', 'Normal (10 PM - 12 AM)', 'Night owl (after 12 AM)', 'Irregular schedule']
  },
  {
    id: 'guests',
    question: 'How do you feel about guests?',
    type: 'multiple-choice',
    options: ['No guests allowed', 'Occasional guests', 'Frequent guests welcome', 'Don\'t mind either way']
  },
  {
    id: 'pets',
    question: 'Do you have or want pets?',
    type: 'multiple-choice',
    options: ['No pets', 'I have pets', 'I want pets', 'Don\'t mind pets']
  },
  {
    id: 'lifestyle',
    question: 'What describes your lifestyle best?',
    type: 'checkbox',
    options: ['Student', 'Working professional', 'Artist/Creative', 'Athlete/Fitness focused', 'Party person', 'Quiet/Introverted', 'Extroverted/Social']
  },
  {
    id: 'habits',
    question: 'Which habits do you have?',
    type: 'checkbox',
    options: ['Smoking', 'Drinking', 'Cooking frequently', 'Gaming', 'Working out', 'Playing music', 'Studying late', 'Early riser']
  },
  {
    id: 'communication',
    question: 'How do you prefer to communicate with roommates?',
    type: 'multiple-choice',
    options: ['Face-to-face only', 'Text messages', 'Group chat', 'Don\'t mind any method']
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call to save quiz results
    await new Promise(resolve => setTimeout(resolve, 2000))
    setShowResults(true)
    setIsLoading(false)
  }

  const currentQ = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResults) {
    return (
      <motion.div 
        className="min-h-screen bg-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-white rounded-xl border border-gray-200 p-8 max-w-sm w-full mx-4 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div 
            className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Quiz Complete!
          </h1>
          <p className="text-gray-600 mb-6">
            We've analyzed your preferences and will use this to find the perfect roommate matches.
          </p>
          
          <motion.div className="space-y-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="block w-full bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-black/90 transition-colors"
            >
              Find Roommates
            </button>
            <button
              onClick={() => window.location.href = '/profile'}
              className="block w-full border border-gray-200 bg-white text-gray-900 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              View Profile
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navigation */}
      <Navigation 
        title="Compatibility Quiz"
        showBack={true}
      />

      <div className="px-4 py-6">
        <motion.div className="max-w-lg mx-auto" variants={itemVariants}>
          {/* Progress Bar */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                className="bg-black h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </motion.div>

          {/* Question */}
          <motion.div 
            className="bg-white rounded-xl border border-gray-200 p-6"
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {currentQ.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-4">
              {currentQ.type === 'scale' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{currentQ.scaleLabels?.min}</span>
                    <span>{currentQ.scaleLabels?.max}</span>
                  </div>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map(value => (
                      <motion.button
                        key={value}
                        onClick={() => handleAnswer(currentQ.id, value)}
                        className={`w-12 h-12 rounded-full border-2 ${
                          answers[currentQ.id] === value
                            ? 'bg-black text-white border-black'
                            : 'border-gray-200 text-gray-700 hover:border-black'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {currentQ.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {currentQ.options?.map(option => (
                    <motion.button
                      key={option}
                      onClick={() => handleAnswer(currentQ.id, option)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-colors ${
                        answers[currentQ.id] === option
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-900 hover:border-black'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

              {currentQ.type === 'checkbox' && (
                <div className="space-y-3">
                  {currentQ.options?.map(option => (
                    <motion.label
                      key={option}
                      className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-black cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        checked={answers[currentQ.id]?.includes(option) || false}
                        onChange={(e) => {
                          const currentAnswers = answers[currentQ.id] || []
                          if (e.target.checked) {
                            handleAnswer(currentQ.id, [...currentAnswers, option])
                          } else {
                            handleAnswer(currentQ.id, currentAnswers.filter((a: string) => a !== option))
                          }
                        }}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-gray-900">{option}</span>
                    </motion.label>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 border border-gray-200 rounded-xl text-gray-900 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Previous
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                disabled={!answers[currentQ.id] || isLoading}
                className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-black/90 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentQuestion === quizQuestions.length - 1 
                  ? (isLoading ? 'Submitting...' : 'Submit') 
                  : 'Next'
                }
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
} 