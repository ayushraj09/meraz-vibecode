"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Phone, Mail, Trophy, ChevronRight, X } from "lucide-react"
import eventsData from "@/data/events.json"

function EventModal({ event, onClose }) {
  if (!event) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glow-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Category badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--galaxy-purple)]/20 text-[var(--galaxy-purple)] rounded-full mb-4">
            {event.category}
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">
            {event.name}
          </h2>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {event.description}
          </p>

          {/* Event details */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="w-5 h-5 text-[var(--galaxy-cyan)]" />
              <div>
                <p className="text-foreground font-medium">{event.date}</p>
                <p className="text-sm">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-[var(--galaxy-pink)]" />
              <div>
                <p className="text-foreground font-medium">{event.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Trophy className="w-5 h-5 text-[var(--galaxy-gold)]" />
              <div>
                <p className="text-foreground font-medium">Prize Pool</p>
                <p className="text-sm">{event.prizePool}</p>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="border-t border-border pt-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Person</h3>
            <div className="flex flex-col gap-2">
              <p className="text-foreground font-medium">{event.contact.name}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{event.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{event.contact.email}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white">
              Register Now
            </Button>
            <Button
              variant="outline"
              className="border-[var(--galaxy-cyan)] text-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)] hover:text-white bg-transparent"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventCard({ event, onClick }) {
  const categoryColors = {
    Technical: "bg-[var(--galaxy-purple)]/20 text-[var(--galaxy-purple)]",
    Cultural: "bg-[var(--galaxy-pink)]/20 text-[var(--galaxy-pink)]",
    Gaming: "bg-[var(--galaxy-cyan)]/20 text-[var(--galaxy-cyan)]",
  }

  return (
    <div
      className="glass rounded-2xl p-6 glow-border group cursor-pointer hover:scale-[1.02] transition-all duration-300"
      onClick={() => onClick(event)}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            categoryColors[event.category] || categoryColors.Technical
          }`}
        >
          {event.category}
        </span>
        <Trophy className="w-5 h-5 text-[var(--galaxy-gold)]" />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-[var(--galaxy-purple)] transition-colors">
        {event.name}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{event.venue}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[var(--galaxy-gold)] font-semibold">
          {event.prizePool}
        </span>
        <span className="flex items-center gap-1 text-[var(--galaxy-purple)] group-hover:gap-2 transition-all">
          View Details
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  )
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState(null)

  const filteredEvents =
    activeCategory === "All"
      ? eventsData.events
      : eventsData.events.filter((event) => event.category === activeCategory)

  return (
    <section id="events" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-cyan)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-pink)] uppercase tracking-wider mb-4">
            Explore & Participate
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Stellar Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover over 50 events across technical, cultural, and gaming categories.
            There&apos;s something for everyone!
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {eventsData.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-[var(--galaxy-purple)] text-white"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={setSelectedEvent}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white bg-transparent"
          >
            View All Events
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  )
}
