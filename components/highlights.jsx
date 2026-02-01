"use client"

import { Zap, Music, Code, Users, Award, Rocket } from "lucide-react"

export default function Highlights({ onRegisterClick }) {
  const features = [
    {
      icon: Code,
      title: "Technical Events",
      description: "Hackathons, coding competitions, robotics challenges, and AI workshops",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Music,
      title: "Cultural Shows",
      description: "Music concerts, dance performances, fashion shows, and art exhibitions",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Users,
      title: "Networking",
      description: "Connect with industry leaders, innovators, and fellow enthusiasts",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Award,
      title: "Competitions",
      description: "Win amazing prizes and recognition across 50+ competitive events",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Zap,
      title: "Workshops",
      description: "Learn from experts through hands-on sessions and masterclasses",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Showcase your projects and ideas on a national platform",
      gradient: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-cyan)] uppercase tracking-wider mb-4">
            What to Expect
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">An Unforgettable Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in three days of innovation, creativity, and celebration
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="glass rounded-2xl p-8 glow-border group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-20 absolute group-hover:scale-110 transition-transform`} />
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center relative`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:gradient-text transition-all">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 sm:p-12 glow-border-cyan">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">
              Ready to Join the Cosmic Celebration?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don&apos;t miss out on the biggest techno-cultural festival of the year. Register now and be part of something extraordinary!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white px-8 py-4 rounded-xl font-semibold transition-all animate-pulse-glow"
                onClick={onRegisterClick}
              >
                Register Now
              </button>
              <button className="border-2 border-[var(--galaxy-cyan)] text-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all bg-transparent">
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
