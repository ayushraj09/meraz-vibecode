"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Calendar, Trophy, CreditCard, MessageSquare, Music, Clock } from "lucide-react"
import Link from "next/link"
import siteData from "@/data/site.json"

export default function QuickLinks() {
  const sections = [
    {
      icon: Sparkles,
      title: "About",
      description: "Discover what makes our festival unique",
      href: "/about",
      color: "var(--galaxy-purple)",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Explore exciting competitions and shows",
      href: "/events",
      color: "var(--galaxy-cyan)",
    },
    {
      icon: Music,
      title: "Pronites",
      description: "Star-studded nights with top performers",
      href: "/pronites",
      color: "var(--galaxy-pink)",
    },
    {
      icon: Clock,
      title: "Schedule",
      description: "View complete festival timeline",
      href: "/schedule",
      color: "var(--galaxy-gold)",
    },
    {
      icon: CreditCard,
      title: "Passes",
      description: "Get your festival passes today",
      href: "/passes",
      color: "var(--galaxy-purple)",
    },
    {
      icon: MessageSquare,
      title: "Testimonials",
      description: "Hear from past participants",
      href: "/testimonials",
      color: "var(--galaxy-cyan)",
    },
  ]

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-purple)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Explore {siteData.festival.name}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate through our cosmic celebration of technology, culture, and innovation
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group glass rounded-2xl p-6 glow-border hover:scale-105 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ backgroundColor: `${section.color}20` }}
                >
                  <Icon
                    className="w-6 h-6 transition-all duration-300"
                    style={{ color: section.color }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:gradient-text transition-all">
                  {section.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {section.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: section.color }}>
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 glass rounded-2xl p-8 glow-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">50+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">5000+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">₹15L+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Prize Pool</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">3</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Days</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white px-8 py-6 text-lg animate-pulse-glow"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Register for Events
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--galaxy-cyan)] text-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)] hover:text-white px-8 py-6 text-lg bg-transparent"
              asChild
            >
              <Link href="/passes">
                View Passes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
