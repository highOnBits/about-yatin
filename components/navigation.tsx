"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, User, Layers, FolderKanban, Mail, type LucideIcon } from "lucide-react"

const navItems: { name: string; href: string; icon: LucideIcon }[] = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Layers },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Contact", href: "#contact", icon: Mail },
]

export function Navigation() {
  const [isMobile, setIsMobile] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setIsCollapsed(true)
    }
    checkMobile()
    setMounted(true)
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (isMobile) {
        setIsCollapsed(true)
        setLastScrollY(currentScrollY)
        return
      }
      if (currentScrollY > 100) {
        setIsCollapsed(true)
      } else if (currentScrollY < 50) {
        setIsCollapsed(false)
        setIsMobileMenuOpen(false)
      }
      setLastScrollY(currentScrollY)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [lastScrollY, isMobile])

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Morphing Navigation Bar */}
      <nav
        className={`fixed top-4 z-40 ${mounted ? "transition-all duration-700 ease-in-out" : ""} ${
          isCollapsed ? "left-4" : "left-1/2 -translate-x-1/2"
        }`}
      >
        <div 
          className={`relative flex items-center rounded-full glass-base glass-hover overflow-hidden ${mounted ? "transition-all duration-700 ease-in-out" : ""} ${
            isCollapsed 
              ? "gap-0 px-3 py-3 w-12 h-12" 
              : "gap-2 px-6 py-3 w-auto"
          }`}
        >
          <div className="absolute inset-0 pointer-events-none z-10 rounded-full glass-shine-primary" />
          <div className="absolute inset-0 pointer-events-none z-10 rounded-full glass-shine-secondary" />
          <div className="absolute inset-0 pointer-events-none rounded-full glass-edge-glow" />

          {/* Corner highlights - only show when expanded */}
          {!isCollapsed && (
            <>
              <div
                className="absolute top-0 right-4 w-20 h-[2px] pointer-events-none z-20 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                }}
              />
              <div
                className="absolute top-0 left-4 w-20 h-[2px] pointer-events-none z-20 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                }}
              />
              <div
                className="absolute bottom-0 left-4 w-20 h-[2px] pointer-events-none z-20 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                }}
              />
              <div
                className="absolute bottom-0 right-4 w-20 h-[2px] pointer-events-none z-20 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                }}
              />
            </>
          )}

          {/* Hamburger Icon - shows when collapsed */}
          {isCollapsed && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer relative z-20 flex items-center justify-center w-full h-full transition-transform duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white transition-all duration-200 hover:scale-115 hover:rotate-12" />
              ) : (
                <Menu className="w-5 h-5 text-white transition-all duration-200 hover:scale-115 hover:rotate-12" />
              )}
            </button>
          )}

          {/* Full Navigation Items - shows when expanded */}
          <div 
            className={`flex items-center gap-2 transition-all duration-700 ${
              isCollapsed 
                ? "opacity-0 w-0 overflow-hidden pointer-events-none" 
                : "opacity-100 w-auto"
            }`}
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                asChild
                className="text-sm font-medium glass-hover glass-text-shadow hover:text-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)] relative group rounded-full whitespace-nowrap"
              >
                <a href={item.href}>
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Full-Screen Menu Overlay - opens from hamburger */}
      <div
        className={`fixed inset-0 z-30 ${
          isMobileMenuOpen && isCollapsed
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {/* Backdrop — appears immediately */}
        <div 
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-200 ${
            isMobileMenuOpen && isCollapsed ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(15,10,30,0.78) 50%, rgba(0,0,0,0.82) 100%)" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-5 px-8">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleNavClick}
              className={`group relative text-xl md:text-3xl font-semibold tracking-wide uppercase text-white/90 hover:text-white transition-all duration-500 hover:scale-105 hover:tracking-widest ${
                isMobileMenuOpen && isCollapsed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen && isCollapsed ? `${index * 80}ms` : "0ms",
                textShadow: "0 0 12px rgba(255,255,255,0.15)",
              }}
            >
              <item.icon className="inline-block w-5 h-5 md:w-6 md:h-6 mr-3 opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10" />
              <span className="relative z-10">{item.name}</span>
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:w-full transition-all duration-500" />
              <span
                className="absolute inset-0 -inset-x-6 -inset-y-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
