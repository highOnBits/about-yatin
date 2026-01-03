"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.2 },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const card4Ref = useRef<HTMLDivElement>(null)

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4 relative">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: "url('/images/about-bg.jpg')",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-transparent" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.25_0.03_265_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.25_0.03_265_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="max-w-6xl w-full relative z-10">
        <h2
          className={`text-4xl md:text-6xl font-bold mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          style={{
            textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.2)",
          }}
        >
          <span className="text-white">Who I Am</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card
            ref={card1Ref}
            className={`relative border-2 border-white/20 backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] overflow-hidden ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            {/* Top-left corner highlight */}
            <div
              className="absolute top-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Top-right corner highlight */}
            <div
              className="absolute top-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom-left corner highlight */}
            <div
              className="absolute bottom-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom-right corner highlight */}
            <div
              className="absolute bottom-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
              style={{
                boxShadow:
                  "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 3px 0px rgba(255, 255, 255, 0.2), inset 0 0 10px 0px rgba(255, 255, 255, 0.05)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-60 rounded-2xl"
              style={{
                boxShadow:
                  "inset 1px 1px 2px 0px rgba(255, 255, 255, 0.5), inset 0 0 8px 0px rgba(255, 255, 255, 0.15)",
              }}
            />
            <div className="relative z-20 p-8">
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                My Journey
              </h3>
              <p
                className="text-slate-200 leading-relaxed text-base"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              >
                With over 8 years in software development, I've had the privilege of working with innovative startups
                and established companies alike. My passion lies in transforming complex challenges into elegant,
                user-centric solutions that make a real difference.
              </p>
            </div>
          </Card>

          <Card
            ref={card2Ref}
            className={`relative border-2 border-white/20 backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] overflow-hidden ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            {/* Top-left corner highlight */}
            <div
              className="absolute top-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Top-right corner highlight */}
            <div
              className="absolute top-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom-left corner highlight */}
            <div
              className="absolute bottom-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom-right corner highlight */}
            <div
              className="absolute bottom-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
              style={{
                boxShadow:
                  "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 3px 0px rgba(255, 255, 255, 0.2), inset 0 0 10px 0px rgba(255, 255, 255, 0.05)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-60 rounded-2xl"
              style={{
                boxShadow:
                  "inset 1px 1px 2px 0px rgba(255, 255, 255, 0.5), inset 0 0 8px 0px rgba(255, 255, 255, 0.15)",
              }}
            />
            <div className="relative z-20 p-8">
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                What Drives Me
              </h3>
              <p
                className="text-slate-200 leading-relaxed text-base"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              >
                I believe technology should be invisible yet powerful. Every line of code I write is guided by the
                principle of creating experiences that feel natural and intuitive, while being built on robust, scalable
                architecture.
              </p>
            </div>
          </Card>

          <Card
            ref={card3Ref}
            className={`relative border-2 border-white/20 backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] overflow-hidden ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            {/* Top-left corner highlight */}
            <div
              className="absolute top-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Top-right corner highlight */}
            <div
              className="absolute top-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom-left corner highlight */}
            <div
              className="absolute bottom-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom-right corner highlight */}
            <div
              className="absolute bottom-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
              style={{
                boxShadow:
                  "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 3px 0px rgba(255, 255, 255, 0.2), inset 0 0 10px 0px rgba(255, 255, 255, 0.05)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-60 rounded-2xl"
              style={{
                boxShadow:
                  "inset 1px 1px 2px 0px rgba(255, 255, 255, 0.5), inset 0 0 8px 0px rgba(255, 255, 255, 0.15)",
              }}
            />
            <div className="relative z-20 p-8">
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                My Process
              </h3>
              <p
                className="text-slate-200 leading-relaxed text-base"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              >
                I thrive in collaborative environments where ideas flow freely. My approach combines agile methodologies
                with design thinking, ensuring that every project is delivered with precision, creativity, and a focus
                on measurable impact.
              </p>
            </div>
          </Card>

          <Card
            ref={card4Ref}
            className={`relative border-2 border-white/20 backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] overflow-hidden ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            {/* Top-left corner highlight */}
            <div
              className="absolute top-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Top-right corner highlight */}
            <div
              className="absolute top-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom-left corner highlight */}
            <div
              className="absolute bottom-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom-right corner highlight */}
            <div
              className="absolute bottom-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
              style={{
                boxShadow:
                  "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 3px 0px rgba(255, 255, 255, 0.2), inset 0 0 10px 0px rgba(255, 255, 255, 0.05)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-60 rounded-2xl"
              style={{
                boxShadow:
                  "inset 1px 1px 2px 0px rgba(255, 255, 255, 0.5), inset 0 0 8px 0px rgba(255, 255, 255, 0.15)",
              }}
            />
            <div className="relative z-20 p-8">
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                Beyond Code
              </h3>
              <p
                className="text-slate-200 leading-relaxed text-base"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              >
                When I'm not immersed in development, I'm exploring emerging technologies, contributing to open-source
                projects, mentoring aspiring developers, and pushing the boundaries of what's possible with 3D graphics
                and interactive design.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
