"use client"

import { Button } from "@/components/ui/button"
import { Check, Star, Sparkles } from "lucide-react"
import passesData from "@/data/passes.json"

function PassCard({ pass, onGetPass }) {
  const colorClasses = {
    cyan: {
      border: "glow-border-cyan",
      badge: "bg-[var(--galaxy-cyan)]/20 text-[var(--galaxy-cyan)]",
      button: "bg-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)]/80",
      icon: "text-[var(--galaxy-cyan)]",
    },
    purple: {
      border: "glow-border",
      badge: "bg-[var(--galaxy-purple)]/20 text-[var(--galaxy-purple)]",
      button: "bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80",
      icon: "text-[var(--galaxy-purple)]",
    },
    gold: {
      border: "glow-border-gold",
      badge: "bg-[var(--galaxy-gold)]/20 text-[var(--galaxy-gold)]",
      button: "bg-[var(--galaxy-gold)] hover:bg-[var(--galaxy-gold)]/80",
      icon: "text-[var(--galaxy-gold)]",
    },
  }

  const colors = colorClasses[pass.color] || colorClasses.purple

  return (
    <div
      className={`relative glass rounded-2xl p-8 ${colors.border} ${
        pass.popular ? "scale-105 z-10" : ""
      } hover:scale-[1.02] transition-all duration-300`}
    >
      {pass.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-4 py-1 bg-[var(--galaxy-purple)] text-white text-sm font-medium rounded-full">
            <Star className="w-4 h-4" />
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <Sparkles className={`w-10 h-10 mx-auto mb-4 ${colors.icon}`} />
        <h3 className="text-2xl font-bold text-foreground mb-2">{pass.name}</h3>
        <p className="text-muted-foreground text-sm">{pass.description}</p>
      </div>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2">
          <span className="text-muted-foreground line-through text-lg">
            ₹{pass.originalPrice}
          </span>
          <span className={`text-4xl font-bold ${colors.icon}`}>
            ₹{pass.price}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Early Bird Offer</p>
      </div>

      <ul className="space-y-3 mb-8">
        {pass.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`w-5 h-5 shrink-0 ${colors.icon}`} />
            <span className="text-muted-foreground text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full ${colors.button} text-white font-semibold`}
        size="lg"
        onClick={() => onGetPass(pass)}
      >
        Get {pass.name}
      </Button>
    </div>
  )
}

export default function Passes({ onRegisterClick }) {
  return (
    <section id="passes" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-gold)] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-gold)] uppercase tracking-wider mb-4">
            Get Your Access
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Festival Passes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect pass for your cosmic journey. Early bird discounts available for a limited time!
          </p>
        </div>

        {/* Passes grid */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {passesData.passes.map((pass) => (
            <PassCard 
              key={pass.id} 
              pass={pass} 
              onGetPass={(selectedPass) => {
                console.log("Selected pass:", selectedPass)
                if (onRegisterClick) {
                  onRegisterClick()
                }
              }}
            />
          ))}
        </div>

        {/* Additional info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            All passes include food court access and festival merchandise discounts.
            <br />
            Accommodation assistance available for outstation participants.
          </p>
        </div>
      </div>
    </section>
  )
}
