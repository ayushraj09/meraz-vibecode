"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Passes from "@/components/passes"
import Footer from "@/components/footer"
import StarField from "@/components/star-field"

export default function PassesPage() {
  const [hasPendingRegistration, setHasPendingRegistration] = useState(false)
  const [pendingUserData, setPendingUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const existingUser = localStorage.getItem("user")
    if (existingUser) {
      setIsLoggedIn(true)
      setIsLoading(false)
      return
    }

    // Check if user came from registration
    const pendingReg = sessionStorage.getItem("pendingRegistration")
    if (pendingReg) {
      setHasPendingRegistration(true)
      setPendingUserData(JSON.parse(pendingReg))
    }
    setIsLoading(false)
  }, [])

  const handleRegistrationComplete = () => {
    // Clear pending registration data after successful purchase
    sessionStorage.removeItem("pendingRegistration")
    setHasPendingRegistration(false)
    setPendingUserData(null)
  }

  const handleNeedToRegister = () => {
    // Redirect users who need to register back to home page
    router.push("/?register=true")
  }

  if (isLoading) {
    return (
      <main className="relative min-h-screen bg-[var(--galaxy-dark)] overflow-x-hidden">
        <StarField />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[var(--galaxy-purple)]">Loading...</div>
        </div>
      </main>
    )
  }

  if (isLoggedIn) {
    return (
      <main className="relative min-h-screen bg-[var(--galaxy-dark)] overflow-x-hidden">
        <StarField />
        <Header />
        <div className="pt-20">
          <div className="bg-[var(--galaxy-gold)]/20 border border-[var(--galaxy-gold)]/30 rounded-lg p-8 mx-4 sm:mx-6 lg:mx-8 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[var(--galaxy-gold)] mb-4">
                Already Registered!
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                You're already registered for the festival. Access your dashboard to manage your events and registrations.
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-[var(--galaxy-gold)] hover:bg-[var(--galaxy-gold)]/80 text-black px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-[var(--galaxy-dark)] overflow-x-hidden">
      <StarField />
      <Header />
      <div className="pt-20">
        {hasPendingRegistration ? (
          <div className="bg-[var(--galaxy-purple)]/20 border border-[var(--galaxy-purple)]/30 rounded-lg p-4 mx-4 sm:mx-6 lg:mx-8 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[var(--galaxy-purple)] mb-2">
                Complete Your Registration
              </h3>
              <p className="text-muted-foreground text-sm">
                Welcome {pendingUserData?.name}! Please select a pass below to complete your registration and gain access to the festival.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--galaxy-gold)]/20 border border-[var(--galaxy-gold)]/30 rounded-lg p-4 mx-4 sm:mx-6 lg:mx-8 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[var(--galaxy-gold)] mb-2">
                Registration Required
              </h3>
              <p className="text-muted-foreground text-sm">
                To purchase a festival pass, please register first. Click on any pass below to be redirected to the registration page.
              </p>
            </div>
          </div>
        )}
        <Passes 
          onRegisterClick={handleNeedToRegister}
          pendingRegistration={pendingUserData}
          onRegistrationComplete={handleRegistrationComplete}
        />
      </div>
      <Footer />
    </main>
  )
}
