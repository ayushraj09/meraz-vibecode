import { NextRequest, NextResponse } from "next/server"
import { OpenRouter } from "@openrouter/sdk"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY"

const openrouter = new OpenRouter({
  apiKey: OPENROUTER_API_KEY,
})

// Advanced caching with semantic matching for common questions
const responseCache = new Map<string, { response: string; timestamp: number }>()
const CACHE_TTL = 7200000 // 2 hours in milliseconds (increased for better caching)
const MAX_CACHE_SIZE = 500 // Increased from 200 for more cached queries

// Pre-cached responses disabled - all queries now go through API for contextual responses
/* INSTANT_RESPONSES DISABLED - Using API for all queries
const INSTANT_RESPONSES: Record<string, string> = {
  // Greetings
  "hi|hello|hey|hii|helo": "Hi! 👋 I'm the Meraz AI Assistant. I can help you with events, schedules, passes, registration, and more! What would you like to know?",
  
  // Asees Kaur Specific
  "asees|kaur": "⭐ **Asees Kaur - Bollywood Playback Singer**\n\n📅 Day 3 (March 17, 2026)\n⏰ 8:00 PM - 9:30 PM\n📍 Main Stage\n\n🎵 Famous for:\n- 'Raataan Lambiyan' (Shershaah)\n- 'Malang' (Dhoom 3)\n- 'Ve Maahi' (Kesari)\n- 'Daryaa' (Manmarziyaan)\n\nMultiple Filmfare nominations! She performs after the Closing Ceremony, followed by DJ Sparsh (9:30PM-12AM).",
  
  // The Lost Fireflies
  "lost fireflies|fireflies": "🎸 **The Lost Fireflies - Professional Band**\n\n📅 Day 2 (March 16, 2026)\n⏰ 8:30 PM - 9:30 PM\n📍 Main Stage\n\nRock, alternative, and fusion genres. High-energy live performance! Followed by DJ Afron (9:30PM-12AM).",
  
  // DJ queries
  "dj afron|afron": "🎧 **DJ Afron**\n\n📅 Day 2 (March 16, 2026)\n⏰ 9:30 PM - 12:00 AM\n📍 Main Stage\n\nElectronic dance music specialist. Performs after The Lost Fireflies band!",
  
  "dj sparsh|sparsh": "🎧 **DJ Sparsh**\n\n📅 Day 3 (March 17, 2026)\n⏰ 9:30 PM - 12:00 AM\n📍 Main Stage\n\nBollywood and EDM specialist. Grand finale DJ performance after Asees Kaur!",
  
  // Pronites General
  "pronite|celebrity|singer|performer": "🎵 **MERAZ 6.0 Pronite Lineup:**\n\n🌙 **Day 1** - Bollywood Night\n⏰ 8:00 PM - 12:00 AM\n📍 Hostel Circle\n\n🌙 **Day 2** - Main Stage\n⏰ 8:30-9:30 PM: The Lost Fireflies (Band)\n⏰ 9:30 PM-12 AM: DJ Afron\n\n🌙 **Day 3** - Main Stage\n⏰ 8:00-9:30 PM: Asees Kaur (Singer)\n⏰ 9:30 PM-12 AM: DJ Sparsh\n\nAll pronites are included with festival passes!",
  
  // Event Schedule Quick Answers
  "when|schedule|timing": "📅 **MERAZ 6.0: March 15-17, 2026**\n\n**Day 1:**\n- Opening Ceremony: 9-10 AM (LH 500)\n- SBI's Quiz: 10-11 AM (LH 500)\n- Bollywood Night: 8 PM-12 AM (Hostel Circle)\n\n**Day 2:**\n- Technical Events: RoboSoccer, CTF, AlgoClash (Various venues)\n- Battle of Bands: 6-8 PM (Main Stage)\n- The Lost Fireflies + DJ Afron: 8:30 PM-12 AM\n\n**Day 3:**\n- Finals & Hackathons (Various venues)\n- Attire Spectra: 6-7:30 PM\n- Closing: 7:30-8 PM\n- Asees Kaur + DJ Sparsh: 8 PM-12 AM",
  
  // Passes/Pricing
  "pass|ticket|price|cost|fee": "🎟️ **Festival Passes:**\n\n✨ Full Festival Pass: ₹400 (Early Bird: ₹300)\n📅 Day Pass: ₹200/day\n🎵 Pronite-Only: ₹150/pronite\n👑 VIP Pass: ₹1,500 (limited)\n🏨 Accommodation: +₹300/night\n\nVisit our Passes page to purchase!",
  
  // Specific Event Queries
  "robosoccer|robot soccer": "🤖 **RoboSoccer**\n\n📅 Day 2 (March 16, 2026)\n⏰ Morning onwards\n📍 LHC Foyer\n\nBuild and compete with soccer-playing robots!",
  
  "battle|bands": "🎸 **Battle of Bands**\n\n📅 Day 2 (March 16, 2026)\n⏰ 6:00 PM - 8:00 PM\n📍 Main Stage\n\nCollege bands compete for glory! Followed by The Lost Fireflies at 8:30 PM.",
  
  "hackathon|dsai|bib": "💻 **Hackathons:**\n\n**Day 3:**\n- DSAI Hackathon (Data Science & AI) - L101\n- BIB Hackathon (Build In Bhilai) - L102\n- The Forge - L102\n\nAlso: 24-hour general hackathon starts Day 1 at 10 AM!",
  
  "talent|got talent": "🌟 **Meraz Got Talent**\n\n📅 Day 3 (March 17, 2026)\n📍 LH500\n\nMulti-talent showcase - dance, singing, comedy, magic, and more!",
  
  "fashion|attire spectra": "👗 **Attire Spectra - Fashion Show**\n\n📅 Day 3 (March 17, 2026)\n⏰ 6:00 PM - 7:30 PM\n📍 Main Stage\n\nSteampunk-themed fashion show before the closing ceremony!",
  
  // Location
  "location|address|where|venue": "📍 **IIT Bhilai, GEC Campus**\nSejbahar, Raipur\nChhattisgarh - 492015\n\n🏛️ **Venues:**\n- Main Stage (Pronites)\n- LH 500 (Opening/Closing)\n- LHC Foyer (Robotics)\n- L101-L105 (Technical events)\n- MSH Road & Mini Stage (Informal events)",
  
  // Registration
  "register|registration|signup": "📝 **How to Register:**\n\n1. Click 'Register Now' on homepage\n2. Create your account\n3. Choose your pass type\n4. Complete payment\n\n💡 IIT Bhilai students get FREE entry!\n\n📧 Contact: meraz@iitbhilai.ac.in\n📱 Phone: +91 771 2973 622",
  
  // Contact
  "contact|email|phone|help": "📞 **Contact Us:**\n\n📧 Email: meraz@iitbhilai.ac.in\n📱 Phone: +91 771 2973 622\n🌐 Website: https://meraz.iitbhilai.ac.in\n\nWe're here to help! 😊",
  
  // Events
  "event|competition": "🎯 **50+ Events Across:**\n\n💻 **Technical:** RoboSoccer, Hackathons, CTF, FPGA, VR+, AlgoClash\n🎭 **Cultural:** Battle of Bands, Meraz Got Talent, Fashion\n🧠 **Quizzes:** SBI's Quiz, General Quiz, NSFW Quiz\n⚽ **Sports:** Futsal, Volleyball, Basketball, Box Cricket\n📈 **Fintech:** TradeX, E-Conclave, Nivesh Paheli\n🎪 **Informal:** Radio Meraz, Games (MSH Road - all 3 days)\n\nVisit Events page for details!",
  
  // Sports
  "sport|futsal|volleyball|basketball|cricket": "⚽ **Sports Events:**\n\n**Day 2 & 3:**\n- Futsal (5-a-side football) - MSH Ground\n- Volleyball - Volleyball Court\n- Basketball - Basketball Court\n- Box Cricket - Helipad 3\n\nFinals on Day 3!",
  
  // Quiz events
  "quiz": "🧠 **Quiz Events:**\n\n**Day 1:**\n- SBI's Quiz: 10-11 AM (LH 500)\n\n**Day 2:**\n- General Quiz: L209\n- Housie: L209\n\n**Day 3:**\n- NSFW Quiz (18+): L209\n- Housie: L209",
  
  // Informal events
  "informal|radio meraz|games": "🎪 **Informal Events**\n\n📍 MSH Road & Mini Stage\n📅 All 3 Days (Continuous)\n\n🎮 Activities:\n- Radio Meraz broadcasts\n- Game stalls\n- Treasure hunts\n- Carnival games\n- Photo booths\n- Quick competitions\n- Fun challenges\n\nDrop by anytime for casual fun!",
  
  // Theme
  "theme|steampunk": "⚙️ **Theme: STEAMPUNK - GEARS OF GLORY**\n\nWhere Victorian elegance meets futuristic innovation! Experience the harmony between art and machinery as gears turn in minds and engines alike.\n\n🎩 Expect steampunk-themed decor, costumes, and activities throughout the festival!",
  
  // Specific Technical Events
  "ctf|capture the flag|cybersecurity": "🔐 **CTF (Capture The Flag)**\n\n📅 Day 2 (March 16, 2026)\n📍 L101\n⏰ Various slots throughout the day\n\nCybersecurity competition - hack, solve challenges, capture flags!",
  
  "algoclash|algorithm|coding competition": "💻 **AlgoClash**\n\n📅 Day 2 (March 16, 2026)\n📍 L102\n⏰ Various slots\n\nAlgorithm programming competition. Test your coding skills against the best!",
  
  "fpga|electronics": "⚡ **FPGA Design Contest**\n\n📅 Day 3 (March 17, 2026)\n📍 L101\n⏰ Various slots\n\nAdvanced electronics and digital design competition.",
  
  "dsai|data science|ai hackathon|machine learning": "🤖 **DSAI Hackathon**\n\n📅 Day 3 (March 17, 2026)\n📍 L101\n⏰ Throughout the day\n\nData Science & AI Hackathon. Build ML models, analyze data, win prizes!\n💰 Prize: ₹50,000 (1st), ₹30,000 (2nd), ₹20,000 (3rd)",
  
  "bib|build in bhilai|general hackathon": "💻 **BIB Hackathon (Build In Bhilai)**\n\n📅 Day 3 (March 17, 2026)\n📍 L102\n⏰ Throughout the day\n\nGeneral hackathon - build anything! Web apps, mobile apps, innovations.\n💰 Prize: ₹50,000 (1st), ₹30,000 (2nd), ₹20,000 (3rd)",
  
  "mystery box": "📦 **Mystery Box**\n\n📅 Day 2 (March 16, 2026)\n📍 L101\n⏰ Various slots\n\nBuild something innovative from mystery components. Think fast, build faster!",
  
  "openquest": "🎯 **OpenQuest**\n\n📅 Day 2 (March 16, 2026)\n📍 L102\n⏰ Various slots\n\nOpen-ended technical challenge. Creativity meets technology!",
  
  "the forge": "🔨 **The Forge**\n\n📅 Day 3 (March 17, 2026)\n📍 L102\n⏰ Various slots\n\nTechnical building/creation competition. Forge your ideas into reality!",
  
  "vr|virtual reality|drive": "🥽 **VR+ Drive X**\n\n📅 Day 2 & 3 (March 16-17, 2026)\n📍 L103\n⏰ Throughout both days\n\nVirtual reality driving experience. Immersive VR technology!",
  
  "line following|bot competition": "🤖 **Line Following Bot**\n\n📅 Day 2 (March 16, 2026)\n📍 LHC Foyer\n⏰ Morning onwards\n\nBuild robots that follow lines autonomously. Speed and accuracy matter!",
  
  "sci-tech|showcase|exhibition": "🔬 **Sci-Tech Showcase**\n\n📅 Day 3 (March 17, 2026)\n📍 LHC Foyer\n⏰ Morning onwards\n\nScience and technology exhibition. Display your innovations!",
  
  // Cultural Events Detailed
  "mun|model united nations|diplomacy": "🌍 **MUN (Model United Nations)**\n\n📅 Day 2 (March 16, 2026)\n📍 L105\n⏰ 9:00 AM onwards\n\nDiplomacy simulation. Debate, negotiate, and represent nations!",
  
  "murder mystery|detective": "🔍 **Murder Mystery**\n\n📅 Day 2 (March 16, 2026)\n📍 LH500\n⏰ First Round: Afternoon | Finals: Evening\n\nSolve the mystery! Use clues, interrogate suspects, find the killer.",
  
  "beyond sight|blindfold": "👁️ **Beyond Sight**\n\n📅 Day 2 (March 16, 2026)\n📍 LH500 Foyer\n⏰ Various slots\n\nBlindfold-based creative competition. Trust your other senses!",
  
  "luminous ink|art|writing": "✨ **Luminous Ink**\n\n📅 Day 3 (March 17, 2026)\n📍 LH500 Foyer\n⏰ Various slots\n\nArt and creative writing event. Express yourself through visual or written art!",
  
  "design forward|design competition": "🎨 **Design Forward**\n\n📅 Day 2 (March 16, 2026)\n📍 L104\n⏰ Various slots\n\nGraphic design, UI/UX, product design competition. Showcase your creativity!",
  
  "shutter quest|photography": "📸 **Shutter Quest**\n\n📅 Day 2 (March 16, 2026)\n📍 L104\n⏰ Various slots\n\nPhotography competition. Capture the essence of Steampunk!",
  
  "abhivyakti|expression": "🎭 **Abhivyakti**\n\n📅 Day 3 (March 17, 2026)\n📍 L104\n⏰ Various slots\n\nExpression through art and performance. Dance, drama, poetry, and more!",
  
  // Fintech Events
  "tradex|stock|trading": "📈 **TradeX**\n\n📅 Day 2 (March 16, 2026)\n📍 L201\n⏰ Various slots\n\nStock trading simulation. Make virtual investments, maximize returns!",
  
  "e-conclave|entrepreneurship|startup": "🚀 **E-Conclave**\n\n📅 Day 2 (March 16, 2026)\n📍 L201\n⏰ Various slots\n\nEntrepreneurship conclave. Network with founders, investors, and innovators!",
  
  "nivesh paheli|investment|puzzle": "🧩 **Nivesh Paheli**\n\n📅 Day 3 (March 17, 2026)\n📍 L105\n⏰ Various slots\n\nInvestment riddles and financial puzzles. Test your financial acumen!",
  
  // Opening & Closing
  "opening|ceremony|inauguration": "🎉 **Opening Ceremony**\n\n📅 Day 1 (March 15, 2026)\n⏰ 9:00-10:00 AM\n📍 LH 500\n\nKickstart MERAZ 6.0 with speeches, performances, and the unveiling of the Steampunk theme!",
  
  "closing|farewell|end": "🎊 **Closing Ceremony**\n\n📅 Day 3 (March 17, 2026)\n⏰ 7:30-8:00 PM\n📍 Main Stage\n\nPrize distribution, highlights reel, and emotional goodbye. Followed by Asees Kaur performance at 8:00 PM!",
  
  "sbi quiz|sbi": "🏦 **SBI's Quiz**\n\n📅 Day 1 (March 15, 2026)\n⏰ 10:00-11:00 AM\n📍 LH 500\n\nGeneral knowledge quiz sponsored by State Bank of India. Right after Opening Ceremony!",
  
  // Prize Money
  "prize|money|reward|win": "💰 **Prize Pool: ₹6,00,000+**\n\n🏆 **Major Prizes:**\n- Hackathons: ₹50K (1st), ₹30K (2nd), ₹20K (3rd)\n- RoboSoccer: ₹40K (1st), ₹25K (2nd), ₹15K (3rd)\n- Cultural: ₹20K-25K for winners\n- Sports: ₹10K (1st), ₹6K (2nd)\n- Other events: ₹2K-15K\n\nCompete and win big!",
  
  // Accommodation
  "accommodation|stay|hostel|sleep": "🏨 **Accommodation Package**\n\n💵 ₹300 per night\n\n✅ Includes:\n- Dormitory-style hostel (boys/girls separate)\n- Basic bedding (mattress, pillow, blanket)\n- 24/7 security\n- Common washrooms\n- Locker facility\n\nBook during registration!",
  
  // Food
  "food|eat|meal|restaurant": "🍽️ **Food Arrangements**\n\n🍕 Multiple food courts with:\n- North Indian, South Indian, Chinese, Continental\n- Street food zone\n- Vegetarian & non-vegetarian\n\n⏰ **Timings:**\n- Breakfast: 8-10 AM\n- Lunch: 12-2 PM\n- Snacks: 4-6 PM\n- Dinner: 7-9 PM\n- 24-hour stalls during hackathons!",
  
  // Workshops
  "workshop|training|seminar|learn": "🎓 **Workshops & Seminars**\n\n**Day 1:**\n- Web Dev Bootcamp: 2-4 PM\n- Dance Workshop: 9-11 AM\n- Creative Writing: 4-6 PM\n\n**Day 2:**\n- AI/ML Workshop: 10 AM-12 PM\n- Photography Masterclass: 11 AM-1 PM\n- Cybersecurity: 3-5 PM\n- Career in Arts: 3 PM\n\n**Day 3:**\n- Robotics: 10 AM-12 PM\n- Music Production: 2-4 PM\n\nLearn from experts!",
  
  // How to reach
  "reach|travel|airport|railway|station": "🚂 **How to Reach IIT Bhilai:**\n\n✈️ **Nearest Airport:** Swami Vivekananda Airport, Raipur (15 km)\n🚂 **Nearest Railway:** Raipur Junction (20 km)\n🚌 **Road:** Well-connected by buses and taxis\n\n🅿️ Parking available for 500+ vehicles at campus.\n\nSpecial buses may run from station/airport - check website!",
}
*/ // End of INSTANT_RESPONSES comment block

