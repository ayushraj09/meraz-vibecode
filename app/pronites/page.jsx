"use client"

import { useState } from "react"
import Header from "@/components/header"
import Pronites from "@/components/pronites"
import Footer from "@/components/footer"
import StarField from "@/components/star-field"
import AuthModals from "@/components/auth-modals"

export default function PronitesPage() {
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
        <Pronites />
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
