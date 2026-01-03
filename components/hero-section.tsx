"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, MeshTransmissionMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface HeroSectionProps {
  mousePosition: { x: number; y: number }
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
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.92}
          roughness={0.15}
          thickness={0.8}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.1}
          temporalDistortion={0.05}
          color="#c4d4c0"
          opacity={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Torus ring */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[2, 0.15, 16, 100]} />
        <MeshTransmissionMaterial
          backside
          samples={10}
          resolution={256}
          transmission={0.88}
          roughness={0.2}
          thickness={0.5}
          ior={1.45}
          chromaticAberration={0.03}
          color="#a8c5d4"
          opacity={0.25}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
        />
      </mesh>
    </group>
  )
}

function Particles() {
  const count = 300
  const meshRef = useRef<THREE.Points>(null)

  const particles = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    particles[i] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#e8dcc8" transparent opacity={0.3} />
    </points>
  )
}

export function HeroSection({ mousePosition }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // The parallax transform was moving the section up while content remained visible
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (sectionRef.current) {
  //       const scrolled = window.scrollY
  //       sectionRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
  //     }
  //   }
  //
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", handleScroll)
  //   }
  //
  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("scroll", handleScroll)
  //     }
  //   }
  // }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 animate-fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-60 animate-fade-in animation-delay-200">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} color="#dbeafe" intensity={1} />
          <spotLight position={[5, 15, 5]} intensity={1.5} angle={0.4} penumbra={1} color="#ffffff" />
          <CrystalGeometry />
          <Particles />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      >
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="mb-6 animate-slide-up-fade animation-delay-300">
            <p
              className="text-sm md:text-base font-medium tracking-widest uppercase mb-4 text-slate-100"
              style={{
                textShadow:
                  "0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.8), 0 0 60px rgba(255,255,255,0.3)",
              }}
            >
              Software Developer & Creative Technologist
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight animate-slide-up-fade animation-delay-500">
            <span
              className="inline-block font-bold text-white"
              style={{
                transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
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
              Alex Chen
            </span>
          </h1>

          <p
            className="text-xl md:text-3xl mb-12 max-w-3xl mx-auto leading-relaxed text-balance text-slate-50 font-medium animate-slide-up-fade animation-delay-700"
            style={{
              textShadow:
                "0 0 20px rgba(0,0,0,0.95), 0 0 35px rgba(0,0,0,0.8), 0 3px 8px rgba(0,0,0,0.9), 0 0 50px rgba(255, 255, 255, 0.2)",
            }}
          >
            Crafting exceptional digital experiences through innovative design and cutting-edge technology
          </p>

          <div className="flex gap-4 justify-center flex-wrap animate-slide-up-fade animation-delay-900">
            <button className="relative group px-8 py-4 rounded-full bg-white/90 backdrop-blur-md text-black font-semibold transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white hover:backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] overflow-hidden">
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
              <span className="flex items-center gap-2 relative z-10">
                View Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button className="relative group px-8 py-4 rounded-full border-2 border-white/80 backdrop-blur-md bg-white/5 text-white font-semibold transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white hover:bg-white/15 hover:backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] overflow-hidden">
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
              <span className="flex items-center gap-2 relative z-10">
                Get in Touch
                <svg
                  className="w-4 h-4 group-hover:rotate-12 transition-transform"
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
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 rounded-full border-2 border-white/70 flex justify-center pt-2 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <div className="w-1 h-3 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
    </section>
  )
}
