"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { X, Lightbulb } from "lucide-react"

interface Project {
  title: string
  description: string
  inspiration: string
  tech: string[]
  gradient: string
  details: string[]
}

const projects: Project[] = [
  {
    title: "Personal Notebook",
    description:
      "An intelligent research workspace inspired by Google's NotebookLM — create notebooks, add your own materials or search the web, and get citation-backed answers with multi-format outputs.",
    inspiration:
      "In a world overflowing with RAG-powered answers, knowing where data comes from matters. If an LLM answers a question, it's critical to know the source. Every response should be traceable to its origin.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Next.js", "OpenAI", "pgvector", "Docker"],
    gradient: "from-blue-500/10 to-cyan-500/10",
    details: [
      "Create notebooks and add custom materials or search the internet for sources",
      "Every answer is backed by citations linking to the original source material",
      "Generate diverse outputs from each notebook: audio, video, reports, presentations, vision maps, and data tables",
      "Semantic search powered by pgvector for accurate, context-aware retrieval",
      "RAG architecture ensuring answers are grounded in your data, not hallucinated",
    ],
  },
  {
    title: "Buddy",
    description:
      "A personalized AI life assistant that manages your daily routine, finances, health, household, and IoT devices — all accessible through voice.",
    inspiration:
      "Born from observing what I do manually every day and asking what could be automated. The long-term vision: make cutting-edge AI accessible to every household through voice, bridging the technology gap for people who aren't tech-savvy.",
    tech: [
      "Python",
      "Celery",
      "Redis",
      "PostgreSQL",
      "MCP Servers",
      "Next.js",
      "React Native",
      "Claude Code",
      "OpenAI",
      "Docker",
    ],
    gradient: "from-violet-500/10 to-purple-500/10",
    details: [
      "Integrates with banking apps to provide personalized financial advice and spending insights",
      "Learns your daily routine and provides autonomous recommendations based on observed patterns",
      "IoT compatible for smart home management and automation",
      "Household management including shopping lists, inventory tracking, and task scheduling",
      "Health monitoring with sleep cycle analysis and wellness recommendations",
      "Fully voice-accessible for hands-free interaction",
      "Mobile app (React Native) and web interface (Next.js) for seamless cross-device access",
    ],
  },
  {
    title: "Tempus",
    description:
      "An AI time-utilization analytics service that measures exactly how much time AI saves compared to human effort across non-coding tasks.",
    inspiration:
      "Built to answer a question everyone asks but nobody measures: \"How much time is AI actually saving?\" — designed for both personal productivity tracking and enterprise ROI analysis.",
    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "TimescaleDB",
      "Redis",
      "OpenTelemetry",
      "OpenAI",
      "Docker",
    ],
    gradient: "from-emerald-500/10 to-teal-500/10",
    details: [
      "Plugs into AI providers like Langfuse — tracks every LLM call with full context and metadata",
      "Analyzes each task the LLM performed and estimates equivalent human completion time",
      "Provides dashboards with time-saved metrics, cost analysis, and productivity trends",
      "Works for both personal use and enterprise-wide deployment",
      "SDK and webhook integrations for connecting to any AI provider or workflow",
      "Time-series analytics powered by TimescaleDB for historical trend analysis",
    ],
  },
  {
    title: "RetroMind Arena",
    description:
      "A retro gaming platform with 18 classic games where you play against AI-powered opponents — or watch AI models battle each other.",
    inspiration:
      "Started from curiosity about which LLM would beat the other at chess, then evolved into a full arena of 18 classic games that doubles as a benchmark for model reasoning and strategic thinking.",
    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "WebSocket",
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "Docker",
    ],
    gradient: "from-amber-500/10 to-orange-500/10",
    details: [
      "18 classic games including Chess, Checkers, Word Puzzles, and more versus-style retro games",
      "Play against AI opponents — select any model (GPT, Claude, Gemini) and difficulty level",
      "Computer vs Computer mode: pit different AI models against each other and compare performance",
      "Real-time gameplay via WebSocket connections",
      "Tracks win rates, move quality, and thinking patterns across models",
      "Web-based — no downloads required, play directly in the browser",
    ],
  },
]

