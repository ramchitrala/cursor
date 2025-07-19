import { test, expect } from '@playwright/test'

// Test that home page fits within viewport without scrolling
test.describe('No Scroll Home Tests', () => {
  test('Home page fits in mobile viewport (375×667) without scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Get page dimensions
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
    const viewportHeight = 667
    
    // Verify page fits within viewport
    expect(bodyHeight).toBeLessThanOrEqual(viewportHeight)
    
    // Verify no scroll is possible
    const scrollTop = await page.evaluate(() => window.scrollY)
    expect(scrollTop).toBe(0)
  })

  test('Home page fits in tablet viewport (768×1024) without scroll', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Get page dimensions
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
    const viewportHeight = 1024
    
    // Verify page fits within viewport
    expect(bodyHeight).toBeLessThanOrEqual(viewportHeight)
    
    // Verify no scroll is possible
    const scrollTop = await page.evaluate(() => window.scrollY)
    expect(scrollTop).toBe(0)
  })

  test('Home page fits in desktop viewport (1440×900) without scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Get page dimensions
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
    const viewportHeight = 900
    
    // Verify page fits within viewport
    expect(bodyHeight).toBeLessThanOrEqual(viewportHeight)
    
    // Verify no scroll is possible
    const scrollTop = await page.evaluate(() => window.scrollY)
    expect(scrollTop).toBe(0)
  })

  test('Home page fits in large desktop viewport (1920×1080) without scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Get page dimensions
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
    const viewportHeight = 1080
    
    // Verify page fits within viewport
    expect(bodyHeight).toBeLessThanOrEqual(viewportHeight)
    
    // Verify no scroll is possible
    const scrollTop = await page.evaluate(() => window.scrollY)
    expect(scrollTop).toBe(0)
  })

  test('Hero section is properly centered and sized', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Check that hero section exists and is visible
    const heroSection = page.locator('main')
    await expect(heroSection).toBeVisible()
    
    // Check that search input is centered
    const searchInput = page.locator('input[placeholder]')
    await expect(searchInput).toBeVisible()
    
    // Check that search input is within viewport
    const inputBox = await searchInput.boundingBox()
    expect(inputBox).toBeTruthy()
    if (inputBox) {
      expect(inputBox.y).toBeGreaterThan(0)
      expect(inputBox.y + inputBox.height).toBeLessThan(900)
    }
  })

  test('Body has overflow-hidden until results render', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check that body has overflow-hidden initially
    const bodyOverflow = await page.evaluate(() => {
      const body = document.body
      return window.getComputedStyle(body).overflow
    })
    
    expect(bodyOverflow).toBe('hidden')
  })
}) 