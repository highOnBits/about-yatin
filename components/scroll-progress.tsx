"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / totalHeight) * 100
      setProgress(scrolled)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 bg-black/30 backdrop-blur-sm z-50 border-b border-white/10">
      <div
        className="h-full relative bg-white/10 backdrop-blur-md border-r-2 border-white/40"
        style={{ width: `${progress}%`, transition: "none" }}
      >
        {/* Primary shine layer for glass reflection */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 0 rgba(255, 255, 255, 0.15)",
          }}
        />
        {/* Outer glow effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.4), 0 0 40px 4px rgba(255, 255, 255, 0.15)",
          }}
        />
      </div>
    </div>
  )
}
