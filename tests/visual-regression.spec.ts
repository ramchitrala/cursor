import { test, expect } from '@playwright/test'

// Visual regression tests for theme consistency audit
test.describe('Visual Regression Tests', () => {
  test('Home page - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('home-mobile.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Home page - tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('home-tablet.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Home page - desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('home-desktop.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Search page - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/search?q=university')
    
    // Wait for content to load
    await page.waitForTimeout(1000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('search-mobile.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Search page - desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/search?q=university')
    
    // Wait for content to load
    await page.waitForTimeout(1000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('search-desktop.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Profile page - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/profile')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('profile-mobile.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Profile page - desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/profile')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('profile-desktop.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Sixer page - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/sixer')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('sixer-mobile.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Sixer page - desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/sixer')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('sixer-desktop.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Messenger page - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/messenger')
    
    // Wait for content to load
    await page.waitForTimeout(1000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('messenger-mobile.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Messenger page - desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/messenger')
    
    // Wait for content to load
    await page.waitForTimeout(1000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('messenger-desktop.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Login modal - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/search?q=university')
    
    // Click on a listing to trigger login modal
    await page.click('.bg-white.border')
    
    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 })
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('login-modal-mobile.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('Login modal - desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/search?q=university')
    
    // Click on a listing to trigger login modal
    await page.click('.bg-white.border')
    
    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 })
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('login-modal-desktop.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })

  test('AR preview page - tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/listing/1/ar')
    
    // Wait for content to load
    await page.waitForTimeout(1000)
    
    // Take screenshot for visual regression
    await expect(page).toHaveScreenshot('ar-preview-tablet.png', {
      threshold: 0.1,
      maxDiffPixels: 100
    })
  })
}) 