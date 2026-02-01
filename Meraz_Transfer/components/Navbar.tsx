'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Calendar, Info, Ticket, User, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/about', label: 'About', icon: Info },
    { href: '/passes', label: 'Passes', icon: Ticket },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text cursor-pointer"
            >
              MERAZ 2026
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </motion.div>
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-full"
                  >
                    <User size={18} />
                    <span>{user.name}</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 rounded-full hover:bg-red-600/30"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full font-semibold"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-300 hover:text-white py-2 cursor-pointer"
                  >
                    <link.icon size={20} />
                    <span>{link.label}</span>
                  </div>
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link href="/dashboard">
                    <div
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-gray-300 hover:text-white py-2 cursor-pointer"
                    >
                      <User size={20} />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white py-2 w-full text-left"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link href="/login">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full font-semibold mt-4"
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
