"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Torus, MeshDistortMaterial } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type * as THREE from "three"

function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
    }
  })

  return (
    <Torus ref={meshRef} args={[2, 0.5, 16, 100]}>
      <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.3} speed={1.5} roughness={0} metalness={0.8} />
    </Torus>
  )
}

export function ContactSection() {
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

  const socialLinks = [
    { name: "GitHub", url: "#", icon: "GH" },
    { name: "LinkedIn", url: "#", icon: "LI" },
    { name: "Twitter", url: "#", icon: "TW" },
    { name: "Email", url: "mailto:alex@example.com", icon: "EM" },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: "url('/images/contact-bg.jpg')",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
            filter: "blur(1px)", // Reduced blur from blur-sm to 1px for very subtle effect
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/85 to-black/85" />
      </div>

      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AnimatedTorus />
        </Canvas>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <h2
          className={`text-4xl md:text-6xl font-bold mb-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <span className="text-white">Get In Touch</span>
        </h2>

        <p className="text-xl text-center text-slate-100 mb-16 leading-relaxed max-w-2xl mx-auto">
          Ready to bring your vision to life? Let's discuss how we can collaborate to create something exceptional
        </p>

        <Card
          className={`backdrop-blur-[2px] bg-white/5 border-2 border-white/20 rounded-2xl overflow-hidden transition-all duration-1000 delay-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Top-left corner highlight */}
          <div
            className="absolute top-0 left-4 w-[50px] h-[1px] pointer-events-none z-[11]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
            }}
          />
          {/* Top-right corner highlight */}
          <div
            className="absolute top-0 right-4 w-[50px] h-[1px] pointer-events-none z-[11]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
            }}
          />
          {/* Bottom-left corner highlight */}
          <div
            className="absolute bottom-0 left-4 w-[50px] h-[1px] pointer-events-none z-[11]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
            }}
          />
          {/* Bottom-right corner highlight */}
          <div
            className="absolute bottom-0 right-4 w-[50px] h-[1px] pointer-events-none z-[11]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              boxShadow:
                "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3), inset 0 0 10px 3px rgba(255, 255, 255, 0.1)",
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-60"
            style={{
              boxShadow:
                "inset 1px 1px 2px 0 rgba(255, 255, 255, 0.4), inset -2px -2px 3px 2px rgba(255, 255, 255, 0.2)",
            }}
          />
          <div className="relative z-20 p-12">
            <div className="text-center space-y-8">
              <div>
                <h3 className="text-4xl font-bold mb-2 text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                  alex.chen@example.com
                </h3>
                <p className="text-muted-foreground text-lg" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                  Available for select freelance opportunities
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((link, index) => (
                  <Button
                    key={link.name}
                    asChild
                    variant="outline"
                    size="lg"
                    className={`hoverable group backdrop-blur-[2px] bg-white/5 border-2 border-white/20 text-white rounded-2xl overflow-hidden relative hover:-translate-y-1 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-200 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                        style={{
                          boxShadow:
                            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3), inset 0 0 10px 3px rgba(255, 255, 255, 0.1)",
                        }}
                      />
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-60"
                        style={{
                          boxShadow:
                            "inset 1px 1px 2px 0 rgba(255, 255, 255, 0.4), inset -2px -2px 3px 2px rgba(255, 255, 255, 0.2)",
                        }}
                      />
                      <span className="relative z-20 text-lg" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                        {link.icon}
                      </span>
                      <span className="relative z-20 ml-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                        {link.name}
                      </span>
                    </a>
                  </Button>
                ))}
              </div>

              <button className="hoverable relative group px-8 py-4 text-lg font-semibold backdrop-blur-[2px] bg-white/5 border-2 border-white/20 rounded-full overflow-hidden hover:-translate-y-1 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300">
                <div
                  className="absolute inset-0 rounded-full pointer-events-none z-10"
                  style={{
                    boxShadow:
                      "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3), inset 0 0 10px 3px rgba(255, 255, 255, 0.1)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full pointer-events-none z-10 opacity-60"
                  style={{
                    boxShadow:
                      "inset 1px 1px 2px 0 rgba(255, 255, 255, 0.4), inset -2px -2px 3px 2px rgba(255, 255, 255, 0.2)",
                  }}
                />
                <span className="relative z-20" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                  Start a Conversation
                </span>
              </button>
            </div>
          </div>
        </Card>

        <footer className="mt-16 text-center text-muted-foreground">
          <p>© 2025 Alex Chen. Crafted with React, Next.js & Three.js</p>
        </footer>
      </div>
    </section>
  )
}
