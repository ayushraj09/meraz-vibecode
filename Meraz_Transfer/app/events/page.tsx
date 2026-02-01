'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, User, Search, Filter, Clock, Trophy, Users } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

interface Event {
  id: string
  name: string
  category: string
  description: string
  day: number
  time: string
  venue: string
  contact?: string
  prizePool?: string
  teamSize?: string
}

const events: Event[] = [
  // DAY 1
  { id: 'opening', name: 'Opening Ceremony', category: 'Ceremony', description: 'Grand opening of MERAZ 6.0 - Steampunk: Gears of Glory', day: 1, time: '9:00-10:00 AM', venue: 'LH 500' },
  { id: 'sbi-quiz', name: "SBI's Quiz", category: 'Quiz', description: 'General knowledge quiz sponsored by SBI', day: 1, time: '10:00-11:00 AM', venue: 'LH 500', prizePool: '₹15,000' },
  { id: 'bollywood-night', name: 'Bollywood Night Pronite', category: 'Pronite', description: 'Electrifying Bollywood performances and DJ night', day: 1, time: '8:00 PM-12:00 AM', venue: 'Hostel Circle' },
  
  // DAY 2 - Technical
  { id: 'robosoccer', name: 'RoboSoccer', category: 'Technical', description: 'Autonomous robot soccer competition', day: 2, time: 'Morning onwards', venue: 'LHC Foyer', prizePool: '₹25,000', teamSize: '2-4' },
  { id: 'line-bot', name: 'Line Following Bot', category: 'Technical', description: 'Build a robot that follows a line', day: 2, time: 'Morning onwards', venue: 'LHC Foyer', prizePool: '₹20,000', teamSize: '2-4' },
  { id: 'ctf', name: 'CTF (Capture The Flag)', category: 'Technical', description: 'Cybersecurity challenge', day: 2, time: 'Full Day', venue: 'L101', prizePool: '₹30,000', teamSize: '1-3' },
  { id: 'mystery-box', name: 'Mystery Box', category: 'Technical', description: 'Build from mystery components', day: 2, time: 'Full Day', venue: 'L101', prizePool: '₹15,000', teamSize: '2-4' },
  { id: 'algoclash', name: 'AlgoClash', category: 'Technical', description: 'Competitive programming', day: 2, time: 'Full Day', venue: 'L102', prizePool: '₹35,000', teamSize: 'Individual' },
  { id: 'openquest', name: 'OpenQuest', category: 'Technical', description: 'Open-ended technical challenge', day: 2, time: 'Full Day', venue: 'L102', prizePool: '₹20,000', teamSize: '2-3' },
  { id: 'vr-drive', name: 'VR+ Drive X', category: 'Technical', description: 'Virtual reality experience', day: 2, time: 'Full Day', venue: 'L103' },
  
  // DAY 2 - Cultural
  { id: 'mun', name: 'Model United Nations', category: 'Cultural', description: 'Diplomatic simulation', day: 2, time: 'Full Day', venue: 'L105', prizePool: '₹25,000', teamSize: 'Individual' },
  { id: 'murder-mystery', name: 'Murder Mystery', category: 'Cultural', description: 'Detective game - solve the mystery', day: 2, time: 'Afternoon + Evening', venue: 'LH500', prizePool: '₹15,000', teamSize: '3-6' },
  { id: 'beyond-sight', name: 'Beyond Sight', category: 'Cultural', description: 'Blindfold creative challenge', day: 2, time: 'Full Day', venue: 'LH500 Foyer', prizePool: '₹10,000' },
  { id: 'design-forward', name: 'Design Forward', category: 'Cultural', description: 'Design thinking competition', day: 2, time: 'Full Day', venue: 'L104', prizePool: '₹20,000', teamSize: '2-4' },
  { id: 'shutter-quest', name: 'Shutter Quest', category: 'Cultural', description: 'Photography competition', day: 2, time: 'Full Day', venue: 'L104', prizePool: '₹15,000', teamSize: 'Individual' },
  { id: 'battle-bands', name: 'Battle of Bands', category: 'Pronite', description: 'Band competition + The Lost Fireflies live', day: 2, time: '6:00 PM', venue: 'Main Stage', prizePool: '₹50,000', teamSize: '4-8' },
  { id: 'dj-afron', name: 'DJ Afron Music', category: 'Pronite', description: 'High-energy DJ night', day: 2, time: '9:30 PM-12:00 AM', venue: 'Main Stage' },
  
  // DAY 2 - Others
  { id: 'general-quiz', name: 'General Quiz', category: 'Quiz', description: 'Test your knowledge', day: 2, time: 'Full Day', venue: 'L209', prizePool: '₹12,000', teamSize: '2-3' },
  { id: 'tradex', name: 'TradeX', category: 'Fintech', description: 'Stock trading simulation', day: 2, time: 'Full Day', venue: 'L201', prizePool: '₹25,000', teamSize: '2-3' },
  { id: 'e-conclave', name: 'E-Conclave', category: 'Fintech', description: 'Entrepreneurship conclave', day: 2, time: 'Full Day', venue: 'L201' },
  { id: 'futsal', name: 'Futsal', category: 'Sports', description: '5-a-side football', day: 2, time: 'Full Day', venue: 'MSH Ground', prizePool: '₹20,000', teamSize: '5-7' },
  { id: 'volleyball', name: 'Volleyball', category: 'Sports', description: 'Inter-college tournament', day: 2, time: 'Full Day', venue: 'Volleyball Court', prizePool: '₹15,000', teamSize: '6-8' },
  { id: 'basketball', name: 'Basketball', category: 'Sports', description: 'Fast-paced competition', day: 2, time: 'Full Day', venue: 'Basketball Court', prizePool: '₹18,000', teamSize: '5-7' },
  { id: 'box-cricket', name: 'Box Cricket', category: 'Sports', description: 'Street cricket format', day: 2, time: 'Full Day', venue: 'Helipad 3', prizePool: '₹25,000', teamSize: '8-11' },
  
  // DAY 3 - Technical
  { id: 'fpga', name: 'FPGA Design Contest', category: 'Technical', description: 'Hardware design & programming', day: 3, time: 'Full Day', venue: 'L101', prizePool: '₹30,000', teamSize: '2-3' },
  { id: 'dsai', name: 'DSAI Hackathon', category: 'Technical', description: 'Data Science & AI hackathon', day: 3, time: 'Full Day', venue: 'L101', prizePool: '₹40,000', teamSize: '2-4' },
  { id: 'forge', name: 'The Forge', category: 'Technical', description: 'Build technical projects', day: 3, time: 'Full Day', venue: 'L102', prizePool: '₹25,000', teamSize: '2-4' },
  { id: 'bib', name: 'BIB Hackathon', category: 'Technical', description: 'Build In Bhilai hackathon', day: 3, time: 'Full Day', venue: 'L102', prizePool: '₹50,000', teamSize: '2-4' },
  { id: 'sci-tech', name: 'Sci-Tech Showcase', category: 'Technical', description: 'Science & technology exhibition', day: 3, time: 'Full Day', venue: 'LHC Foyer' },
  
  // DAY 3 - Cultural
  { id: 'got-talent', name: 'Meraz Got Talent', category: 'Cultural', description: 'Multi-talent showcase', day: 3, time: 'Full Day', venue: 'LH500', prizePool: '₹40,000' },
  { id: 'luminous-ink', name: 'Luminous Ink', category: 'Cultural', description: 'Art & creative writing', day: 3, time: 'Full Day', venue: 'LH500 Foyer', prizePool: '₹15,000' },
  { id: 'abhivyakti', name: 'Abhivyakti', category: 'Cultural', description: 'Expression through art', day: 3, time: 'Full Day', venue: 'L104', prizePool: '₹18,000' },
  { id: 'fashion', name: 'Attire Spectra', category: 'Cultural', description: 'Steampunk fashion show', day: 3, time: '6:00-7:30 PM', venue: 'Main Stage', prizePool: '₹35,000', teamSize: '8-15' },
  
  // DAY 3 - Others
  { id: 'nsfw', name: 'NSFW Quiz', category: 'Quiz', description: 'Adult humor quiz (18+ only)', day: 3, time: 'Full Day', venue: 'L209', prizePool: '₹10,000', teamSize: '2-3' },
  { id: 'nivesh', name: 'Nivesh Paheli', category: 'Fintech', description: 'Investment puzzle', day: 3, time: 'Full Day', venue: 'L105', prizePool: '₹20,000', teamSize: '2-3' },
  { id: 'asees', name: 'Asees Kaur Live', category: 'Pronite', description: 'Bollywood Singer - Raataan Lambiyan, Malang', day: 3, time: '8:00-9:30 PM', venue: 'Main Stage' },
  { id: 'dj-sparsh', name: 'DJ Sparsh - Grand Finale', category: 'Pronite', description: 'Final DJ night with fireworks', day: 3, time: '9:30 PM-12:00 AM', venue: 'Main Stage' },
  { id: 'closing', name: 'Closing Ceremony', category: 'Ceremony', description: 'Prize distribution & finale', day: 3, time: '7:30-8:00 PM', venue: 'Main Stage' },
  { id: 'sports-finals', name: 'Sports Finals', category: 'Sports', description: 'Finals for all sports events', day: 3, time: 'Throughout the day', venue: 'All Sports Venues' },
]

