import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Events from "@/components/events"
import Passes from "@/components/passes"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import StarField from "@/components/star-field"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[var(--galaxy-dark)] overflow-x-hidden">
      <StarField />
      <Header />
      <Hero />
      <About />
      <Events />
      <Passes />
      <Testimonials />
      <Footer />
    </main>
  )
}
