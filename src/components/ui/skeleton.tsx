'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: boolean
  animate?: boolean
}

export function Skeleton({ 
  className = '', 
  width, 
  height, 
  rounded = false,
  animate = true 
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 rounded'
  const roundedClasses = rounded ? 'rounded-full' : 'rounded'
  const widthClass = width ? (typeof width === 'number' ? `w-${width}` : `w-[${width}]`) : ''
  const heightClass = height ? (typeof height === 'number' ? `h-${height}` : `h-[${height}]`) : ''
  
  const classes = `${baseClasses} ${roundedClasses} ${widthClass} ${heightClass} ${className}`.trim()

  if (!animate) {
    return <div className={classes} aria-hidden="true" />
  }

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      aria-hidden="true"
    />
  )
}

// Predefined skeleton components
export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={4} className="w-full" />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }
  
  return (
    <Skeleton 
      className={`${sizeClasses[size]} rounded-full ${className}`}
    />
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-4 space-y-3 ${className}`}>
      <div className="flex items-center space-x-3">
        <SkeletonAvatar size="md" />
        <div className="flex-1 space-y-2">
          <Skeleton height={4} className="w-3/4" />
          <Skeleton height={3} className="w-1/2" />
        </div>
      </div>
      <Skeleton height={3} className="w-full" />
      <Skeleton height={3} className="w-2/3" />
    </div>
  )
}

export function SkeletonList({ items = 3, className = '' }: { items?: number; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
} 