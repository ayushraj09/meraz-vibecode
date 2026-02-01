"use client"

import { Sparkles, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Passes", href: "#passes" },
    { label: "Schedule", href: "#schedule" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "FAQs", href: "#faqs" },
  ]

  return (
    <footer id="contact" className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-purple)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter CTA */}
        <div className="glass rounded-2xl p-8 sm:p-12 mb-16 glow-border text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">
            Stay in the Loop
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Subscribe to get updates on events, artists, and exclusive early bird offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--galaxy-card)] border border-border focus:border-[var(--galaxy-purple)] focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <Button className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white px-8">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Footer content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[var(--galaxy-purple)]" />
              <span className="text-2xl font-bold gradient-text">
                {siteData.festival.name}
              </span>
            </a>
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
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-[var(--galaxy-purple)] transition-colors"
                  >
                    {link.label}
                  </a>
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
