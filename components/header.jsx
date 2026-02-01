"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import siteData from "@/data/site.json"

export default function Header({ onOpenAuth }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    sessionStorage.removeItem("pendingRegistration")
    setUser(null)
    setIsMenuOpen(false)
    router.push("/")
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/pronites", label: "Pronites" },
    { href: "/schedule", label: "Schedule" },
    { href: "/passes", label: "Passes" },
    { href: "/testimonials", label: "Testimonials" },
  ]

  const handleAuthClick = (tab) => {
    setIsMenuOpen(false)
    if (onOpenAuth) {
      onOpenAuth(tab)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/meraz-logo.png" 
              alt="Meraz Logo" 
              width={40} 
              height={40} 
              className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110"
            />
            <span className="text-xl md:text-2xl font-bold gradient-text">
              {siteData.festival.name}
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">
              {siteData.festival.year}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--galaxy-purple)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white transition-all bg-transparent"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all bg-transparent"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white transition-all bg-transparent"
                  onClick={() => handleAuthClick("login")}
                >
                  Login
                </Button>
                <Button 
                  className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white animate-pulse-glow"
                  onClick={() => handleAuthClick("register")}
                >
                  Register Now
                </Button>
              </>
            )}
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
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-[var(--galaxy-purple)] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white bg-transparent"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white bg-transparent"
                    onClick={() => handleAuthClick("login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white"
                    onClick={() => handleAuthClick("register")}
                  >
                    Register Now
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
