"use client"

import { Quote, User } from "lucide-react"
import testimonialsData from "@/data/testimonials.json"

function TestimonialCard({ testimonial }) {
  return (
    <div className="glass rounded-2xl p-6 glow-border group hover:scale-[1.02] transition-all duration-300">
      <Quote className="w-8 h-8 text-[var(--galaxy-purple)]/40 mb-4" />
      <p className="text-muted-foreground leading-relaxed mb-6 italic">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[var(--galaxy-purple)]/20 flex items-center justify-center">
          <User className="w-6 h-6 text-[var(--galaxy-purple)]" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.college} • {testimonial.year}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-pink)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-cyan)] uppercase tracking-wider mb-4">
            What People Say
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Cosmic Experiences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from participants who have been part of the Meraz journey.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
