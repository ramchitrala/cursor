// Responsive Design Tests for Sprint 2
// These tests should be run with Playwright at the specified viewport sizes

export const responsiveTests = {
  mobile: {
    viewport: { width: 360, height: 800 },
    tests: [
      'Hero section is visible and properly sized',
      'Search bar is properly sized for mobile',
      'Navigation is properly sized',
      'Quick action cards stack properly',
      'Sixer banner is visible'
    ]
  },
  tablet: {
    viewport: { width: 768, height: 1024 },
    tests: [
      'Layout adapts to tablet size',
      'Search bar is properly sized',
      'Action cards layout is responsive',
      'Navigation elements are properly spaced'
    ]
  },
  desktop: {
    viewport: { width: 1440, height: 900 },
    tests: [
      'Max-width container is respected (1280px)',
      'Content is centered and properly constrained',
      'Search bar is properly sized for desktop',
      'Action cards are properly laid out'
    ]
  }
}

// Test scenarios for different pages
export const pageTests = {
  search: {
    url: '/search?q=university',
    tests: [
      'Search results are visible',
      'Filters are properly sized',
      'Listing cards are properly sized'
    ]
  },
  ar: {
    url: '/listing/1/ar',
    tests: [
      'AR viewer is visible',
      'Navigation is properly sized',
      'Fallback gallery works on mobile'
    ]
  },
  sixer: {
    url: '/sixer',
    tests: [
      'Sixer page content is visible',
      'Pricing section is properly sized',
      'CTA button is properly sized'
    ]
  },
  messenger: {
    url: '/messenger',
    tests: [
      'Messenger page is visible',
      'Conversation list is properly sized',
      'Sixer badges are visible'
    ]
  }
}

// Implementation notes:
// 1. All tests must pass before PR completion
// 2. Tests should verify 375px mobile baseline and 1280px desktop max-width
// 3. Tests should check for proper touch targets (44px minimum)
// 4. Tests should verify monochrome theme compliance
// 5. Tests should check for proper micro-animations (250ms max, 60fps safe) 