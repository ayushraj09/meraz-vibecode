"use client"

import { Music, Users, Calendar, MapPin, Instagram, Disc3, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import pronitesData from "@/data/pronites.json"

export default function Pronites() {
  const getCategoryIcon = (type) => {
    switch (type.toLowerCase()) {
      case "band":
        return Users
      case "singer":
        return Music
      case "dj":
      case "dj/producer":
      case "dj duo":
        return Disc3
      default:
        return Music
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-purple)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-cyan)] uppercase tracking-wider mb-4">
            {pronitesData.subtitle}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{pronitesData.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {pronitesData.description}
          </p>
        </div>

        {/* Venue & Timing Info */}
        <div className="glass rounded-2xl p-6 mb-12 glow-border max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--galaxy-purple)]" />
              <span>{pronitesData.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--galaxy-cyan)]" />
              <span>{pronitesData.timing}</span>
            </div>
          </div>
        </div>

        {/* Pronites by Day */}
        <div className="space-y-16">
          {pronitesData.nights.map((night, nightIndex) => (
            <div key={night.day} className="space-y-8">
              {/* Day Header */}
              <div className="text-center">
                <div className="inline-flex flex-col items-center glass rounded-3xl px-8 py-6 glow-border mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl sm:text-4xl font-bold gradient-text">{night.day}</h2>
                    <div className="px-4 py-1.5 rounded-full bg-[var(--galaxy-purple)]/30 border border-[var(--galaxy-purple)]/50">
                      <Music className="w-5 h-5 text-[var(--galaxy-purple)] inline mr-2" />
                      <span className="text-sm font-medium text-foreground">{night.theme}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{night.date}</p>
                </div>
              </div>

              {/* Performers Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {night.performers.map((performer, perfIndex) => {
                  const Icon = getCategoryIcon(performer.type)
                  
                  return (
                    <div
                      key={perfIndex}
                      className="relative group"
                    >
                      {/* Card */}
                      <div className="relative glass rounded-3xl overflow-hidden glow-border group-hover:scale-105 transition-all duration-300 h-full">
                        {/* Sticker-style Image Container */}
                        <div className="relative p-6 pb-4">
                          <div className="relative">
                            {/* Decorative border frame */}
                            <div className="absolute -inset-2 bg-gradient-to-br from-[var(--galaxy-purple)] via-[var(--galaxy-cyan)] to-[var(--galaxy-pink)] rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
                            
                            {/* Inner border */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-[var(--galaxy-purple)] via-[var(--galaxy-cyan)] to-[var(--galaxy-pink)] rounded-2xl" />
                            
                            {/* Image with sticker effect */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-[var(--galaxy-dark)]">
                              <img
                                src={performer.image}
                                alt={performer.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              
                              {/* Type badge on image */}
                              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full glass backdrop-blur-md border border-white/20">
                                <Icon className="w-4 h-4 text-white inline mr-1.5" />
                                <span className="text-xs font-semibold text-white">{performer.type}</span>
                              </div>

                              {/* Time badge */}
                              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[var(--galaxy-purple)]/90 backdrop-blur-md border border-[var(--galaxy-purple)]">
                                <Clock className="w-3.5 h-3.5 text-white inline mr-1.5" />
                                <span className="text-xs font-semibold text-white">{performer.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 pb-6 space-y-4">
                          {/* Name & Genre */}
                          <div className="text-center">
                            <h3 className="text-2xl font-bold gradient-text mb-1">
                              {performer.name}
                            </h3>
                            <p className="text-sm text-[var(--galaxy-cyan)] font-medium">
                              {performer.genre}
                            </p>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed text-center">
                            {performer.description}
                          </p>

                          {/* Social Links */}
                          <div className="flex gap-2">
                            {performer.social.instagram && (
                              <a
                                href={`https://instagram.com/${performer.social.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl glass border border-[var(--galaxy-pink)]/30 hover:border-[var(--galaxy-pink)] hover:bg-[var(--galaxy-pink)]/10 transition-all group/link"
                              >
                                <Instagram className="w-4 h-4 text-[var(--galaxy-pink)] group-hover/link:scale-110 transition-transform" />
                                <span className="text-xs font-medium text-muted-foreground group-hover/link:text-foreground">
                                  Instagram
                                </span>
                              </a>
                            )}
                            {performer.social.spotify && (
                              <a
                                href={`https://open.spotify.com/search/${encodeURIComponent(performer.social.spotify)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl glass border border-[var(--galaxy-cyan)]/30 hover:border-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)]/10 transition-all group/link"
                              >
                                <Music className="w-4 h-4 text-[var(--galaxy-cyan)] group-hover/link:scale-110 transition-transform" />
                                <span className="text-xs font-medium text-muted-foreground group-hover/link:text-foreground">
                                  Spotify
                                </span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[var(--galaxy-purple)]/30 rounded-tl-3xl" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[var(--galaxy-cyan)]/30 rounded-br-3xl" />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Separator */}
              {nightIndex < pronitesData.nights.length - 1 && (
                <div className="flex items-center justify-center pt-8">
                  <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-[var(--galaxy-purple)] to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center glass rounded-2xl p-8 sm:p-12 glow-border-cyan">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">
            Don&apos;t Miss These Epic Nights!
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Grab your festival pass now and experience three unforgettable nights of music, energy, and celebration with 9 amazing artists.
          </p>
          <Button
            size="lg"
            className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white px-8 py-6 text-lg animate-pulse-glow"
          >
            Get Your Pass
          </Button>
        </div>
      </div>
    </section>
  )
}
