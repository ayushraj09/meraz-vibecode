"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import siteData from "@/data/site.json"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#events", label: "Events" },
    { href: "#passes", label: "Passes" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-[var(--galaxy-purple)] group-hover:text-[var(--galaxy-cyan)] transition-colors" />
            <span className="text-xl md:text-2xl font-bold gradient-text">
              {siteData.festival.name}
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">
              {siteData.festival.year}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--galaxy-purple)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              className="border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white transition-all bg-transparent"
            >
              Login
            </Button>
            <Button className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white animate-pulse-glow">
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-border">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-[var(--galaxy-purple)] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white bg-transparent"
              >
                Login
              </Button>
              <Button className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white">
                Register Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
