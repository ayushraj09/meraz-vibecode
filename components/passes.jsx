"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Star, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import passesData from "@/data/passes.json"

function PassCard({ pass, onGetPass, showPurchaseButton = false }) {
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
        {showPurchaseButton ? `Purchase ${pass.name}` : `Get ${pass.name}`}
      </Button>
    </div>
  )
}

const initiatePayment = async (pass, registrationData, onComplete, toast, router) => {
  
  try {
    if (!pass || !pass.price) {
      toast({
        title: "Error",
        description: "Please select a valid pass",
        variant: "destructive",
      })
      return
    }

    // Load Razorpay script if not already loaded
    if (typeof window.Razorpay === 'undefined') {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      document.body.appendChild(script)
      
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
      })
    }
    
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    
    const options = {
      key: razorpayKey || "rzp_test_1DP5mmOlF5G5ag",
      amount: pass.price * 100, // Convert to paise
      currency: "INR",
      name: "Festival Registration",
      description: `${pass.name} - ${pass.description}`,
      image: "/logo.png",
      handler: async function (response) {
        console.log("Payment Success:", response)
        
        // Complete user registration after successful payment
        const newUser = {
          id: Date.now(),
          ...registrationData,
          passType: pass.name,
          passPrice: pass.price,
          paymentId: response.razorpay_payment_id,
          registeredAt: new Date().toISOString(),
          registeredEvents: []
        }
        
        localStorage.setItem("user", JSON.stringify(newUser))
        
        toast({
          title: "Payment Successful!",
          description: `Welcome ${newUser.name}! Your registration is complete.`,
        })
        
        // Clear pending registration and callback
        if (onComplete) onComplete()
        
        setTimeout(() => {
          router.push("/dashboard")
          window.location.reload()
        }, 1000)
      },
      prefill: {
        name: registrationData.name,
        email: registrationData.email,
        contact: registrationData.phone,
      },
      theme: {
        color: "#8b5cf6",
      },
      modal: {
        ondismiss: function() {
          toast({
            title: "Payment Cancelled",
            description: "Payment was cancelled. Please try again to complete your registration.",
            variant: "destructive",
          })
        },
        escape: false,
        backdropclose: false
      }
    }

    const rzp = new window.Razorpay(options)
    
    rzp.on('payment.failed', function (response) {
      console.error("Payment Failed:", response)
      toast({
        title: "Payment Failed",
        description: "Payment could not be processed. Please try again.",
        variant: "destructive",
      })
    })
    
    rzp.open()
  } catch (error) {
    console.error("Payment Error:", error)
    toast({
      title: "Payment Error",
      description: error.message || "Failed to initiate payment. Please try again.",
      variant: "destructive",
    })
  }
}

export default function Passes({ onRegisterClick, pendingRegistration, onRegistrationComplete }) {
  const { toast } = useToast()
  const router = useRouter()
  
  const handlePassPurchase = (pass) => {
    if (pendingRegistration) {
      // User came from registration, initiate payment
      initiatePayment(pass, pendingRegistration, onRegistrationComplete, toast, router)
    } else {
      // Normal flow - prompt to register first
      console.log("Selected pass:", pass)
      if (onRegisterClick) {
        onRegisterClick()
      }
    }
  }

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
            {pendingRegistration 
              ? `Welcome ${pendingRegistration.name}! Select your pass to complete registration and unlock your cosmic journey.`
              : "Choose the perfect pass for your cosmic journey. Early bird discounts available for a limited time!"
            }
          </p>
        </div>

        {/* Passes grid */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {passesData.passes.map((pass) => (
            <PassCard 
              key={pass.id} 
              pass={pass} 
              onGetPass={handlePassPurchase}
              showPurchaseButton={!!pendingRegistration}
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
          {pendingRegistration && (
            <p className="text-[var(--galaxy-gold)] text-sm mt-4 font-medium">
              Complete your payment to activate your festival account and access the dashboard.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