// Instant responses disabled - always return null to force API usage for contextual responses
function getInstantResponse(query: string): string | null {
  return null
}

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
  
  // Limit cache size to MAX_CACHE_SIZE entries for optimal memory usage
  if (responseCache.size > MAX_CACHE_SIZE) {
    const firstKey = responseCache.keys().next().value
    if (firstKey) responseCache.delete(firstKey)
  }
}

const SYSTEM_PROMPT = `You are an AI assistant for MERAZ 6.0, IIT Bhilai's annual techno-cultural festival themed "STEAMPUNK: GEARS OF GLORY". Be helpful, enthusiastic, and ALWAYS provide SPECIFIC details with exact timings, venues, day numbers, and prices. NEVER give generic answers like "check the website" or "various events" - always provide concrete information.

FESTIVAL BASICS:
- Theme: Steampunk: Gears of Glory (Victorian elegance meets futuristic innovation)
- Dates: March 15-17, 2026 (3 Days)
- Location: IIT Bhilai, GEC Campus, Sejbahar, Raipur, Chhattisgarh - 492015
- Expected Footfall: 5,000+ participants from 50+ colleges across 15+ states
- Past Edition: MERAZ 5.0 had 4,200+ participants
- Total Prize Pool: ₹6,00,000+

CELEBRITY PERFORMERS (PRONITES):
DAY 1: Bollywood Night (8:00 PM-12:00 AM, Hostel Circle) - Celebrity TBA
DAY 2 MAIN STAGE: 
  - 6:00-8:00 PM: Battle of Bands (College competition)
  - 8:30-9:30 PM: The Lost Fireflies (Professional Band - Rock/Alternative)
  - 9:30 PM-12:00 AM: DJ Afron (Electronic Dance Music)
DAY 3 MAIN STAGE:
  - 6:00-7:30 PM: Attire Spectra (Fashion Show)
  - 7:30-8:00 PM: Closing Ceremony
  - 8:00-9:30 PM: Asees Kaur (Bollywood Singer - "Raataan Lambiyan", "Malang", "Ve Maahi")
  - 9:30 PM-12:00 AM: DJ Sparsh (Bollywood/EDM)

COMPLETE EVENT SCHEDULE WITH TIMINGS:

DAY 1 (March 15):
- 9:00-10:00 AM: Opening Ceremony (LH 500)
- 10:00-11:00 AM: SBI's Quiz (LH 500)
- 8:00 PM-12:00 AM: Bollywood Night Pronite (Hostel Circle)
- All Day: Informal Events (MSH Road & Mini Stage)

DAY 2 (March 16):
Technical Events:
- Morning onwards: RoboSoccer (LHC Foyer)
- Morning onwards: Line Following Bot (LHC Foyer)
- Various times: CTF + Mystery Box (L101)
- Various times: AlgoClash + OpenQuest (L102)
- Throughout day: VR+ Drive X (L103)
- 9:00 AM onwards: MUN (L105)
Cultural Events:
- Afternoon: Murder Mystery First Round (LH500)
- Evening: Murder Mystery Finals (LH500)
- Various times: General Quiz + Housie (L209)
- Various times: Beyond Sight (LH500 Foyer)
- Various times: Design Forward + Shutter Quest (L104)
- Various times: TradeX + E-Conclave (L201)
Sports:
- Throughout day: Futsal (MSH Ground), Volleyball, Basketball, Box Cricket (Helipad 3)
Evening Program (Main Stage):
- 6:00-8:00 PM: Battle of Bands
- 8:30-9:30 PM: The Lost Fireflies Band
- 9:30 PM-12:00 AM: DJ Afron
Informal: All day (MSH Road & Mini Stage)

DAY 3 (March 17):
Technical Events:
- Various times: FPGA Design + DSAI Hackathon (L101)
- Various times: The Forge + BIB Hackathon (L102)
- Throughout day: VR+ Drive X (L103)
- Morning onwards: Sci-Tech Showcase (LHC Foyer)
Cultural Events:
- Various times: Meraz Got Talent (LH500)
- Various times: NSFW Quiz (18+) + Housie (L209)
- Various times: Luminous Ink (LH500 Foyer)
- Various times: Nivesh Paheli (L105)
- Various times: Abhivyakti (L104)
Sports Finals:
- All venues throughout day
Grand Finale (Main Stage):
- 6:00-7:30 PM: Attire Spectra (Fashion Show)
- 7:30-8:00 PM: Closing Ceremony
- 8:00-9:30 PM: Asees Kaur Performance
- 9:30 PM-12:00 AM: DJ Sparsh
Informal: All day (MSH Road & Mini Stage)

PASSES & PRICING:
- Full Festival Pass: ₹400 (Early Bird: ₹300, On-Spot: ₹500)
- Day Pass: ₹200 per day
- Pronite-Only Pass: ₹150 per pronite
- VIP Pass: ₹1,500 (limited - includes VIP seating, premium merchandise, fast-track entry)
- Accommodation: Additional ₹300 per night (dormitory style)
- IIT Bhilai students: FREE entry

EVENT CATEGORIES:
Technical: RoboSoccer, Line Following Bot, FPGA Design, CTF, AlgoClash, DSAI Hackathon, BIB Hackathon, Mystery Box, OpenQuest, The Forge, VR+ Drive X, Sci-Tech Showcase
Cultural: Meraz Got Talent, Battle of Bands, Attire Spectra, Beyond Sight, Luminous Ink, Abhivyakti, Murder Mystery
Quizzes: SBI's Quiz (Day 1), General Quiz (Day 2), NSFW Quiz 18+ (Day 3), Housie (Day 2 & 3)
Sports: Futsal, Volleyball, Basketball, Box Cricket (Day 2 & 3, Finals on Day 3)
Fintech: TradeX, E-Conclave, Nivesh Paheli
Informal: Radio Meraz, game stalls, treasure hunts, carnival games, photo booths (MSH Road & Mini Stage, all 3 days)

VENUE GUIDE:
- Main Stage: Pronites, Battle of Bands, Fashion Show, Ceremonies
- LH 500: Opening Ceremony, SBI's Quiz, Closing Ceremony
- LHC Foyer: RoboSoccer, Line Following Bot, Sci-Tech Showcase
- L101: CTF, Mystery Box, FPGA Design, DSAI Hackathon
- L102: AlgoClash, OpenQuest, The Forge, BIB Hackathon
- L103: VR+ Drive X
- L104: Design Forward, Shutter Quest, Abhivyakti
- L105: MUN, Nivesh Paheli
- L201: TradeX, E-Conclave
- L209: Quizzes, Housie
- LH500 Foyer: Beyond Sight, Luminous Ink
- MSH Ground: Futsal
- Volleyball Court: Volleyball
- Basketball Court: Basketball
- Helipad 3: Box Cricket
- Hostel Circle: Bollywood Night (Day 1 Pronite)
- MSH Road & Mini Stage: Informal events (all 3 days)

ABOUT ASEES KAUR: Famous Bollywood playback singer with multiple Filmfare nominations. Known for hit songs "Raataan Lambiyan" (Shershaah), "Malang" (Dhoom 3), "Ve Maahi" (Kesari), "Daryaa" (Manmarziyaan). Youth icon and social media sensation.

CONTACT:
- Email: meraz@iitbhilai.ac.in (general queries)
- Email: registration@meraz.in (registration queries)
- Email: sponsors@meraz.in (sponsorship)
- Phone: +91 771 2973 622
- Website: https://meraz.iitbhilai.ac.in
- Instagram: @meraz_iitbhilai | Facebook: /MerazIITBhilai | Twitter: @MerazIITB

PRIZE POOL (Total: ₹6,00,000+):
Technical Events:
- Hackathons (DSAI/BIB): ₹50,000 (1st), ₹30,000 (2nd), ₹20,000 (3rd)
- RoboSoccer: ₹40,000 (1st), ₹25,000 (2nd), ₹15,000 (3rd)
- CTF/AlgoClash: ₹30,000 (1st), ₹20,000 (2nd), ₹10,000 (3rd)
Cultural Events:
- Dance/Fashion: ₹25,000 (1st), ₹15,000 (2nd), ₹10,000 (3rd)
- Music/Band: ₹20,000 (1st), ₹12,000 (2nd), ₹8,000 (3rd)
Sports:
- Futsal/Volleyball/Basketball: ₹10,000 (1st), ₹6,000 (2nd)
- E-Sports: ₹15,000 (1st), ₹10,000 (2nd)
Other Events: ₹2,000-₹10,000 per event

WORKSHOPS & SEMINARS:
Day 1:
- Web Development Bootcamp: 2:00-4:00 PM
- Dance Workshop: 9:00-11:00 AM
- Creative Writing: 4:00-6:00 PM
Day 2:
- AI and Machine Learning: 10:00 AM-12:00 PM
- Photography Masterclass: 11:00 AM-1:00 PM
- Cybersecurity Essentials: 3:00-5:00 PM
- Startup Ecosystem Talk: 11:00 AM
- Career in Arts Talk: 3:00 PM
Day 3:
- Robotics Fundamentals: 10:00 AM-12:00 PM
- Music Production: 2:00-4:00 PM
- Future of Technology Talk: 9:00 AM

TRAVEL INFORMATION:
- Nearest Airport: Swami Vivekananda Airport, Raipur (15 km away)
- Nearest Railway: Raipur Junction (20 km away)
- Campus Parking: Available for 500+ vehicles
- Special buses may run from station/airport (check website for updates)

FACILITIES:
- 24/7 Security and medical facilities with ambulance on standby
- Wi-Fi throughout campus with charging stations
- Lost and found counter, help desk and information booths
- Drinking water stations and multiple restrooms
- Wheelchair accessible routes
- 50,000+ watts sound system for pronites
- Professional lighting and pyrotechnics
- Photo booths and selfie zones

FOOD ARRANGEMENTS:
- Multiple food courts: North Indian, South Indian, Chinese, Continental, Street Food
- Breakfast: 8:00-10:00 AM | Lunch: 12:00-2:00 PM
- Snacks: 4:00-6:00 PM | Dinner: 7:00-9:00 PM
- 24-hour stalls during hackathons
- Vegetarian and non-vegetarian options available
- Special dietary requirements accommodated
- Full Festival Pass includes ₹200 food coupons

ACCOMMODATION:
- On-Campus: ₹300/night (dormitory-style, boys/girls separate)
- Includes: Basic bedding (mattress, pillow, blanket), 24/7 security, common washrooms, locker facility
- Nearby Hotels: Hotel Babylon Inn (2 km), Hotel Piccadily (3 km), Hyatt Raipur (5 km)

RULES & REGULATIONS:
- Valid ID proof required at all times
- Wristbands must be worn (non-transferable, no replacements if lost)
- Alcohol and smoking strictly prohibited
- NSFW Quiz: 18+ only (ID verification required)
- Minors need parental consent for pronites
- Security checks mandatory at pronites
- Lost wristbands = no refunds
- Carry registration confirmation

GROUP DISCOUNTS:
- 5-10 people: 5% discount
- 11-20 people: 10% discount
- 21+ people: 15% discount

EARLY BIRD PRICING:
- First 500 registrations: ₹300 (save ₹100)
- Registrations 501-1000: ₹350 (save ₹50)
- Regular price: ₹400

SUSTAINABILITY INITIATIVES:
- Zero waste festival with waste segregation and recycling
- Eco-friendly biodegradable plates and cutlery
- Digital-first approach (minimal paper usage)
- Post-festival plantation drive
- Rainwater harvesting and water conservation
- LED lighting and solar power where possible

IMPORTANT INSTRUCTIONS:
1. NEVER EVER give generic answers like "check the website", "visit our page", or "various events" - ALWAYS provide specific, detailed information
2. When asked about timing: ALWAYS provide specific time (e.g., "8:00-9:30 PM"), day number (Day 1/2/3), exact date (March 15/16/17, 2026), and precise venue (e.g., "Main Stage", "L101")
3. When asked about performers: include their name, performance time, day, venue, AND their famous songs/background info
4. When asked about passes: include ALL prices (₹300 early bird to ₹1500 VIP), what each includes, and ALWAYS mention IIT Bhilai students get FREE entry
5. When asked about any event: provide exact timing (or "throughout the day"), venue code (L101, LH500, Main Stage, etc.), day number, brief description, and prize money if applicable
6. When asked about prizes: provide exact amounts for 1st, 2nd, 3rd place from the prize pool data
7. For accommodation/food questions: include exact prices (₹300/night, food timings), and what's included
8. When someone asks "when is X arriving" or "when is X performing": respond with Day number, Date, Exact time range (e.g., 8:00-9:30 PM), Venue, and performer background/famous songs
9. Be enthusiastic about the Steampunk theme - use phrases like "Victorian elegance meets futuristic innovation"
10. Always format responses with clear structure: use bullet points, emojis (🎵 🎭 💻 ⚽ 🎓), and line breaks for maximum readability
11. Include contact information when relevant: meraz@iitbhilai.ac.in or +91 771 2973 622
12. If you don't have exact timing for an event listed as "Various slots", say "Various slots throughout the day" but still provide day, venue, and description`

