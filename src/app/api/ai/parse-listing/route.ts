import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock AI response for demonstration
    const mockResponse = {
      success: true,
      listing: {
        title: extractTitle(message),
        description: message,
        rent: extractRent(message),
        utilities: extractUtilities(message),
        distanceToCampus: extractDistance(message),
        isFurnished: message.toLowerCase().includes('furnished'),
        allowsPets: message.toLowerCase().includes('pet') || message.toLowerCase().includes('dog') || message.toLowerCase().includes('cat'),
        vibeTags: extractVibeTags(message),
        languages: extractLanguages(message),
        address: extractAddress(message)
      }
    }

    return NextResponse.json(mockResponse)

  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process message. Please try again or use the manual form.' 
      },
      { status: 500 }
    )
  }
}

// Helper functions to extract information from the message
function extractTitle(message: string): string {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes('2br') || lowerMessage.includes('2 bedroom')) return 'Cozy 2BR near Campus'
  if (lowerMessage.includes('studio')) return 'Modern Studio Apartment'
  if (lowerMessage.includes('3br') || lowerMessage.includes('3 bedroom')) return 'Spacious 3BR House'
  if (lowerMessage.includes('loft')) return 'Downtown Loft'
  return 'Room Available'
}

function extractRent(message: string): string {
  const rentMatch = message.match(/\$(\d{1,4})/i)
  return rentMatch ? rentMatch[1] : '1200'
}

function extractUtilities(message: string): string {
  const utilitiesMatch = message.match(/utilities?.*?\$(\d{1,3})/i)
  return utilitiesMatch ? utilitiesMatch[1] : '150'
}

function extractDistance(message: string): string {
  const distanceMatch = message.match(/(\d+(?:\.\d+)?)\s*(?:mi|miles?|mile)/i)
  return distanceMatch ? distanceMatch[1] : '0.8'
}

function extractVibeTags(message: string): string[] {
  const lowerMessage = message.toLowerCase()
  const tags = []
  
  if (lowerMessage.includes('quiet')) tags.push('Quiet')
  if (lowerMessage.includes('social')) tags.push('Social')
  if (lowerMessage.includes('study')) tags.push('Study-friendly')
  if (lowerMessage.includes('party')) tags.push('Party-friendly')
  if (lowerMessage.includes('clean')) tags.push('Clean')
  if (lowerMessage.includes('relaxed')) tags.push('Relaxed')
  if (lowerMessage.includes('active')) tags.push('Active')
  if (lowerMessage.includes('creative')) tags.push('Creative')
  if (lowerMessage.includes('professional')) tags.push('Professional')
  if (lowerMessage.includes('outdoor')) tags.push('Outdoorsy')
  
  return tags.length > 0 ? tags : ['Quiet', 'Study-friendly']
}

function extractLanguages(message: string): string[] {
  const lowerMessage = message.toLowerCase()
  const languages = ['English']
  
  if (lowerMessage.includes('spanish')) languages.push('Spanish')
  if (lowerMessage.includes('french')) languages.push('French')
  if (lowerMessage.includes('german')) languages.push('German')
  if (lowerMessage.includes('chinese')) languages.push('Chinese')
  if (lowerMessage.includes('japanese')) languages.push('Japanese')
  if (lowerMessage.includes('korean')) languages.push('Korean')
  if (lowerMessage.includes('arabic')) languages.push('Arabic')
  if (lowerMessage.includes('russian')) languages.push('Russian')
  if (lowerMessage.includes('portuguese')) languages.push('Portuguese')
  
  return languages
}

function extractAddress(message: string): string {
  // Simple address extraction - in a real app, this would be more sophisticated
  const addressMatch = message.match(/(?:near|at|in)\s+([A-Za-z\s]+?)(?:\s|$|\.)/i)
  return addressMatch ? addressMatch[1].trim() : 'Near Campus'
} 