"use client"

import { useEffect, useRef } from "react"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { Navigation } from "@/components/navigation"

export default function Portfolio() {
  const heroNameRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroNameRef.current) {
        heroNameRef.current.style.transform =
          `translate(${e.clientX * 0.025}px, ${e.clientY * 0.025}px)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.75_0.18_195_/_0.1),transparent_50%)]" />
      </div>

      <HeroSection heroNameRef={heroNameRef} />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
