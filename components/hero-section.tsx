"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

interface HeroSectionProps {
  heroNameRef: React.RefObject<HTMLSpanElement | null>
}

function CrystalGeometry() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhysicalMaterial
          color="#c4d4c0"
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[2, 0.15, 16, 64]} />
        <meshPhysicalMaterial
          color="#a8c5d4"
          transparent
          opacity={0.2}
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          transmission={0.85}
          thickness={0.3}
          ior={1.45}
        />
      </mesh>
    </group>
  )
}

function Particles() {
  const count = 200
  const meshRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#e8dcc8" transparent opacity={0.3} />
    </points>
  )
}

// Character-by-character text reveal animation component
// Splits text into individual characters and animates them with staggered delays
// Works responsively across all screen sizes regardless of text wrapping
function AnimatedText({ text, delay = 0, charDelay = 15 }: { text: string; delay?: number; charDelay?: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  const words = text.split(' ')
  let globalCharIndex = 0

  return (
    <span className="inline">
      {words.map((word, wordIdx) => {
        const startIndex = globalCharIndex
        globalCharIndex += word.length + 1

        return (
          <span key={wordIdx}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="inline-block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `opacity 0.15s ease-out ${(startIndex + charIdx) * charDelay}ms, transform 0.15s ease-out ${(startIndex + charIdx) * charDelay}ms`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            {wordIdx < words.length - 1 && (
              <span
                className="inline-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.15s ease-out ${(startIndex + word.length) * charDelay}ms`,
                  width: '0.3em',
                }}
              >
                {' '}
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}

export function HeroSection({ heroNameRef }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    )
    const el = sectionRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 animate-fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/hero-bg.jpg')`,
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-60 animate-fade-in animation-delay-200">
        {isInView && (
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} color="#dbeafe" intensity={1} />
            <spotLight position={[5, 15, 5]} intensity={1.5} angle={0.4} penumbra={1} color="#ffffff" />
            <CrystalGeometry />
            <Particles />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Canvas>
        )}
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      >
        <div className="relative z-10 text-center px-4 max-w-5xl">
          {/* Profile Photo - Uncomment to enable */}
          {/* 
          <div className="mb-8 animate-slide-up-fade animation-delay-200 flex justify-center">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 backdrop-blur-sm bg-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 group-hover:border-white/50 group-hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)]">
                <div
                  className="absolute inset-0 pointer-events-none z-10 rounded-full"
                  style={{
                    boxShadow:
                      "inset 2px 2px 4px 0px rgba(255, 255, 255, 0.4), inset -2px -2px 4px 0px rgba(255, 255, 255, 0.2)",
                  }}
                />
                <img 
                  src="/images/profile-photo.JPG" 
                  alt="Yatin Kumar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          */}

          <div className="mb-4 md:mb-6 animate-slide-up-fade animation-delay-300">
            <p
              className="text-xs md:text-base font-medium tracking-widest uppercase mb-2 md:mb-4 text-slate-100"
              style={{
                textShadow:
                  "0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.8), 0 0 60px rgba(255,255,255,0.3)",
              }}
            >
              Senior Software Engineer · AI Platform Engineering · Full-Stack
            </p>
          </div>

          <h1 className="text-3xl md:text-7xl lg:text-8xl mb-4 md:mb-6 leading-tight animate-slide-up-fade animation-delay-500">
            <span
              ref={heroNameRef}
              className="inline-block font-bold text-white"
              style={{
                transition: "transform 0.2s ease-out",
                letterSpacing: "0.02em",
                textShadow: `
                  2px 2px 0px rgba(100, 116, 139, 0.3),
                  4px 4px 0px rgba(71, 85, 105, 0.25),
                  6px 6px 0px rgba(51, 65, 85, 0.2),
                  8px 8px 0px rgba(30, 41, 59, 0.15),
                  10px 10px 20px rgba(0, 0, 0, 0.5),
                  0 0 30px rgba(255, 255, 255, 0.2),
                  0 0 50px rgba(168, 197, 212, 0.15)
                `,
                filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))",
              }}
            >
              Yatin Kumar
            </span>
          </h1>

          <div className="mb-8 md:mb-12 max-w-5xl mx-auto">
            <p
              className="text-base md:text-xl leading-relaxed text-slate-200/90 font-light tracking-wide"
              style={{
                textShadow:
                  "0 0 15px rgba(0,0,0,0.7), 0 0 25px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.6)",
              }}
            >
              <AnimatedText 
                text="Where strong engineering meets strategic thinking. Ownership drives impact. And, continuous learning fuels better decisions" 
                delay={700}
                charDelay={15}
              />
            </p>
          </div>

          <div className="flex gap-3 md:gap-4 justify-center flex-wrap animate-slide-up-fade animation-delay-900">
            <a href="#projects" className="scroll-smooth">
            <button className="relative group px-5 py-3 md:px-8 md:py-4 rounded-full bg-white/90 backdrop-blur-md text-black text-sm md:text-base font-semibold transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white hover:backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-full"
                style={{
                  boxShadow:
                    "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.4), inset -2px -2px 3px 0px rgba(255, 255, 255, 0.3), inset 0 0 10px 0px rgba(255, 255, 255, 0.08)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-70 rounded-full"
                style={{
                  boxShadow:
                    "inset 1px 1px 2px 0px rgba(255, 255, 255, 0.6), inset 0 0 8px 0px rgba(255, 255, 255, 0.2)",
                }}
              />
              <span className="flex items-center gap-1.5 md:gap-2 relative z-10">
                View Projects
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:scale-115 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            </a>
            <a
              href="#contact"
              className="scroll-smooth"
              onClick={() => {
                setTimeout(() => {
                  document.getElementById("contact-message")?.focus()
                }, 800)
              }}
            >
            <button className="relative group px-5 py-3 md:px-8 md:py-4 rounded-full border md:border-2 border-white/80 backdrop-blur-md bg-white/5 text-white text-sm md:text-base font-semibold transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white hover:bg-white/15 hover:backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 pointer-events-none z-10 rounded-full"
                style={{
                  boxShadow:
                    "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 3px 0px rgba(255, 255, 255, 0.2), inset 0 0 10px 0px rgba(255, 255, 255, 0.05)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-60 rounded-full"
                style={{
                  boxShadow:
                    "inset 1px 1px 2px 0px rgba(255, 255, 255, 0.5), inset 0 0 8px 0px rgba(255, 255, 255, 0.15)",
                }}
              />
              <span className="flex items-center gap-1.5 md:gap-2 relative z-10">
                Get in Touch
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-12 group-hover:scale-115 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        {/* Mouse icon — desktop */}
        <div className="hidden md:flex w-6 h-10 rounded-full border-2 border-white/70 justify-center pt-2 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <div className="w-1 h-3 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
        {/* Chevron — mobile */}
        <div className="md:hidden flex flex-col items-center gap-0.5">
          <svg
            className="w-5 h-5 text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg
            className="w-5 h-5 text-white/40 -mt-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
