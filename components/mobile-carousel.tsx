"use client"

import { useState, useRef, useCallback, type ReactNode } from "react"

interface MobileCarouselProps {
  children: ReactNode[]
  className?: string
}

export function MobileCarousel({ children, className = "" }: MobileCarouselProps) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const [dragging, setDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const total = children.length

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(Math.max(0, Math.min(idx, total - 1)))
      setDragOffset(0)
    },
    [total],
  )

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    setDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
    setDragOffset(touchDeltaX.current)
  }

  const handleTouchEnd = () => {
    setDragging(false)
    const threshold = 60
    if (touchDeltaX.current < -threshold && current < total - 1) {
      goTo(current + 1)
    } else if (touchDeltaX.current > threshold && current > 0) {
      goTo(current - 1)
    } else {
      setDragOffset(0)
    }
  }

  return (
    <div className={`md:hidden ${className}`}>
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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

      {/* Dot indicators */}
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
