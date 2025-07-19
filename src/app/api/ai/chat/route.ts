import { NextRequest, NextResponse } from 'next/server'

// Mock Gemini AI response for chat
// In production, you would use the actual Gemini API
export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Generate contextual responses based on the message content
    const responses = [
      {
        trigger: ['rent', 'price', 'cost', 'monthly'],
        responses: [
          "The rent is $1200/month plus utilities. It's a great value for the location and amenities!",
          "Monthly rent is $1200 with utilities around $150. Would you like to see the breakdown?",
          "It's $1200/month plus utilities. The place is fully furnished which saves you money on furniture!"
        ]
      },
      {
        trigger: ['view', 'tour', 'see', 'visit', 'showing'],
        responses: [
          "Absolutely! I'm free this weekend. Saturday at 2 PM or Sunday at 11 AM work for you?",
          "I'd be happy to show you around! When are you available? I'm flexible this week.",
          "Perfect timing! I can show you the place tomorrow or this weekend. What works best for you?"
        ]
      },
      {
        trigger: ['furnished', 'furniture', 'amenities'],
        responses: [
          "Yes, it's fully furnished! The living room has a comfortable couch and TV, kitchen is fully equipped, and bedrooms come with beds and dressers.",
          "Completely furnished! You'll have everything you need - beds, couch, dining table, kitchen appliances, and even some decor.",
          "Fully furnished and move-in ready! All the furniture is modern and in great condition."
        ]
      },
      {
        trigger: ['utilities', 'electric', 'water', 'internet'],
        responses: [
          "Utilities run about $150/month total - that includes electricity, water, gas, and high-speed internet.",
          "Utilities are around $150/month. I can show you the recent bills if you'd like to see the breakdown.",
          "Monthly utilities are approximately $150, which is pretty standard for a 2BR apartment in this area."
        ]
      },
      {
        trigger: ['application', 'apply', 'process', 'lease'],
        responses: [
          "The application process is straightforward! I'll need proof of income, references, and a small application fee. We can start the process right after you see the place.",
          "It's a simple application - income verification, references, and background check. I can walk you through it when you're ready.",
          "Standard rental application process. I'll need your income info and references. We can get it done quickly once you decide!"
        ]
      },
      {
        trigger: ['photos', 'pictures', 'images'],
        responses: [
          "I have lots of photos! Would you like me to send you a link to the full gallery? It shows every room in detail.",
          "Absolutely! I can share the photo gallery with you. It includes all the rooms, kitchen, bathroom, and even the building exterior.",
          "I have comprehensive photos of the entire place. Let me send you the gallery so you can see everything before the tour."
        ]
      },
      {
        trigger: ['available', 'still available', 'vacant'],
        responses: [
          "Yes, it's still available! I've had some interest but no one has committed yet. You're in a good position!",
          "Still available! I'm showing it to a few people this week, but no applications yet. When can you see it?",
          "Yes, it's available! I'm being selective about tenants since it's such a great place. When would you like to tour it?"
        ]
      }
    ]

    // Find matching response based on message content
    const lowerMessage = message.toLowerCase()
    let aiResponse = "That sounds great! I'd be happy to help you with any questions about the apartment."

    for (const category of responses) {
      if (category.trigger.some(trigger => lowerMessage.includes(trigger))) {
        const randomResponse = category.responses[Math.floor(Math.random() * category.responses.length)]
        aiResponse = randomResponse
        break
      }
    }

    // Add some variety with follow-up questions
    const followUps = [
      " When would you like to schedule a viewing?",
      " Does that work for your budget?",
      " What's your timeline for moving in?",
      " Are you looking for a roommate or planning to live alone?",
      " Do you have any pets?",
      " What brings you to this area?"
    ]

    if (Math.random() > 0.5) {
      aiResponse += followUps[Math.floor(Math.random() * followUps.length)]
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chat AI Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate response',
        response: "I'm having trouble processing that right now. Can you rephrase your question?"
      },
      { status: 500 }
    )
  }
} 