'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  const quickLinks = [
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/passes', label: 'Passes' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="glass-dark border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">MERAZ 2026</h3>
            <p className="text-gray-400 mb-4">
              IIT Bhilai's annual cultural and technical festival celebrating innovation, creativity, and talent.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="flex-shrink-0 mt-1" />
                <span>IIT Bhilai, Sejbahar, Raipur, Chhattisgarh - 492015</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} />
                <a href="mailto:meraz@iitbhilai.ac.in" className="hover:text-white">
                  meraz@iitbhilai.ac.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} />
                <span>+91 12345 67890</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get the latest updates about Meraz 2026
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg glass text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg font-semibold"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>© {currentYear} Meraz - IIT Bhilai. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Designed with ❤️ for VibeCoding Hackathon
          </p>
        </div>
      </div>
    </footer>
  )
}
