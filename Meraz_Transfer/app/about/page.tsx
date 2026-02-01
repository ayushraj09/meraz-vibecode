'use client'

import { motion } from 'framer-motion'
import { Target, Users, Sparkles, Trophy, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            About Meraz
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Where Innovation Meets Celebration - IIT Bhilai's Premier Festival
          </p>
        </motion.div>

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark p-8 md:p-12 rounded-3xl mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">What is Meraz?</h2>
          <div className="space-y-4 text-lg text-gray-300">
            <p>
              Meraz is the annual cultural and technical festival of the Indian Institute of Technology Bhilai (IIT Bhilai). 
              It stands as a beacon of creativity, innovation, and celebration, bringing together brilliant minds from across 
              the nation to participate in a spectacular fusion of culture, technology, and sports.
            </p>
            <p>
              With over 50+ events spanning three days, Meraz 2026 promises to be an unforgettable experience filled with 
              competitive events, star-studded performances, technical workshops, and cultural showcases. From intense 
              coding marathons to electrifying dance battles, from cutting-edge robotics competitions to soul-stirring 
              musical performances - Meraz has something for everyone.
            </p>
            <p>
              This year's theme celebrates the harmonious blend of tradition and innovation, reflecting IIT Bhilai's 
              commitment to excellence in both technical prowess and cultural richness. Join us as we create memories, 
              forge friendships, and push the boundaries of what's possible.
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-400">
              To create India's most innovative and inclusive cultural-technical festival that celebrates 
              diversity, fosters creativity, and showcases the extraordinary talents of young minds while 
              building a vibrant community of future leaders.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-600 to-purple-600 flex items-center justify-center mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400">
              To provide a platform where passion meets opportunity, bringing together talented individuals 
              from diverse backgrounds to compete, collaborate, and celebrate in an atmosphere of excellence, 
              innovation, and cultural richness.
            </p>
          </motion.div>
        </div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Why Meraz?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: '5000+ Participants',
                description: 'Students from premier institutions across India',
                color: 'from-primary-600 to-primary-800',
              },
              {
                icon: Sparkles,
                title: '50+ Events',
                description: 'Diverse competitions and workshops',
                color: 'from-accent-600 to-accent-800',
              },
              {
                icon: Trophy,
                title: '₹10+ Lakhs',
                description: 'In prizes and scholarships',
                color: 'from-purple-600 to-pink-600',
              },
              {
                icon: Globe,
                title: 'National Reach',
                description: 'Participants from all over India',
                color: 'from-blue-600 to-cyan-600',
              },
              {
                icon: Target,
                title: 'Industry Connect',
                description: 'Workshops by industry experts',
                color: 'from-green-600 to-emerald-600',
              },
              {
                icon: Heart,
                title: 'Memorable Experience',
                description: 'Three days of non-stop excitement',
                color: 'from-red-600 to-pink-600',
              },
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark p-6 rounded-2xl text-center hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${highlight.color} mx-auto mb-4 flex items-center justify-center`}>
                  <highlight.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-400">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-dark p-8 md:p-12 rounded-3xl mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 gradient-text">Event Categories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary-400">Cultural Events</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Battle of Bands & Solo Singing</li>
                <li>• Dance Competitions (Solo, Duo, Group)</li>
                <li>• Drama & Street Play</li>
                <li>• Fashion Show</li>
                <li>• Stand-up Comedy & Open Mic</li>
                <li>• Fine Arts & Photography</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-accent-400">Technical Events</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• 24-Hour Hackathon</li>
                <li>• Robo Wars & Robotics</li>
                <li>• AI/ML Workshops</li>
                <li>• Coding Competitions</li>
                <li>• Web Development Challenge</li>
                <li>• Tech Talks by Industry Experts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Sports Events</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Cricket Tournament</li>
                <li>• Football Championship</li>
                <li>• Basketball League</li>
                <li>• Badminton Singles & Doubles</li>
                <li>• Table Tennis</li>
                <li>• Chess Competition</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">Literary Events</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Debate Competition</li>
                <li>• Quiz Championships</li>
                <li>• Creative Writing</li>
                <li>• Poetry Slam</li>
                <li>• Extempore Speaking</li>
                <li>• Case Study Competitions</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Past Success */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-dark p-8 md:p-12 rounded-3xl text-center"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">Our Legacy</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Since its inception, Meraz has grown exponentially, establishing itself as one of the premier 
            college festivals in Central India. Each year, we've raised the bar higher, attracting more 
            participants, bigger sponsors, and renowned celebrity performers.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">5+</div>
              <div className="text-gray-400">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">25K+</div>
              <div className="text-gray-400">Total Participants</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">200+</div>
              <div className="text-gray-400">Partner Colleges</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">50+</div>
              <div className="text-gray-400">Sponsoring Brands</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
