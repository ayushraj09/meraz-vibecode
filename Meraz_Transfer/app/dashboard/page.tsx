'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, Ticket, Trophy, Loader2 } from 'lucide-react'

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

const allEvents: Event[] = [
  // DAY 1
  { id: 'opening', name: 'Opening Ceremony', category: 'Ceremony', description: 'Grand opening of MERAZ 6.0', day: 1, time: '9:00-10:00 AM', venue: 'LH 500' },
  { id: 'sbi-quiz', name: "SBI's Quiz", category: 'Quiz', description: 'General knowledge quiz', day: 1, time: '10:00-11:00 AM', venue: 'LH 500', prizePool: '₹15,000' },
  { id: 'bollywood-night', name: 'Bollywood Night Pronite', category: 'Pronite', description: 'Bollywood performances', day: 1, time: '8:00 PM-12:00 AM', venue: 'Hostel Circle' },
  
  // DAY 2 - Technical
  { id: 'robosoccer', name: 'RoboSoccer', category: 'Technical', description: 'Robot soccer competition', day: 2, time: 'Morning onwards', venue: 'LHC Foyer', prizePool: '₹25,000', teamSize: '2-4' },
  { id: 'line-bot', name: 'Line Following Bot', category: 'Technical', description: 'Line following robot', day: 2, time: 'Morning onwards', venue: 'LHC Foyer', prizePool: '₹20,000', teamSize: '2-4' },
  { id: 'maze-bot', name: 'Maze Solver Bot', category: 'Technical', description: 'Autonomous maze solving', day: 2, time: 'Morning onwards', venue: 'LHC Foyer', prizePool: '₹18,000', teamSize: '2-4' },
  { id: 'cybersprint', name: 'Cybersprint', category: 'Technical', description: 'Cybersecurity CTF', day: 2, time: '10:00 AM-2:00 PM', venue: 'CC-1 Lab', prizePool: '₹50,000', teamSize: '2-4' },
  { id: 'code-relay', name: 'Code Relay', category: 'Technical', description: 'Team coding challenge', day: 2, time: '2:30 PM-5:00 PM', venue: 'CC-2 Lab', prizePool: '₹30,000', teamSize: '3' },
  { id: 'ml-model', name: 'ML Model Competition', category: 'Technical', description: 'Machine learning challenge', day: 2, time: 'Full Day', venue: 'CC-3 Lab', prizePool: '₹40,000', teamSize: '1-3' },
  { id: 'web-dev', name: 'Web Development Sprint', category: 'Technical', description: '24-hour web dev hackathon', day: 2, time: '10:00 AM (Day 2) - 10:00 AM (Day 3)', venue: 'CC-4 Lab', prizePool: '₹60,000', teamSize: '2-4' },
  { id: 'app-dev', name: 'App Development Challenge', category: 'Technical', description: 'Mobile app development', day: 2, time: 'Full Day', venue: 'CC-1 Lab', prizePool: '₹45,000', teamSize: '2-3' },
  
  // DAY 2 - Cultural
  { id: 'battle-bands', name: 'Battle of Bands', category: 'Cultural', description: 'Live band competition', day: 2, time: '10:00 AM-1:00 PM', venue: 'Main Auditorium', prizePool: '₹35,000', teamSize: '4-8' },
  { id: 'solo-singing', name: 'Solo Singing', category: 'Cultural', description: 'Individual singing competition', day: 2, time: '2:00 PM-5:00 PM', venue: 'Music Room', prizePool: '₹15,000', teamSize: '1' },
  { id: 'group-dance', name: 'Group Dance', category: 'Cultural', description: 'Team dance performance', day: 2, time: '10:00 AM-1:00 PM', venue: 'Open Air Theatre', prizePool: '₹40,000', teamSize: '6-15' },
  { id: 'solo-dance', name: 'Solo Dance', category: 'Cultural', description: 'Individual dance', day: 2, time: '2:00 PM-5:00 PM', venue: 'Dance Studio', prizePool: '₹12,000', teamSize: '1' },
  { id: 'street-play', name: 'Street Play (Nukkad Natak)', category: 'Cultural', description: 'Street theatre', day: 2, time: '3:00 PM-6:00 PM', venue: 'College Ground', prizePool: '₹25,000', teamSize: '8-15' },
  { id: 'standup', name: 'Stand-up Comedy', category: 'Cultural', description: 'Comedy performances', day: 2, time: '6:00 PM-8:00 PM', venue: 'Seminar Hall', prizePool: '₹20,000', teamSize: '1' },
  { id: 'fashion-show', name: 'Fashion Show', category: 'Cultural', description: 'Fashion showcase', day: 2, time: '4:00 PM-7:00 PM', venue: 'Main Stage Area', prizePool: '₹50,000', teamSize: '10-20' },
  { id: 'dj-afron', name: 'DJ Afron Pronite', category: 'Pronite', description: 'Electronic music night', day: 2, time: '8:00 PM-12:00 AM', venue: 'Hostel Circle' },
  
  // DAY 3 - Technical & Cultural
  { id: 'hackathon-finale', name: 'Hackathon Finale', category: 'Technical', description: 'Final hackathon presentations', day: 3, time: '10:00 AM-2:00 PM', venue: 'Main Auditorium', prizePool: '₹1,00,000', teamSize: '3-5' },
  { id: 'ui-ux', name: 'UI/UX Design Challenge', category: 'Technical', description: 'Design competition', day: 3, time: '10:00 AM-3:00 PM', venue: 'Design Lab', prizePool: '₹30,000', teamSize: '1-2' },
  { id: 'debate', name: 'Debate Competition', category: 'Cultural', description: 'Parliamentary debate', day: 3, time: '10:00 AM-1:00 PM', venue: 'Seminar Hall 1', prizePool: '₹20,000', teamSize: '2' },
  { id: 'poetry', name: 'Poetry Slam', category: 'Cultural', description: 'Spoken word poetry', day: 3, time: '2:00 PM-4:00 PM', venue: 'Amphitheatre', prizePool: '₹15,000', teamSize: '1' },
  { id: 'drama', name: 'Drama Competition', category: 'Cultural', description: 'Stage play performance', day: 3, time: '11:00 AM-3:00 PM', venue: 'Main Auditorium', prizePool: '₹45,000', teamSize: '8-20' },
  { id: 'beat-boxing', name: 'Beat Boxing', category: 'Cultural', description: 'Vocal percussion', day: 3, time: '3:00 PM-5:00 PM', venue: 'Music Room', prizePool: '₹10,000', teamSize: '1' },
  { id: 'rap-battle', name: 'Rap Battle', category: 'Cultural', description: 'Freestyle rap competition', day: 3, time: '4:00 PM-6:00 PM', venue: 'Open Stage', prizePool: '₹18,000', teamSize: '1' },
  
  // DAY 3 - Sports
  { id: 'cricket', name: 'Cricket Tournament', category: 'Sports', description: 'Cricket championship', day: 3, time: 'Morning', venue: 'Cricket Ground', prizePool: '₹30,000', teamSize: '11' },
  { id: 'football', name: 'Football Tournament', category: 'Sports', description: 'Football matches', day: 3, time: 'Morning', venue: 'Football Ground', prizePool: '₹35,000', teamSize: '11' },
  { id: 'basketball', name: 'Basketball 3v3', category: 'Sports', description: '3-on-3 basketball', day: 3, time: 'Afternoon', venue: 'Basketball Court', prizePool: '₹20,000', teamSize: '3' },
  { id: 'volleyball', name: 'Volleyball', category: 'Sports', description: 'Volleyball tournament', day: 3, time: 'Afternoon', venue: 'Volleyball Court', prizePool: '₹25,000', teamSize: '6' },
  { id: 'badminton', name: 'Badminton (Singles)', category: 'Sports', description: 'Singles badminton', day: 3, time: 'Morning', venue: 'Indoor Stadium', prizePool: '₹12,000', teamSize: '1' },
  { id: 'table-tennis', name: 'Table Tennis', category: 'Sports', description: 'TT championship', day: 3, time: 'Afternoon', venue: 'TT Room', prizePool: '₹10,000', teamSize: '1' },
  { id: 'chess', name: 'Chess Tournament', category: 'Sports', description: 'Rapid chess', day: 3, time: 'Full Day', venue: 'Seminar Hall 2', prizePool: '₹15,000', teamSize: '1' },
  
  // DAY 3 - Quiz & Fintech
  { id: 'tech-quiz', name: 'Tech Quiz', category: 'Quiz', description: 'Technology quiz', day: 3, time: '10:00 AM-12:00 PM', venue: 'LH 301', prizePool: '₹18,000', teamSize: '2-3' },
  { id: 'biz-quiz', name: 'Business Quiz', category: 'Quiz', description: 'Business & economy quiz', day: 3, time: '2:00 PM-4:00 PM', venue: 'LH 302', prizePool: '₹20,000', teamSize: '2-3' },
  { id: 'nivesh', name: 'Nivesh Paheli', category: 'Fintech', description: 'Investment puzzle', day: 3, time: 'Full Day', venue: 'L105', prizePool: '₹20,000', teamSize: '2-3' },
  
  // DAY 3 - Finale
  { id: 'asees', name: 'Asees Kaur Live', category: 'Pronite', description: 'Bollywood Singer', day: 3, time: '8:00-9:30 PM', venue: 'Main Stage' },
  { id: 'dj-sparsh', name: 'DJ Sparsh - Grand Finale', category: 'Pronite', description: 'Final DJ night', day: 3, time: '9:30 PM-12:00 AM', venue: 'Main Stage' },
  { id: 'closing', name: 'Closing Ceremony', category: 'Ceremony', description: 'Prize distribution & finale', day: 3, time: '7:30-8:00 PM', venue: 'Main Stage' },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [user, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-400" size={48} />
      </div>
    )
  }

  const registeredEvents = allEvents.filter((event) =>
    user.registeredEvents.includes(event.id)
  )

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Welcome back, {user.name}! 👋
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark p-8 rounded-2xl mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User className="text-primary-400" size={28} />
              Profile Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block flex items-center gap-2">
                <Ticket size={16} />
                User ID
              </label>
              <p className="text-lg font-semibold">#{user.id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block flex items-center gap-2">
                <Trophy size={16} />
                Events Registered
              </label>
              <p className="text-lg font-semibold">{user.registeredEvents.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Registered Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="text-primary-400" size={28} />
            My Registered Events
          </h2>

          {registeredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400 mb-6">
                You haven't registered for any events yet
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/events')}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full font-semibold"
              >
                Explore Events
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              {registeredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass p-6 rounded-xl hover:glow transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{event.name}</h3>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-600/20 text-primary-400">
                          {event.category}
                        </span>
                      </div>
                      <div className="space-y-1 text-gray-400">
                        <p className="flex items-center gap-2">
                          <Calendar size={16} className="text-primary-400" />
                          Day {event.day} - {event.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <Trophy size={16} className="text-accent-400" />
                          {event.venue}
                        </p>
                        {event.prizePool && (
                          <p className="flex items-center gap-2 text-green-400 font-semibold">
                            💰 {event.prizePool}
                          </p>
                        )}
                        {event.teamSize && (
                          <p className="text-sm text-gray-500">
                            Team Size: {event.teamSize}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add More Events Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/events')}
                className="w-full py-4 glass rounded-xl font-semibold hover:glow transition-all"
              >
                Register for More Events
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/events')}
            className="glass-dark p-6 rounded-2xl text-center hover:glow transition-all"
          >
            <Calendar className="w-12 h-12 mx-auto mb-3 text-primary-400" />
            <h3 className="font-semibold mb-2">Browse Events</h3>
            <p className="text-sm text-gray-400">Explore all festival events</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/passes')}
            className="glass-dark p-6 rounded-2xl text-center hover:glow transition-all"
          >
            <Ticket className="w-12 h-12 mx-auto mb-3 text-accent-400" />
            <h3 className="font-semibold mb-2">Get Pass</h3>
            <p className="text-sm text-gray-400">Purchase festival passes</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="glass-dark p-6 rounded-2xl text-center hover:bg-red-600/20 transition-all"
          >
            <User className="w-12 h-12 mx-auto mb-3 text-red-400" />
            <h3 className="font-semibold mb-2">Logout</h3>
            <p className="text-sm text-gray-400">Sign out of your account</p>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
