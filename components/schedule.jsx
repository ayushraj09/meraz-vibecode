"use client"

import { useState } from "react"
import { Clock, MapPin, Sparkles, Code, Music, Trophy, Lightbulb, Palette, MessageSquare, Gamepad2 } from "lucide-react"
import scheduleData from "@/data/schedule.json"

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(0)

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "technical":
        return {
          bg: "bg-[var(--galaxy-purple)]/20",
          border: "border-[var(--galaxy-purple)]/50",
          text: "text-[var(--galaxy-purple)]",
          icon: Code,
        }
      case "cultural":
        return {
          bg: "bg-[var(--galaxy-cyan)]/20",
          border: "border-[var(--galaxy-cyan)]/50",
          text: "text-[var(--galaxy-cyan)]",
          icon: Music,
        }
      case "pronite":
        return {
          bg: "bg-[var(--galaxy-pink)]/20",
          border: "border-[var(--galaxy-pink)]/50",
          text: "text-[var(--galaxy-pink)]",
          icon: Sparkles,
        }
      case "workshop":
        return {
          bg: "bg-[var(--galaxy-gold)]/20",
          border: "border-[var(--galaxy-gold)]/50",
          text: "text-[var(--galaxy-gold)]",
          icon: Lightbulb,
        }
      case "fine arts":
        return {
          bg: "bg-purple-500/20",
          border: "border-purple-500/50",
          text: "text-purple-400",
          icon: Palette,
        }
      case "literary":
        return {
          bg: "bg-blue-500/20",
          border: "border-blue-500/50",
          text: "text-blue-400",
          icon: MessageSquare,
        }
      case "gaming":
        return {
          bg: "bg-green-500/20",
          border: "border-green-500/50",
          text: "text-green-400",
          icon: Gamepad2,
        }
      case "talk":
        return {
          bg: "bg-orange-500/20",
          border: "border-orange-500/50",
          text: "text-orange-400",
          icon: MessageSquare,
        }
      default:
        return {
          bg: "bg-gray-500/20",
          border: "border-gray-500/50",
          text: "text-gray-400",
          icon: Clock,
        }
    }
  }

  const currentDay = scheduleData.days[selectedDay]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-purple)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-cyan)] uppercase tracking-wider mb-4">
            {scheduleData.subtitle}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{scheduleData.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {scheduleData.description}
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {scheduleData.days.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(index)}
              className={`glass rounded-2xl px-6 sm:px-8 py-4 transition-all duration-300 ${
                selectedDay === index
                  ? "glow-border scale-105"
                  : "border border-border hover:border-[var(--galaxy-purple)]/50"
              }`}
            >
              <div className="text-sm text-muted-foreground mb-1">{day.dayOfWeek}</div>
              <div className="text-xl font-bold gradient-text">{day.day}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {new Date(day.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </button>
          ))}
        </div>

        {/* Schedule Timeline */}
        <div className="glass rounded-3xl p-4 sm:p-6 lg:p-8 glow-border">
          {/* Day Header */}
          <div className="mb-8 pb-6 border-b border-border">
            <h2 className="text-3xl font-bold gradient-text mb-2">{currentDay.day}</h2>
            <p className="text-muted-foreground">
              {currentDay.dayOfWeek}, {currentDay.date}
            </p>
          </div>

          {/* Multi-Track Timeline */}
          <div className="space-y-6">
            {currentDay.timeSlots.map((slot, slotIndex) => (
              <div key={slotIndex} className="relative">
                {/* Time Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-24 sm:w-28">
                    <div className="glass rounded-xl px-3 py-2 border border-[var(--galaxy-purple)]/30">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[var(--galaxy-purple)]" />
                        <span className="text-sm sm:text-base font-bold text-foreground">{slot.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[var(--galaxy-purple)]/50 to-transparent" />
                </div>

                {/* Events Grid */}
                <div className="ml-0 sm:ml-32 grid gap-3">
                  {slot.events.length === 1 ? (
                    // Single event - full width
                    <div className="w-full">
                      {renderEvent(slot.events[0], getCategoryColor)}
                    </div>
                  ) : (
                    // Multiple simultaneous events - responsive grid
                    <div className={`grid gap-3 ${
                      slot.events.length === 2 ? 'md:grid-cols-2' : 
                      slot.events.length === 3 ? 'md:grid-cols-3' : 
                      'md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {slot.events.map((event, eventIndex) => (
                        <div key={eventIndex}>
                          {renderEvent(event, getCategoryColor)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 glass rounded-2xl p-6 glow-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Event Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              { name: "Technical", category: "technical" },
              { name: "Cultural", category: "cultural" },
              { name: "Pronite", category: "pronite" },
              { name: "Workshop", category: "workshop" },
              { name: "Fine Arts", category: "fine arts" },
              { name: "Literary", category: "literary" },
              { name: "Gaming", category: "gaming" },
              { name: "General", category: "general" },
            ].map((item) => {
              const style = getCategoryColor(item.category)
              const Icon = style.icon
              return (
                <div
                  key={item.category}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${style.bg} ${style.border} border`}
                >
                  <Icon className={`w-4 h-4 ${style.text}`} />
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Download/Print Options */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to save this schedule? Download or print for easy reference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 rounded-xl glass border border-[var(--galaxy-purple)]/50 hover:border-[var(--galaxy-purple)] text-foreground font-medium transition-all hover:scale-105">
              Download PDF
            </button>
            <button className="px-6 py-3 rounded-xl glass border border-[var(--galaxy-cyan)]/50 hover:border-[var(--galaxy-cyan)] text-foreground font-medium transition-all hover:scale-105">
              Print Schedule
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function to render individual event cards
function renderEvent(event, getCategoryColor) {
  const categoryStyle = getCategoryColor(event.category)
  const Icon = categoryStyle.icon

  return (
    <div
      className={`relative group h-full ${
        event.featured
          ? "glass rounded-xl p-4 glow-border-pink hover:scale-[1.02] transition-all duration-300"
          : "glass rounded-xl p-4 border border-border hover:border-[var(--galaxy-purple)]/50 transition-all"
      }`}
    >
      {/* Category Badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${categoryStyle.bg} ${categoryStyle.border} border text-xs font-medium ${categoryStyle.text} uppercase tracking-wider`}
        >
          <Icon className="w-3.5 h-3.5" />
          {event.category}
        </span>
        {event.featured && (
          <span className="px-2 py-1 rounded-full bg-[var(--galaxy-pink)]/90 text-white text-xs font-bold uppercase">
            Pronite
          </span>
        )}
      </div>

      {/* Event Title */}
      <h4 className={`text-base sm:text-lg font-semibold mb-2 ${event.featured ? "gradient-text" : "text-foreground"}`}>
        {event.title}
      </h4>

      {/* Artists (for pronites) */}
      {event.artists && (
        <p className="text-xs text-[var(--galaxy-cyan)] mb-2 font-medium">
          {event.artists}
        </p>
      )}

      {/* Venue and Duration */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{event.duration}</span>
          {event.endTime && (
            <span className="text-xs">→ {event.endTime}</span>
          )}
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${categoryStyle.bg} opacity-0 group-hover:opacity-100 transition-opacity rounded-l-xl`} />
    </div>
  )
}
