export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isVerified: boolean
  isHost: boolean
  university?: string
  graduationYear?: number
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface Listing {
  id: string
  hostId: string
  title: string
  description: string
  rent: number
  utilities: number
  moveInDate: Date
  leaseLength: number
  isFurnished: boolean
  allowsPets: boolean
  vibeTags: string[]
  languages: string[]
  latitude: number
  longitude: number
  address: string
  distanceToCampus: number
  images: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  host: User
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  isRead: boolean
  createdAt: Date
  sender: User
}

export interface Chat {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

export interface FilterOptions {
  minRent?: number
  maxRent?: number
  maxDistance?: number
  leaseLength?: number
  vibeTags?: string[]
  languages?: string[]
  allowsPets?: boolean
  isFurnished?: boolean
  moveInDate?: Date
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isRequired: boolean
}

export interface VerificationData {
  id: string
  userId: string
  type: 'email' | 'id' | 'liveness'
  status: 'pending' | 'approved' | 'rejected'
  data?: any
  createdAt: Date
  updatedAt: Date
}

export interface RoommateCompatibility {
  id: string
  userId: string
  cleanliness: number
  noiseLevel: number
  socialLevel: number
  studyHabits: number
  sleepSchedule: number
  createdAt: Date
}

export interface BoostListing {
  id: string
  listingId: string
  type: 'spotlight' | 'premium' | 'urgent'
  startDate: Date
  endDate: Date
  isActive: boolean
}

export interface SpotFinder {
  id: string
  userId: string
  viewCount: number
  messageCount: number
  isActive: boolean
  createdAt: Date
}

export interface SixerSubscription {
  id: string
  userId: string
  plan: 'basic' | 'premium' | 'concierge'
  startDate: Date
  endDate: Date
  isActive: boolean
}

export type NotificationType = 
  | 'message'
  | 'booking_request'
  | 'verification_approved'
  | 'verification_rejected'
  | 'boost_expired'
  | 'spotfinder_view'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  data?: any
  createdAt: Date
}

export interface CampusAnalytics {
  id: string
  university: string
  totalListings: number
  totalUsers: number
  averageRent: number
  popularAreas: string[]
  createdAt: Date
} 