const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Quiz', 'Pronite', 'Fintech', 'Ceremony']

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDay, setSelectedDay] = useState<number | 'All'>('All')
  const { user, registerForEvent, isRegisteredForEvent } = useAuth()

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    const matchesDay = selectedDay === 'All' || event.day === selectedDay
    return matchesSearch && matchesCategory && matchesDay
  })

  const handleRegister = (eventId: string, eventName: string) => {
    if (!user) {
      toast.error('Please login to register for events')
      return
    }
    
    if (isRegisteredForEvent(eventId)) {
      toast.error('You are already registered for this event')
      return
    }
    
    registerForEvent(eventId)
    toast.success(`Successfully registered for ${eventName}!`)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">MERAZ 6.0 Events</h1>
          <p className="text-xl text-gray-400 mb-8">Steampunk: Gears of Glory - March 15-17, 2026</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="glass px-4 py-2 rounded-full"><span className="text-primary-400">⚙️ 50+ Events</span></div>
            <div className="glass px-4 py-2 rounded-full"><span className="text-accent-400">🏆 ₹5 Lakh+ Prizes</span></div>
            <div className="glass px-4 py-2 rounded-full"><span className="text-purple-400">🎭 3 Pronites</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-dark p-6 rounded-2xl mb-12">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-3 block">Filter by Day</label>
            <div className="flex flex-wrap gap-2">
              {['All', 1, 2, 3].map((day) => (
                <button key={day} onClick={() => setSelectedDay(day as number | 'All')}
                  className={`px-4 py-2 rounded-lg transition-all ${selectedDay === day ? 'bg-gradient-to-r from-primary-600 to-accent-600' : 'bg-dark/50 hover:bg-dark/70'}`}>
                  {day === 'All' ? 'All Days' : `Day ${day}`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-3 block">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category ? 'bg-gradient-to-r from-primary-600 to-accent-600' : 'bg-dark/50 hover:bg-dark/70'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">Showing {filteredEvents.length} of {events.length} events</div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              className="glass-dark rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary-600/20 to-accent-600/20 rounded-full text-xs font-semibold text-primary-300">{event.category}</span>
                  <span className="px-3 py-1 bg-dark/50 rounded-full text-xs text-gray-400">Day {event.day}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 gradient-text">{event.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock size={16} className="mr-2 text-primary-400" /><span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin size={16} className="mr-2 text-accent-400" /><span>{event.venue}</span>
                  </div>
                  {event.prizePool && (
                    <div className="flex items-center text-sm text-gray-400">
                      <Trophy size={16} className="mr-2 text-yellow-400" /><span className="text-yellow-400 font-semibold">{event.prizePool}</span>
                    </div>
                  )}
                  {event.teamSize && (
                    <div className="flex items-center text-sm text-gray-400">
                      <Users size={16} className="mr-2 text-purple-400" /><span>{event.teamSize}</span>
                    </div>
                  )}
                </div>

                {event.category !== 'Ceremony' && event.category !== 'Pronite' && (
                  <button 
                    onClick={() => handleRegister(event.id, event.name)}
                    disabled={isRegisteredForEvent(event.id)}
                    className={`w-full py-2 rounded-lg font-semibold transition-all ${
                      isRegisteredForEvent(event.id)
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500'
                    }`}>
                    {isRegisteredForEvent(event.id) ? 'Already Registered' : 'Register Now'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-xl text-gray-400">No events found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
