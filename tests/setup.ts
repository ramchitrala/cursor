// Jest setup file for testing environment

import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock SWR
jest.mock('swr', () => ({
  default: jest.fn(),
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: function(props) {
      const React = require('react')
      return React.createElement('div', props)
    },
    button: function(props) {
      const React = require('react')
      return React.createElement('button', props)
    },
    span: function(props) {
      const React = require('react')
      return React.createElement('span', props)
    },
  },
  AnimatePresence: function(props) {
    return props.children
  },
}))

// Mock react-typical
jest.mock('react-typical', () => {
  return function Typical(props) {
    const React = require('react')
    return React.createElement('span', {}, props.children)
  }
})

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock fetch
global.fetch = jest.fn()

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

beforeAll(() => {
  console.error = function(...args) {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalConsoleError.call(console, ...args)
  }
  
  console.warn = function(...args) {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: componentWillReceiveProps')
    ) {
      return
    }
    originalConsoleWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalConsoleError
  console.warn = originalConsoleWarn
}) 