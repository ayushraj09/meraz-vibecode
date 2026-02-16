import { NextRequest, NextResponse } from 'next/server'
import { OpenRouter } from '@openrouter/sdk'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY'

const openrouter = new OpenRouter({
  apiKey: OPENROUTER_API_KEY,
})

// Simple in-memory cache for common questions (improves response time)
const responseCache = new Map<string, { response: string; timestamp: number }>()
const CACHE_TTL = 3600000 // 1 hour in milliseconds

function getCachedResponse(query: string): string | null {
  const normalized = query.toLowerCase().trim()
  const cached = responseCache.get(normalized)
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response
  }
  
  if (cached) {
    responseCache.delete(normalized)
  }
  
  return null
}

function setCachedResponse(query: string, response: string): void {
  const normalized = query.toLowerCase().trim()
  responseCache.set(normalized, { response, timestamp: Date.now() })
  
  // Limit cache size to 100 entries
  if (responseCache.size > 100) {
    const firstKey = responseCache.keys().next().value
    responseCache.delete(firstKey)
  }
}

const SYSTEM_PROMPT = `You are an AI assistant for MERAZ 6.0, IIT Bhilai's annual techno-cultural festival themed "STEAMPUNK: GEARS OF GLORY". Be helpful, enthusiastic, and precise with event details.

FESTIVAL BASICS:
- Theme: Steampunk: Gears of Glory
- Dates: March 15-17, 2026 (3 Days)
- Location: IIT Bhilai, GEC Campus, Sejbahar, Raipur, Chhattisgarh - 492015
- Expected Footfall: 5,000+ participants from 50+ colleges

CELEBRITY PERFORMERS:
DAY 1: Bollywood Night (8PM-12AM, Hostel Circle)
DAY 2: The Lost Fireflies Band (8:30-9:30PM) + DJ Afron (9:30PM-12AM, Main Stage)
DAY 3: Asees Kaur (8-9:30PM) + DJ Sparsh (9:30PM-12AM, Main Stage)

KEY EVENTS BY DAY:

DAY 1:
- Opening Ceremony: 9-10AM, LH 500
- SBI's Quiz: 10-11AM, LH 500
- Bollywood Night Pronite: 8PM-12AM, Hostel Circle
- Informal Events: All day, MSH Road & Mini Stage

DAY 2:
- RoboSoccer: LHC Foyer (Morning onwards)
- Line Following Bot: LHC Foyer
- CTF + Mystery Box: L101
- AlgoClash + OpenQuest: L102
- VR+ Drive X: L103
- MUN: L105
- Murder Mystery: LH500 (Afternoon + Evening Finals)
- General Quiz + Housie: L209
- Beyond Sight: LH500 Foyer
- Design Forward + Shutter Quest: L104
- TradeX + E-Conclave: L201
- Sports: Futsal, Volleyball, Basketball, Box Cricket
- Battle of Bands: 6-8PM, Main Stage

DAY 3:
- FPGA Design + DSAI Hackathon: L101
- The Forge + BIB Hackathon: L102
- VR+ Drive X: L103
- Meraz Got Talent: LH500
- NSFW Quiz (18+) + Housie: L209
- Luminous Ink: LH500 Foyer
- Nivesh Paheli: L105
- Abhivyakti: L104
- Sci-Tech Showcase: LHC Foyer
- Sports Finals
- Attire Spectra (Fashion): 6-7:30PM, Main Stage
- Closing Ceremony: 7:30-8PM

PASSES & PRICING:
- Full Festival Pass: ₹400 (Early Bird: ₹300)
- Day Pass: ₹200/day
- Pronite-Only: ₹150/pronite
- VIP Pass: ₹1,500 (limited)
- Accommodation: +₹300/night

EVENT CATEGORIES:
Technical: RoboSoccer, Line Following Bot, FPGA, CTF, AlgoClash, DSAI Hackathon, BIB Hackathon, Mystery Box, OpenQuest, The Forge, VR+ Drive X, Sci-Tech Showcase
Cultural: Meraz Got Talent, Battle of Bands, Attire Spectra, Beyond Sight, Luminous Ink, Abhivyakti
Quizzes: SBI's Quiz, General Quiz, NSFW Quiz
Sports: Futsal, Volleyball, Basketball, Box Cricket
Fintech: TradeX, E-Conclave, Nivesh Paheli
Informal: Games, Radio Meraz, treasure hunts at MSH Road & Mini Stage (all 3 days)

ABOUT ASEES KAUR: Famous Bollywood playback singer known for "Raataan Lambiyan", "Malang", "Ve Maahi", "Daryaa". Multiple Filmfare nominations.

Always provide specific timings, venues, and day numbers when asked. Be enthusiastic about the Steampunk theme!`

