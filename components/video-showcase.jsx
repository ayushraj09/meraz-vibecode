"use client"

import { useState } from "react"
import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoShowcase({ onRegisterClick }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handlePlayClick = () => {
    const video = document.getElementById("festival-video")
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = document.getElementById("festival-video")
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    const video = document.getElementById("festival-video")
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen()
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen()
      }
    }
  }

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-cyan)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-cyan)] uppercase tracking-wider mb-4">
            Relive the Magic
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Previous Year Highlights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the electrifying moments, stunning performances, and unforgettable memories from our past festivals
          </p>
        </div>

        {/* Video Container */}
        <div className="relative group">
          <div className="glass rounded-3xl overflow-hidden glow-border-cyan">
            <div className="relative aspect-video bg-black">
              <video
                id="festival-video"
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                poster="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=675&fit=crop"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                {/* Sample video - replace with actual festival video */}
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
                  <button
                    onClick={handlePlayClick}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 flex items-center justify-center transition-all group-hover:scale-110 animate-pulse-glow"
                  >
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1" fill="white" />
                  </button>
                </div>
              )}

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePlayClick}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                    >
                      {isPlaying ? (
                        <div className="w-3 h-3 border-l-2 border-r-2 border-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                      )}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={toggleFullscreen}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-[var(--galaxy-cyan)]/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--galaxy-purple)]/20 rounded-full blur-3xl -z-10" />
        </div>

        {/* Gallery Preview */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
          ].map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-xl overflow-hidden glass glow-border group cursor-pointer hover:scale-105 transition-all"
            >
              <img
                src={image}
                alt={`Festival highlight ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[var(--galaxy-purple)]/0 group-hover:bg-[var(--galaxy-purple)]/20 transition-all" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Want to be part of this year&apos;s celebration? Join thousands of students from across the country!
          </p>
          <Button
            size="lg"
            className="bg-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)]/80 text-white px-8 py-6 text-lg animate-pulse-glow"
            onClick={onRegisterClick}
          >
            Register for 2026
          </Button>
        </div>
      </div>
    </section>
  )
}
