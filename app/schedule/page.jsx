"use client"

import { useState } from "react"
import Header from "@/components/header"
import Schedule from "@/components/schedule"
import Footer from "@/components/footer"
import StarField from "@/components/star-field"
import AuthModals from "@/components/auth-modals"

export default function SchedulePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState("login")

  const openAuthModal = (tab = "register") => {
    setAuthTab(tab)
    setAuthModalOpen(true)
  }

  return (
    <main className="relative min-h-screen bg-[var(--galaxy-dark)] overflow-x-hidden">
      <StarField />
      <Header onOpenAuth={openAuthModal} />
      <div className="pt-20">
        <Schedule />
      </div>
      <Footer />
      <AuthModals 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab={authTab}
      />
    </main>
  )
}
