"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

const projects = [
  {
    title: "AI Chat Platform",
    description: "Real-time chat application with AI-powered responses and natural language processing",
    tech: ["Next.js", "OpenAI", "PostgreSQL", "WebSocket"],
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "E-Commerce Dashboard",
    description: "Comprehensive analytics dashboard with 3D data visualizations and real-time insights",
    tech: ["React", "Three.js", "D3.js", "Node.js"],
    gradient: "from-violet-500/10 to-purple-500/10",
  },
  {
    title: "Blockchain Explorer",
    description: "Interactive blockchain data visualization with Web3 integration and smart contract analysis",
    tech: ["TypeScript", "Web3.js", "GraphQL", "Redis"],
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "AR Design Tool",
    description: "Augmented reality application for interior design visualization and spatial planning",
    tech: ["React Native", "ARKit", "Three.js", "Firebase"],
    gradient: "from-amber-500/10 to-orange-500/10",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: "url('/images/projects-bg.jpg')",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            filter: "blur(1px)", // Reduced blur from blur-sm to 1px for very subtle effect
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-transparent" />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <h2
          className={`text-4xl md:text-6xl font-bold mb-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <span className="text-white">Recent Work</span>
        </h2>

        <p className="text-lg text-slate-100 text-center mb-16 max-w-2xl mx-auto leading-relaxed">
          Explore my latest projects where innovation meets execution - each one crafted with attention to detail and a
          passion for excellence
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              className={`group relative overflow-hidden backdrop-blur-[6px] bg-white/5 border-2 border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
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
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{
                  boxShadow:
                    "inset 2px 2px 3px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 2px 1px rgba(255, 255, 255, 0.5)",
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-60"
                style={{
                  boxShadow:
                    "inset 1px 1px 2px 0 rgba(255, 255, 255, 0.3), inset -2px -2px 3px 2px rgba(255, 255, 255, 0.2)",
                }}
              />

              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative p-8 z-30">
                <h3
                  className="text-3xl font-bold mb-4 text-white transition-all"
                  style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)" }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-slate-200 leading-relaxed mb-6 text-lg"
                  style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)" }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-secondary/50 rounded-full border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="relative px-4 py-2 text-sm rounded-full border-2 border-slate-400/60 backdrop-blur-md bg-white/5 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-slate-400/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none z-10"
                      style={{
                        boxShadow:
                          "inset 2px 2px 3px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 2px 1px rgba(255, 255, 255, 0.5)",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none z-10 opacity-70"
                      style={{
                        boxShadow:
                          "inset 1px 1px 2px 0 rgba(255, 255, 255, 0.3), inset -2px -2px 3px 2px rgba(255, 255, 255, 0.2)",
                      }}
                    />
                    <span className="relative z-20">View Code</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