function InspirationBulb({ isActive }: { isActive: boolean }) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315]

  return (
    <div className="relative cursor-pointer p-2">

      {rays.map((angle) => (
        <div
          key={angle}
          className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
          style={{
            width: "1px",
            height: isActive ? "14px" : "6px",
            background: `linear-gradient(to top, rgba(251,191,36,${isActive ? 0.8 : 0.3}), transparent)`,
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${isActive ? -14 : -10}px)`,
            opacity: isActive ? 1 : 0.4,
            filter: isActive ? "blur(0.3px)" : "none",
          }}
        />
      ))}

      <div
        className="absolute inset-[-12px] rounded-full transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
          opacity: isActive ? 1 : 0,
        }}
      />

      <Lightbulb
        className="w-[22px] h-[22px] relative z-10 transition-all duration-300"
        style={{
          color: isActive ? "rgba(251,191,36,1)" : "rgba(251,191,36,0.55)",
          filter: isActive
            ? "drop-shadow(0 0 4px rgba(251,191,36,0.8)) drop-shadow(0 0 10px rgba(251,191,36,0.4)) drop-shadow(0 0 20px rgba(251,191,36,0.2))"
            : "drop-shadow(0 0 2px rgba(251,191,36,0.25))",
          transform: isActive ? "scale(1.1)" : "scale(1)",
        }}
      />
    </div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeInspiration, setActiveInspiration] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
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

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedProject) {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden"
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-[auto] md:min-h-screen flex flex-col items-center justify-center py-12 md:py-20 px-4 relative"
      onClick={() => setActiveInspiration(null)}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/projects-bg.jpg')`,
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-transparent" />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <h2
          className={`text-3xl md:text-6xl font-bold mb-4 md:mb-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <span className="text-white">Projects</span>
        </h2>

        <p
          className="text-base md:text-lg text-slate-100 text-center mb-8 md:mb-16 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.8)" }}
        >
          Side projects where curiosity meets code — each one born from a real problem I wanted to solve
        </p>

        <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              className={`group relative min-w-[80vw] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink overflow-hidden backdrop-blur-[6px] bg-white/5 border-2 border-white/20 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="absolute top-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                }}
              />
              <div
                className="absolute top-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                }}
              />
              <div
                className="absolute bottom-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                }}
              />
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

              <div className="relative p-5 md:p-8 z-30 flex flex-col h-full">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    className="text-lg md:text-3xl font-bold mb-2 md:mb-3 text-white transition-all"
                    style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)" }}
                  >
                    {project.title}
                  </h3>

                  <div
                    className="relative flex-shrink-0 mt-0.5"
                    onMouseEnter={() => setActiveInspiration(index)}
                    onMouseLeave={() => setActiveInspiration(null)}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveInspiration(activeInspiration === index ? null : index)
                    }}
                  >
                    <InspirationBulb isActive={activeInspiration === index} />

                    <div className={`absolute right-0 top-full mt-2 w-72 ${activeInspiration === index ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"} transition-all duration-200 origin-top-right z-50`}>
                      <div className="relative backdrop-blur-2xl bg-black/90 border border-white/20 rounded-xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.7)]">
                        <div
                          className="absolute inset-0 pointer-events-none rounded-xl"
                          style={{
                            boxShadow:
                              "inset 1px 1px 2px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 2px 0 rgba(255, 255, 255, 0.1)",
                          }}
                        />
                        <div
                          className="absolute top-0 left-4 w-[40px] h-[1px] pointer-events-none"
                          style={{
                            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
                          }}
                        />
                        <div className="relative z-10">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Inspiration</span>
                          </div>
                          <p
                            className="text-slate-200 text-sm leading-relaxed"
                            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                          >
                            {project.inspiration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p
                  className="text-slate-200 leading-relaxed mb-5 text-sm md:text-base"
                  style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)" }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs md:text-sm bg-white/10 rounded-full border border-white/20 text-white/90 hover:bg-white/20 hover:border-white/40 transition-colors"
                      style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer relative px-5 py-2.5 text-sm rounded-full border-2 border-slate-400/60 backdrop-blur-md bg-white/5 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-slate-400/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden"
                  >
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
                    <span className="relative z-20">View Details →</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(15,10,30,0.78) 50%, rgba(0,0,0,0.82) 100%)" }}
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="relative max-w-2xl w-full max-h-[85vh] overflow-hidden border-2 border-white/20 backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] animate-in zoom-in-95 duration-300 slide-in-from-bottom-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            <div
              className="absolute top-0 right-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            <div
              className="absolute bottom-0 left-4 w-[70px] h-[1px] pointer-events-none z-[11]"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
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
                  "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 3px 0px rgba(255,255,255,0.2)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-60 rounded-2xl"
              style={{
                boxShadow: "inset 1px 1px 2px 0px rgba(255,255,255,0.5)",
              }}
            />

            <button
              ref={closeButtonRef}
              onClick={() => setSelectedProject(null)}
              className="cursor-pointer group/icon absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-30"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white transition-transform duration-200 group-hover/icon:scale-115 group-hover/icon:rotate-12" />
            </button>

            <div className="relative z-20 p-4 md:p-8 overflow-y-auto max-h-[85vh]">
              <h3
                id="project-modal-title"
                className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
              >
                {selectedProject.title}
              </h3>

              <p
                className="text-slate-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              >
                {selectedProject.description}
              </p>

              <div className="border-t border-white/10 pt-4 md:pt-5 mb-4 md:mb-6">
                <h4
                  className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                >
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm bg-white/10 rounded-full border border-white/20 text-white/90"
                      style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 md:pt-5">
                <h4
                  className="text-sm md:text-lg font-semibold text-white mb-3 md:mb-4"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                >
                  Key Features
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {selectedProject.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-slate-300 leading-relaxed flex gap-2 md:gap-3 text-xs md:text-base"
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                    >
                      <span className="text-white/50 mt-0.5 md:mt-1 flex-shrink-0">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
