"use client"

import { Sparkles, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, Linkedin } from "lucide-react"
import Link from "next/link"
import siteData from "@/data/site.json"

export default function Footer() {
  const socialIcons = {
    instagram: Instagram,
    twitter: Twitter,
    facebook: Facebook,
    youtube: Youtube,
    linkedin: Linkedin,
  }

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Pronites", href: "/pronites" },
    { label: "Schedule", href: "/schedule" },
    { label: "Passes", href: "/passes" },
  ]

  return (
    <footer id="contact" className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-purple)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[var(--galaxy-purple)]" />
              <span className="text-2xl font-bold gradient-text">
                {siteData.festival.name}
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {siteData.festival.tagline}
            </p>
            <p className="text-sm text-muted-foreground">
              {siteData.festival.dates}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-[var(--galaxy-purple)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-[var(--galaxy-purple)]" />
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="hover:text-[var(--galaxy-purple)] transition-colors"
                >
                  {siteData.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-[var(--galaxy-cyan)]" />
                <span>{siteData.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-[var(--galaxy-pink)] mt-1" />
                <span>{siteData.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {Object.entries(siteData.socialLinks).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-[var(--galaxy-purple)] hover:scale-110 transition-all"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Meraz, IIT Bhilai. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-[var(--galaxy-purple)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--galaxy-purple)] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
