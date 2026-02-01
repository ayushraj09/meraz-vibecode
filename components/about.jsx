"use client"

import { Sparkles, Zap, Music, Trophy, Award } from "lucide-react"
import siteData from "@/data/site.json"
import sponsorsData from "@/data/sponsors.json"

const icons = [Sparkles, Zap, Music, Trophy]

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-purple)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-cyan)] uppercase tracking-wider mb-4">
            {siteData.about.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{siteData.about.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {siteData.about.description}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {siteData.about.highlights.map((stat, index) => {
            const Icon = icons[index]
            return (
              <div
                key={stat.title}
                className="glass rounded-2xl p-6 sm:p-8 text-center glow-border group hover:scale-105 transition-transform duration-300"
              >
                <Icon className="w-8 h-8 mx-auto mb-4 text-[var(--galaxy-purple)] group-hover:text-[var(--galaxy-cyan)] transition-colors" />
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.title}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
                  {stat.subtitle}
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-8 glow-border group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-[var(--galaxy-purple)]/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[var(--galaxy-purple)]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Technical Excellence</h3>
            <p className="text-muted-foreground leading-relaxed">
              From coding competitions to robotics challenges, test your technical prowess against the brightest minds.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 glow-border-cyan group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-[var(--galaxy-cyan)]/20 flex items-center justify-center mb-4">
              <Music className="w-6 h-6 text-[var(--galaxy-cyan)]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Cultural Vibrance</h3>
            <p className="text-muted-foreground leading-relaxed">
              Dance, music, art, and drama — express yourself through the cosmic celebration of cultures.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 glow-border-pink group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-[var(--galaxy-pink)]/20 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-[var(--galaxy-pink)]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Amazing Prizes</h3>
            <p className="text-muted-foreground leading-relaxed">
              Compete for prizes worth over ₹15 lakhs across various events and competitions.
            </p>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-[var(--galaxy-gold)] uppercase tracking-wider mb-4">
              Our Partners
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Sponsors & Partners</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are grateful to our sponsors and partners who make this cosmic celebration possible
            </p>
          </div>

          {/* Title Sponsor */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--galaxy-gold)]/20 border border-[var(--galaxy-gold)]/30">
                <Award className="w-5 h-5 text-[var(--galaxy-gold)]" />
                <span className="text-sm font-semibold text-[var(--galaxy-gold)] uppercase tracking-wider">
                  Title Sponsor
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <a
                href={sponsorsData.sponsors.titleSponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-3xl p-12 glow-border-gold hover:scale-105 transition-all duration-300 max-w-md w-full"
              >
                <div className="h-32 flex items-center justify-center">
                  <div className="text-3xl font-bold gradient-text">
                    {sponsorsData.sponsors.titleSponsor.name}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Titanium Sponsors */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-300/20 to-gray-400/20 border border-gray-300/30">
                <Award className="w-5 h-5 text-gray-300" />
                <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Titanium Sponsors
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {sponsorsData.sponsors.titaniumSponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-10 glow-border hover:scale-105 transition-all duration-300"
                >
                  <div className="h-24 flex items-center justify-center">
                    <div className="text-2xl font-bold text-foreground">
                      {sponsor.name}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Gold Sponsors */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--galaxy-gold)]/10 border border-[var(--galaxy-gold)]/20">
                <Award className="w-4 h-4 text-[var(--galaxy-gold)]" />
                <span className="text-sm font-semibold text-[var(--galaxy-gold)] uppercase tracking-wider">
                  Gold Sponsors
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {sponsorsData.sponsors.goldSponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl p-8 glow-border-gold hover:scale-105 transition-all duration-300"
                >
                  <div className="h-20 flex items-center justify-center">
                    <div className="text-xl font-semibold text-foreground">
                      {sponsor.name}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Silver Sponsors */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--galaxy-cyan)]/10 border border-[var(--galaxy-cyan)]/20">
                <Award className="w-4 h-4 text-[var(--galaxy-cyan)]" />
                <span className="text-sm font-semibold text-[var(--galaxy-cyan)] uppercase tracking-wider">
                  Silver Sponsors
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sponsorsData.sponsors.silverSponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-lg p-6 glow-border-cyan hover:scale-105 transition-all duration-300"
                >
                  <div className="h-16 flex items-center justify-center">
                    <div className="text-sm font-medium text-foreground text-center">
                      {sponsor.name}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--galaxy-purple)]/10 border border-[var(--galaxy-purple)]/20">
                <Sparkles className="w-4 h-4 text-[var(--galaxy-purple)]" />
                <span className="text-sm font-semibold text-[var(--galaxy-purple)] uppercase tracking-wider">
                  Partners
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {sponsorsData.sponsors.partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-lg p-4 border border-[var(--galaxy-purple)]/20 hover:border-[var(--galaxy-purple)]/50 hover:scale-105 transition-all duration-300"
                >
                  <div className="h-12 flex items-center justify-center">
                    <div className="text-xs font-medium text-muted-foreground text-center">
                      {partner.name}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
