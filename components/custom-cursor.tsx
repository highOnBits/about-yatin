"use client"

import { useEffect, useState } from "react"

interface CustomCursorProps {
  position: { x: number; y: number }
}

export function CustomCursor({ position }: CustomCursorProps) {
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(target.tagName === "BUTTON" || target.tagName === "A" || target.classList.contains("hoverable"))
    }

    window.addEventListener("mouseover", handleMouseOver)
    return () => window.removeEventListener("mouseover", handleMouseOver)
  }, [])

  return (
    <>
      {/* Trailing cursor ring - positioned behind content */}
      <div
        className="fixed w-10 h-10 pointer-events-none z-[9998]"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          transition: "all 0.15s ease-out",
          transform: isHovering ? "scale(1.5)" : "scale(1)",
        }}
      >
        <div className="w-full h-full rounded-full border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
      </div>
    </>
  )
}
