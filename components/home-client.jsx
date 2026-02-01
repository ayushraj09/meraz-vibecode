"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import QuickLinks from "@/components/quick-links"
import VideoShowcase from "@/components/video-showcase"
import Highlights from "@/components/highlights"
import Footer from "@/components/footer"
import StarField from "@/components/star-field"
import AuthModals from "@/components/auth-modals"

export default function HomePageClient() {
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
      <Hero onRegisterClick={() => openAuthModal("register")} />
      <QuickLinks />
      <VideoShowcase onRegisterClick={() => openAuthModal("register")} />
      <Highlights onRegisterClick={() => openAuthModal("register")} />
      <Footer />
      
      <AuthModals 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab={authTab}
      />
    </main>
  )
}
