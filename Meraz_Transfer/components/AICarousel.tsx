'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselItem {
  id: number
  title: string
  description: string
  prompt: string
  imageUrl: string
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Cultural Extravaganza',
    description: 'Experience the vibrant colors and energy of traditional and contemporary performances',
    prompt: 'AI Prompt: A vibrant Indian cultural festival with dancers in traditional attire, colorful lights, and energetic crowd, digital art style, 4K',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200',
  },
  {
    id: 2,
    title: 'Tech Innovation Hub',
    description: 'Dive into cutting-edge technology workshops and hackathons',
    prompt: 'AI Prompt: Futuristic technology workshop with holographic displays, robotics, and students coding, neon lighting, cyberpunk aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
  },
  {
    id: 3,
    title: 'Star Night Performances',
    description: 'Rock the night with electrifying performances by top artists',
    prompt: 'AI Prompt: Massive outdoor concert stage with dramatic lighting, crowd silhouettes, fireworks in the sky, epic atmosphere',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200',
  },
  {
    id: 4,
    title: 'Creative Competitions',
    description: 'Showcase your talent in art, music, dance, and drama',
    prompt: 'AI Prompt: Creative arts festival with painting exhibitions, live music, and artistic performances, warm ambient lighting',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200',
  },
]

export default function AICarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
  }

  const currentItem = carouselItems[currentIndex]

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="relative h-[500px] overflow-hidden rounded-3xl glass-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentItem.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold mb-4 gradient-text"
              >
                {currentItem.title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl"
              >
                {currentItem.description}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setShowPrompt(!showPrompt)}
                className="glass px-6 py-3 rounded-full text-sm font-semibold hover:glow transition-all w-fit"
              >
                {showPrompt ? 'Hide' : 'View'} AI Prompt Used
              </motion.button>

              <AnimatePresence>
                {showPrompt && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 glass p-4 rounded-xl max-w-2xl"
                  >
                    <p className="text-sm text-primary-300 italic">{currentItem.prompt}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 glass p-3 rounded-full hover:glow transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 glass p-3 rounded-full hover:glow transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-primary-500' : 'w-2 bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
