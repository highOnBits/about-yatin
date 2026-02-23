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
    <div className="fixed top-0 left-0 right-0 h-[5px] bg-transparent z-50">
      <div
        className="h-full relative"
        style={{
          width: `${progress}%`,
          transition: "none",
          background: "transparent",
          borderTop: "1.5px solid rgba(255,255,255,0.5)",
          borderBottom: "1.5px solid rgba(255,255,255,0.3)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "0 0 6px 1px rgba(255,255,255,0.2), inset 0 0 4px rgba(255,255,255,0.05)",
          }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full pointer-events-none -translate-x-[-50%]"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)",
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.5), 0 0 14px 4px rgba(255,255,255,0.2), 0 0 24px 6px rgba(255,255,255,0.1)",
          }}
        />
      </div>
    </div>
  )
}