export async function POST(request: NextRequest) {
  let messages: any[] = []
  
  try {
    const body = await request.json()
    messages = body.messages

    console.log('=== CHATBOT DEBUG ===')
    console.log('API Key present:', !!OPENROUTER_API_KEY)
    console.log('API Key prefix:', OPENROUTER_API_KEY?.substring(0, 15))
    console.log('Messages count:', messages.length)

    // Check cache for instant responses on common questions
    const lastUserMessage = messages[messages.length - 1]?.content
    if (lastUserMessage && messages.length <= 2) {
      const cachedResponse = getCachedResponse(lastUserMessage)
      if (cachedResponse) {
        console.log('✅ Returning cached response')
        return NextResponse.json({ message: cachedResponse })
      }
    }

    console.log('✅ Calling OpenRouter API with SDK...')
    
    // Use OpenRouter SDK - using chat.send method with TNG Chimera model
    const completion = await openrouter.chat.send({
      model: 'tngtech/tng-r1t-chimera:free',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
    })

    console.log('✅ OpenRouter response received')
    
    const assistantMessage = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t process your request. Please try again.'

    // Cache the response for future queries
    if (lastUserMessage && messages.length <= 2) {
      setCachedResponse(lastUserMessage, assistantMessage)
    }

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Chat API error:', error)
    
    // Return fallback response on error (don't read request body again)
    return NextResponse.json({
      message: messages.length > 0 
        ? getFallbackResponse(messages[messages.length - 1].content)
        : 'Welcome to Meraz 2026! I can help you with information about events, registration, passes, and more. What would you like to know?',
    })
  }
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('event') || lowerMessage.includes('schedule')) {
    return 'Meraz 2026 features 50+ events across cultural, technical, and sports categories. You can explore all events on our Events page. Popular events include dance competitions, hackathons, robotics challenges, and star night performances.'
  }

  if (lowerMessage.includes('register') || lowerMessage.includes('signup')) {
    return 'You can register for Meraz 2026 by creating an account on our website. Click on the "Login" button in the navigation menu and then choose "Sign Up". Once registered, you can browse events and register for individual competitions.'
  }

  if (lowerMessage.includes('pass') || lowerMessage.includes('ticket') || lowerMessage.includes('price')) {
    return 'We offer three types of passes: Single Day Pass (₹299), Three-Day Pass (₹699), and VIP Pass (₹1499). VIP Pass includes priority entry, exclusive seating, and meet & greet opportunities. Visit our Passes page for more details.'
  }

  if (lowerMessage.includes('date') || lowerMessage.includes('when')) {
    return 'Meraz 2026 will be held from March 15-17, 2026 at IIT Bhilai campus in Raipur, Chhattisgarh. Mark your calendars!'
  }

  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('venue')) {
    return 'Meraz 2026 will take place at IIT Bhilai, Sejbahar, Raipur, Chhattisgarh - 492015. The festival spans the entire campus with different venues for various events.'
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
    return 'You can reach us at:\n📧 Email: meraz@iitbhilai.ac.in\n📱 Phone: +91 12345 67890\n\nWe\'re happy to help with any questions!'
  }

  if (lowerMessage.includes('accommodation') || lowerMessage.includes('stay') || lowerMessage.includes('hotel')) {
    return 'Accommodation options are available both on-campus and nearby. We provide basic dormitory-style accommodation on campus for outstation participants. For more comfortable stays, there are several hotels in Raipur. Contact us for partnership hotel details.'
  }

  return 'Welcome to Meraz 2026! I can help you with information about events, registration, passes, schedule, and more. What would you like to know?'
}