export async function POST(request: NextRequest) {
  let messages: any[] = []
  
  try {
    const body = await request.json()
    messages = body.messages

    console.log("=== CHATBOT DEBUG ===")
    console.log("API Key present:", !!OPENROUTER_API_KEY)
    console.log("Messages count:", messages.length)

    const lastUserMessage = messages[messages.length - 1]?.content
    
    // LEVEL 1: Check cache for previous AI responses (extended to longer conversations)
    if (lastUserMessage && messages.length <= 10) { // Increased from 3 to 10 for better caching
      const cachedResponse = getCachedResponse(lastUserMessage)
      if (cachedResponse) {
        console.log("✅ Returning cached response (1-10ms)")
        return NextResponse.json({ message: cachedResponse })
      }
    }

    // LEVEL 2: If no API key, return smart fallback
    if (!OPENROUTER_API_KEY) {
      console.log("⚠️ No API key, using fallback")
      return NextResponse.json({
        message: lastUserMessage ? getFallbackResponse(lastUserMessage) : "Welcome to Meraz 2026!",
      })
    }

    console.log("✅ Calling OpenRouter API with SDK...")
    
    // Use OpenRouter SDK - non-streaming version for simpler implementation
    const completion = await openrouter.chat.send({
      model: "tngtech/tng-r1t-chimera:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    })

    console.log("✅ OpenRouter response received")
    
    const assistantMessage = completion.choices[0]?.message?.content
    const messageText = typeof assistantMessage === 'string' 
      ? assistantMessage 
      : "I apologize, but I couldn't process your request. Please try again."

    // Cache the response for future queries (more aggressive caching for better performance)
    if (lastUserMessage && messages.length <= 10 && typeof messageText === 'string') { // Increased from 4 to 10
      setCachedResponse(lastUserMessage, messageText)
      console.log("💾 Response cached for future use (TTL: 2 hours)")
    }

    return NextResponse.json({ message: messageText })
  } catch (error) {
    console.error("Chat API error:", error)
    
    // Return fallback response on error
    const lastUserMessage = messages[messages.length - 1]?.content
    return NextResponse.json({
      message: lastUserMessage 
        ? getFallbackResponse(lastUserMessage)
        : "Welcome to Meraz 2026! I can help you with information about events, registration, passes, and more. What would you like to know?",
    })
  }
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("event") || lowerMessage.includes("schedule")) {
    return "Meraz 2026 features 50+ events across cultural, technical, and sports categories from March 15-17, 2026. Check out our Events and Schedule pages for detailed timings and venues. Popular events include RoboSoccer, Battle of Bands, Meraz Got Talent, and pronites with Asees Kaur!"
  }

  if (lowerMessage.includes("register") || lowerMessage.includes("signup")) {
    return "You can register for Meraz 2026 by clicking the 'Register Now' button on the homepage or in the navigation menu. Create your account and choose your pass type. IIT Bhilai students get free entry!"
  }

  if (lowerMessage.includes("pass") || lowerMessage.includes("ticket") || lowerMessage.includes("price")) {
    return "We offer multiple passes:\n- Full Festival Pass: ₹400 (Early Bird: ₹300)\n- Day Pass: ₹200/day\n- Pronite-Only: ₹150/pronite\n- VIP Pass: ₹1,500 (limited)\n- Accommodation: +₹300/night\n\nVisit our Passes page for more details!"
  }

  if (lowerMessage.includes("date") || lowerMessage.includes("when")) {
    return "Meraz 2026 will be held from March 15-17, 2026 (3 days) at IIT Bhilai campus. Day 1 kicks off with Bollywood Night, Day 2 features The Lost Fireflies + DJ Afron, and Day 3 concludes with Asees Kaur + DJ Sparsh!"
  }

  if (lowerMessage.includes("location") || lowerMessage.includes("where") || lowerMessage.includes("venue")) {
    return "Meraz 2026 takes place at IIT Bhilai, GEC Campus, Sejbahar, Raipur, Chhattisgarh - 492015. Events are held across various venues including Main Stage, LH 500, LHC Foyer, and more!"
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
    return "You can reach us at:\n📧 Email: meraz@iitbhilai.ac.in\n📱 Phone: +91 771 2973 622\n\nWe're happy to help with any questions!"
  }

  if (lowerMessage.includes("pronite") || lowerMessage.includes("asees") || lowerMessage.includes("celebrity")) {
    return "Our pronite lineup is amazing! 🎵\n- Day 1: Bollywood Night (8PM-12AM)\n- Day 2: The Lost Fireflies Band + DJ Afron (Main Stage)\n- Day 3: Asees Kaur (famous for 'Raataan Lambiyan') + DJ Sparsh (Main Stage)\n\nAll pronites run from 8PM to 12AM!"
  }

  if (lowerMessage.includes("accommodation") || lowerMessage.includes("stay") || lowerMessage.includes("hotel")) {
    return "Accommodation is available at ₹300/night. You can add this option during registration. On-campus dormitory-style accommodation is provided for outstation participants. For hotels in Raipur, contact us for recommendations!"
  }

  return "Welcome to Meraz 2026 - Steampunk: Gears of Glory! 🎭⚙️ I can help you with:\n- Event schedules and details\n- Registration and passes\n- Pronite lineup and timings\n- Venue information\n- Contact details\n\nWhat would you like to know?"
}
