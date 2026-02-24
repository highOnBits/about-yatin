"use client"

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react"

interface MobileCarouselProps {
  children: ReactNode[]
  className?: string
}

export function MobileCarousel({ children, className = "" }: MobileCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const total = children.length

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchDeltaX = useRef(0)
  const directionLocked = useRef<"horizontal" | "vertical" | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(Math.max(0, Math.min(idx, total - 1)))
      setDragOffset(0)
    },
    [total],
  )

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchDeltaX.current = 0
    directionLocked.current = null
    setDragging(true)
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current

    if (!directionLocked.current) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      directionLocked.current = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical"
    }

    if (directionLocked.current === "vertical") return

    e.preventDefault()
    touchDeltaX.current = dx
    setDragOffset(dx)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setDragging(false)
    if (directionLocked.current !== "horizontal") {
      setDragOffset(0)
      return
    }
    const threshold = 50
    if (touchDeltaX.current < -threshold) {
      goTo(current + 1)
    } else if (touchDeltaX.current > threshold) {
      goTo(current - 1)
    } else {
      setDragOffset(0)
    }
  }, [current, goTo])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    el.addEventListener("touchstart", handleTouchStart, { passive: true })
    el.addEventListener("touchmove", handleTouchMove, { passive: false })
    el.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener("touchstart", handleTouchStart)
      el.removeEventListener("touchmove", handleTouchMove)
      el.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <div className={`md:hidden ${className}`}>
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(calc(-${current * 100}% + ${dragging ? dragOffset : 0}px))`,
            transition: dragging ? "none" : "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {children.map((child, i) => (
            <div key={i} className="w-full flex-shrink-0 px-1">
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-white/80"
                : "w-2 h-2 bg-white/30"
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
