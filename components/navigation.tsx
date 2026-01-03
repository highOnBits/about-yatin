"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <div className="relative flex items-center gap-2 px-6 py-3 rounded-full glass-base glass-hover overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-10 rounded-full glass-shine-primary" />
        <div className="absolute inset-0 pointer-events-none z-10 rounded-full glass-shine-secondary" />
        <div className="absolute inset-0 pointer-events-none rounded-full glass-edge-glow" />

        {/* Top-right corner highlight */}
        <div
          className="absolute top-0 right-4 w-20 h-[2px] pointer-events-none z-20"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
          }}
        />

        {/* Top-left corner highlight */}
        <div
          className="absolute top-0 left-4 w-20 h-[2px] pointer-events-none z-20"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
          }}
        />

        {/* Bottom-left corner highlight */}
        <div
          className="absolute bottom-0 left-4 w-20 h-[2px] pointer-events-none z-20"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
          }}
        />

        {/* Bottom-right corner highlight */}
        <div
          className="absolute bottom-0 right-4 w-20 h-[2px] pointer-events-none z-20"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
          }}
        />

        {navItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            asChild
            className="text-sm font-medium glass-hover glass-text-shadow hover:text-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)] relative group rounded-full"
          >
            <a href={item.href}>
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </Button>
        ))}
      </div>
    </nav>
  )
}
