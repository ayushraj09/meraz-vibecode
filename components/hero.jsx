"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Rocket, Stars } from "lucide-react"
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
    <div className="flex gap-3 sm:gap-4 justify-center">
      {timeUnits.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center glass rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] glow-border"
        >
          <span className="text-2xl sm:text-4xl font-bold gradient-text">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
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
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 animate-float">
          <Stars className="w-4 h-4 text-[var(--galaxy-gold)]" />
          <span className="text-sm text-muted-foreground">
            IIT Bhilai&apos;s Annual Festival
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight">
          <span className="gradient-text">{siteData.festival.name}</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
          {siteData.festival.tagline}
        </p>

        {/* Date and Location */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--galaxy-purple)]" />
            <span>{siteData.festival.dates}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--galaxy-cyan)]" />
            <span>{siteData.festival.location}</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            Countdown to Launch
          </p>
          <CountdownTimer targetDate={siteData.festival.targetDate} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white px-8 py-6 text-lg animate-pulse-glow"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Register Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[var(--galaxy-cyan)] text-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)] hover:text-white px-8 py-6 text-lg bg-transparent"
          >
            Explore Events
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
