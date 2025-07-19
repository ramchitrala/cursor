'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  children,
  ...props
}, ref) => {
  // WCAG 2.2 AA: Ensure minimum touch target size (44px)
  const sizeClasses = {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-6 text-lg'
  }

  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-900 focus:ring-black focus:ring-offset-white',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200 focus:ring-black focus:ring-offset-white',
    outline: 'border border-gray-300 bg-white text-black hover:bg-gray-50 focus:ring-black focus:ring-offset-white',
    ghost: 'text-black hover:bg-gray-100 focus:ring-black focus:ring-offset-white',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 focus:ring-offset-white'
  }

  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'min-h-[44px]', // WCAG 2.2 AA touch target
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div
          className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      )}

      {/* Left icon */}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Content */}
      <span className={cn(
        'flex items-center',
        icon && iconPosition === 'right' && !loading && 'mr-2'
      )}>
        {children}
      </span>

      {/* Right icon */}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export { Button } 