"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Rocket, Stars } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import siteData from "@/data/site.json"

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
      {timeUnits.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center glass rounded-lg p-2.5 sm:p-3 min-w-[60px] sm:min-w-[75px] glow-border"
        >
          <span className="text-xl sm:text-3xl font-bold gradient-text">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Hero({ onRegisterClick }) {
  const [floatingStars, setFloatingStars] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Generate stars only on client side to avoid hydration mismatch
    const stars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }))
    setFloatingStars(stars)
    setMounted(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0 stars-bg opacity-50" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--galaxy-purple)]/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--galaxy-cyan)]/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[var(--galaxy-pink)]/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: "4s" }} />

      {/* Floating stars */}
      {mounted && floatingStars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-5 py-8 lg:py-0">
            {/* Badge Above Logo */}
            <div className="inline-flex items-center gap-2 glass px-3.5 py-1.5 rounded-full">
              <Stars className="w-3.5 h-3.5 text-[var(--galaxy-gold)]" />
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                IIT Bhilai&apos;s Annual Festival
              </span>
            </div>

            {/* Logo and Title Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 justify-center lg:justify-start">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--galaxy-purple)]/30 via-[var(--galaxy-cyan)]/20 to-[var(--galaxy-gold)]/30 rounded-full blur-2xl group-hover:blur-3xl transition-all" />
                  <Image 
                    src="/meraz-logo.png" 
                    alt="Meraz Logo" 
                    width={160} 
                    height={160} 
                    className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 drop-shadow-2xl transition-transform group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Title and Subtitle */}
              <div className="flex flex-col justify-center space-y-2 text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-none">
                  <span className="gradient-text">{siteData.festival.name}</span>
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-[var(--galaxy-gold)] font-semibold uppercase tracking-wide leading-tight max-w-xs">
                  {siteData.festival.subtitle}
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl lg:text-2xl font-light italic max-w-xl mx-auto lg:mx-0 text-white/90 font-serif tracking-wide">
              {siteData.festival.tagline}
            </p>

            {/* Date and Location */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4">
              <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-lg">
                <Calendar className="w-4 h-4 text-[var(--galaxy-purple)]" />
                <span className="text-xs sm:text-sm font-medium">{siteData.festival.dates}</span>
              </div>
              <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4 text-[var(--galaxy-cyan)]" />
                <span className="text-xs sm:text-sm font-medium">{siteData.festival.location}</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                Event Starts In
              </p>
              <CountdownTimer targetDate={siteData.festival.targetDate} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-3">
              <Button
                size="lg"
                className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white px-6 py-5 text-sm sm:text-base font-semibold shadow-lg shadow-[var(--galaxy-purple)]/50 hover:shadow-xl hover:shadow-[var(--galaxy-purple)]/60 transition-all duration-300 animate-pulse-glow"
                onClick={onRegisterClick}
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Register Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[var(--galaxy-cyan)] text-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)] hover:text-white px-6 py-5 text-sm sm:text-base font-semibold bg-transparent backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <Link href="/events">
                  Explore Events
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-md xl:max-w-lg animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--galaxy-purple)]/30 via-[var(--galaxy-cyan)]/20 to-[var(--galaxy-pink)]/30 rounded-full blur-3xl" />
              <Image
                src="/mascot.png"
                alt="Meraz Mascot"
                width={600}
                height={600}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
