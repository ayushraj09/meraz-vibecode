'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Users, Sparkles, MapPin } from 'lucide-react'
import CountdownTimer from '@/components/CountdownTimer'
import AICarousel from '@/components/AICarousel'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-orange-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
              MERAZ 2026
            </h1>
            <p className="text-xl md:text-3xl mb-4 text-gray-300">
              IIT Bhilai's Annual Cultural & Technical Festival
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-400">
              Where Innovation Meets Celebration
            </p>

            <CountdownTimer targetDate={new Date('2026-03-15T00:00:00')} />

            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <Link href="/events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full font-semibold text-lg flex items-center gap-2 glow"
                >
                  Explore Events <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass rounded-full font-semibold text-lg flex items-center gap-2"
                >
                  Register Now <Sparkles size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Calendar, label: '3 Days', desc: 'Of Non-Stop Action' },
              { icon: Users, label: '5000+', desc: 'Participants Expected' },
              { icon: Sparkles, label: '50+', desc: 'Exciting Events' },
              { icon: MapPin, label: 'IIT Bhilai', desc: 'Campus Wide' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-dark p-8 rounded-2xl text-center hover:glow transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary-400" />
                <h3 className="text-3xl font-bold mb-2">{stat.label}</h3>
                <p className="text-gray-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Carousel Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Festival Highlights
            </h2>
            <p className="text-xl text-gray-400">
              Experience the magic through AI-generated moments
            </p>
          </motion.div>
          <AICarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            What Makes Meraz Special?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cultural Events',
                desc: 'Experience diverse performances from dance to drama, showcasing talent from across the nation.',
                color: 'from-primary-600 to-primary-800',
              },
              {
                title: 'Technical Workshops',
                desc: 'Learn from industry experts through hands-on workshops and cutting-edge technical sessions.',
                color: 'from-accent-600 to-accent-800',
              },
              {
                title: 'Star Nights',
                desc: 'Enjoy electrifying performances by renowned artists and celebrities under the stars.',
                color: 'from-purple-600 to-pink-600',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="relative group"
              >
                <div className="glass-dark p-8 rounded-2xl h-full hover:scale-105 transition-transform duration-300">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} mb-6 flex items-center justify-center`}>
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-dark p-12 rounded-3xl text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Join the Celebration?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Register now and be part of IIT Bhilai's biggest festival
            </p>
            <Link href="/passes">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full font-bold text-xl glow"
              >
                Get Your Pass Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}
