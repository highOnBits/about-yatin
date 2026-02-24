"use client"

import { useEffect, useRef, useState } from "react"
import { X, GraduationCap, Briefcase } from "lucide-react"

interface ExperienceItem {
  id: number
  title: string
  organization: string
  period: string
  type: "education" | "work"
  description: string
  details: string[]
  side: "left" | "right"
}

// Experience data array with work and education items
// Note: Items are ordered chronologically from newest to oldest
// The 'side' property determines timeline positioning (left for work, right for education)
const experiences: ExperienceItem[] = [
  {
    id: 5,
    title: "Senior Software Developer",
    organization: "Aptean · Alpharetta, GA",
    period: "July 2024 – Present",
    type: "work",
    side: "left",
    description:
      "On Aptean's Platform team, defining shared AI infrastructure and tooling standards that accelerate development across 70+ enterprise products.",
    details: [
      "Established Intelligence Studio, a LangChain-based AI workflow orchestration platform enabling non-technical users to build enterprise-integrated AI automations; led the organization's foundational AI layer and accelerated cross-product AI adoption",
      "Designed and developed Digital Co-Workers, an autonomous multi-agent platform built on Python, Azure OpenAI, and Claude Code, with persistent memory, feedback-loop, and Human-in-the-Loop controls; adopted by 25+ PMs and executives, reducing manual effort by ~35%",
      "Built BuildEngine, a distributed AI-powered SDLC automation system converting natural-language requirements into production-ready code, automated testing via Claude-in-Chrome, review, merge, and deployment; automated ~67% of workflows, reducing delivery time by ~40%",
      "Led Aptean Drive, a multi-tenant RBAC-enforced document and RAG platform indexing 10M+ files; reduced storage costs by 70–80% and improved discovery speed 50%",
      "Owned full SDLC — architecture, IaC (Terraform), CI/CD (GitHub Actions), observability — achieving sub-5-min blue/green deployments with zero downtime",
    ],
  },
  {
    id: 4,
    title: "MS in Computer Science",
    organization: "Oregon State University · Corvallis, OR",
    period: "Sept 2022 – June 2024",
    type: "education",
    side: "right",
    description: "Graduate studies in computer science with a CGPA of 3.80/4.0.",
    details: [
      "CGPA: 3.80 / 4.0",
      "Graduate Research & Teaching Assistant (May 2023 – June 2024)",
      "Mentored 120+ students in Software Engineering, running intensive Git, TDD, and CI/CD labs that equipped them with industry-ready skills",
      "Co-developed a thermoelectric system converting industrial waste heat to electricity; prototype achieved 5% energy-recapture efficiency",
      "Coursework in Distributed Systems, Machine Learning, Cloud Computing, and Advanced Algorithms",
    ],
  },
  {
    id: 3,
    title: "Software Developer",
    organization: "Aptean · Bengaluru, India",
    period: "March 2019 – July 2022",
    type: "work",
    side: "left",
    description:
      "Full-stack development on enterprise banking and compliance products, with a focus on microservices, DevOps, and Agile delivery.",
    details: [
      "Expanded global-bank customer base 6% by shipping new complaint-management modules and an SMS microservice (Twilio API on AWS)",
      "Scrum Master in an Agile environment for a 14-member team; velocity increased 30% in 3 quarters",
      "Built and maintained RESTful APIs and microservices on C# / .NET and Python",
      "Collaborated cross-functionally with product, QA, and design teams to deliver features on schedule",
    ],
  },
  {
    id: 1,
    title: "BE in Computer Science",
    organization: "Chitkara University · India",
    period: "Aug 2016 – June 2020",
    type: "education",
    side: "right",
    description: "Undergraduate studies in computer science with a CGPA of 8.80/10.",
    details: [
      "CGPA: 8.80 / 10",
      "Strong foundation in Data Structures, Algorithms, System Design, and Software Engineering",
      "Participated in competitive programming and hackathons",
    ],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null)
  const [cardVisibility, setCardVisibility] = useState<boolean[]>(experiences.map(() => false))
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
          setCardVisibility(experiences.map(() => false))
        }
      },
      { threshold: 0.1 },
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

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedExperience) {
        setSelectedExperience(null)
      }
    }

    if (selectedExperience) {
      document.addEventListener("keydown", handleEscapeKey)
      // Focus the close button when modal opens for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [selectedExperience])

  // Intersection Observer for individual card animations
  // Observes each card and triggers visibility state when it enters viewport
  useEffect(() => {
    const cardRefs = document.querySelectorAll("[data-experience-card]")

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-card-index"))
          setCardVisibility((prev) => {
            const newState = [...prev]
            newState[index] = entry.isIntersecting
            return newState
          })
        })
      },
      { threshold: 0.15 },
    )

    cardRefs.forEach((card) => cardObserver.observe(card))

    return () => {
      cardRefs.forEach((card) => cardObserver.unobserve(card))
    }
  }, [experiences.length]) // Re-run if number of experiences changes

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-[auto] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 relative"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/experience-bg.jpg')`,
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black/70" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.25_0.03_265_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.25_0.03_265_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="max-w-7xl w-full relative z-10">
        <h2
          className={`text-3xl md:text-6xl font-bold mb-8 md:mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{
            textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.2)",
          }}
        >
          <span className="text-white">Experience</span>
        </h2>

        {/* Category headers - responsive for both mobile and desktop */}
        <div className="flex justify-between items-start max-w-6xl mx-auto mb-4 md:mb-8 px-2 md:px-4">
          <div
            className={`w-[45%] text-center transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="group/icon inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl border md:border-2 border-white/20 backdrop-blur-[2px] bg-white/5">
              <Briefcase className="w-3 h-3 md:w-5 md:h-5 text-green-300 transition-transform duration-200 group-hover/icon:scale-115 group-hover/icon:rotate-12" />
              <h3 className="text-xs md:text-xl font-bold text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                <span className="hidden md:inline">Work Experience</span>
                <span className="md:hidden">Work</span>
              </h3>
            </div>
          </div>
          <div
            className={`w-[45%] text-center transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="group/icon inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl border md:border-2 border-white/20 backdrop-blur-[2px] bg-white/5">
              <GraduationCap className="w-3 h-3 md:w-5 md:h-5 text-blue-300 transition-transform duration-200 group-hover/icon:scale-115 group-hover/icon:rotate-12" />
              <h3 className="text-xs md:text-xl font-bold text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                <span className="hidden md:inline">Education</span>
                <span className="md:hidden">Education</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central vertical line connector - same for mobile and desktop */}
          <div
            className={`absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/10 via-white/30 to-white/10 -translate-x-1/2 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`}
            style={{ transformOrigin: "top" }}
          />

          <div className="relative space-y-4 md:space-y-8">
            {experiences.map((experience, index) => {
              const isLeft = experience.side === "left"

              return (
                <div
                  key={experience.id}
                  data-experience-card
                  data-card-index={index}
                  className={`relative ${isLeft ? "pr-[52%]" : "pl-[52%]"}`}
                >
                  {/* Timeline Item */}
                  <div
                    className={`transition-all duration-600 ease-out ${
                      cardVisibility[index]
                        ? "opacity-100 translate-y-0 translate-x-0 scale-100"
                        : `opacity-0 translate-y-8 ${isLeft ? "-translate-x-8" : "translate-x-8"} scale-95`
                    }`}
                  >
                    <button
                      onClick={() => setSelectedExperience(experience)}
                      className="group/card w-full text-left border border-white/20 md:border-2 backdrop-blur-[2px] bg-white/5 rounded-lg md:rounded-xl p-2 md:p-5 transition-all duration-200 hover:border-white/30 hover:bg-white/8 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] relative overflow-hidden"
                    >
                      {/* Glass corner highlights - hidden on mobile for cleaner look */}
                      <div
                        className="hidden md:block absolute top-0 left-4 w-[50px] h-[1px] pointer-events-none z-[11]"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                      />
                      <div
                        className="hidden md:block absolute top-0 right-4 w-[50px] h-[1px] pointer-events-none z-[11]"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                      />
                      <div
                        className="hidden md:block absolute bottom-0 left-4 w-[50px] h-[1px] pointer-events-none z-[11]"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                      />
                      <div
                        className="hidden md:block absolute bottom-0 right-4 w-[50px] h-[1px] pointer-events-none z-[11]"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                      />

                      {/* Glass shine layers */}
                      <div
                        className="absolute inset-0 pointer-events-none z-10 rounded-lg md:rounded-xl"
                        style={{
                          boxShadow:
                            "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 3px 0px rgba(255,255,255,0.2)",
                        }}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none z-10 opacity-60 rounded-lg md:rounded-xl"
                        style={{
                          boxShadow: "inset 1px 1px 2px 0px rgba(255,255,255,0.5)",
                        }}
                      />

                      <div className="relative z-20">
                        <div className="flex items-start justify-between gap-1 md:gap-3 mb-1 md:mb-2">
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1 truncate"
                              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                            >
                              {experience.title}
                            </h3>
                            <p
                              className="text-slate-200 text-xs md:text-sm font-medium truncate"
                              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                            >
                              {experience.organization}
                            </p>
                          </div>
                          <div
                            className={`p-1 md:p-2 rounded-md md:rounded-lg flex-shrink-0 ${
                              experience.type === "education"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {experience.type === "education" ? (
                              <GraduationCap className="w-3 h-3 md:w-5 md:h-5 transition-transform duration-200 group-hover/card:scale-115 group-hover/card:rotate-12" />
                            ) : (
                              <Briefcase className="w-3 h-3 md:w-5 md:h-5 transition-transform duration-200 group-hover/card:scale-115 group-hover/card:rotate-12" />
                            )}
                          </div>
                        </div>

                        <p
                          className="text-slate-300 text-[10px] md:text-xs font-mono mb-1 md:mb-2"
                          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                        >
                          {experience.period}
                        </p>

                        <p
                          className="text-slate-300 text-xs md:text-sm leading-relaxed line-clamp-2 hidden md:block"
                          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                        >
                          {experience.description}
                        </p>

                        <span
                          className="inline-block mt-1 md:mt-3 text-[10px] md:text-xs text-white/70 hover:text-white hover:underline cursor-pointer"
                          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                        >
                          <span className="hidden md:inline">Click for details →</span>
                          <span className="md:hidden">Tap →</span>
                        </span>
                      </div>
                    </button>

                    {/* Timeline connector - same for mobile and desktop */}
                    <div>
                      {/* Horizontal line from card edge to center line */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 h-0.5 transition-all duration-500 ease-out ${
                          cardVisibility[index] ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                        } ${
                          isLeft
                            ? "left-full bg-gradient-to-r from-white/40 to-white/20 origin-left"
                            : "right-full bg-gradient-to-l from-white/40 to-white/20 origin-right"
                        }`}
                        style={{
                          width: "calc(2% + 0.5rem)",
                          transform: `translateY(-50%) ${cardVisibility[index] ? "scaleX(1)" : "scaleX(0)"}`,
                          transitionDelay: `${200}ms`,
                        }}
                      />
                      {/* Dot on center line */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-400 ease-out ${
                          cardVisibility[index] ? "opacity-100 scale-100" : "opacity-0 scale-0"
                        } ${
                          isLeft ? "left-full" : "right-full"
                        }`}
                        style={{
                          [isLeft ? "marginLeft" : "marginRight"]: "calc(2% + 0.5rem)",
                          transitionDelay: `${300}ms`,
                        }}
                      >
                        <div
                          className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white border md:border-2 border-white/60 relative"
                          style={{
                            boxShadow:
                              "0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.15), inset 0 0 5px rgba(255,255,255,0.5)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {selectedExperience && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(15,10,30,0.78) 50%, rgba(0,0,0,0.82) 100%)" }}
          onClick={() => setSelectedExperience(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="relative max-w-2xl w-full max-h-[80vh] overflow-hidden border-2 border-white/20 backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] animate-in zoom-in-95 duration-300 slide-in-from-bottom-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass corner highlights */}
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

            {/* Glass shine layers */}
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

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={() => setSelectedExperience(null)}
              className="group/icon absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-30"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white transition-transform duration-200 group-hover/icon:scale-115 group-hover/icon:rotate-12" />
            </button>

            {/* Content */}
            <div className="relative z-20 p-4 md:p-8 overflow-y-auto max-h-[80vh]">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div
                  className={`group/icon p-2 md:p-3 rounded-lg md:rounded-xl ${
                    selectedExperience.type === "education"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {selectedExperience.type === "education" ? (
                    <GraduationCap className="w-4 h-4 md:w-6 md:h-6 transition-transform duration-200 group-hover/icon:scale-115 group-hover/icon:rotate-12" />
                  ) : (
                    <Briefcase className="w-4 h-4 md:w-6 md:h-6 transition-transform duration-200 group-hover/icon:scale-115 group-hover/icon:rotate-12" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    id="modal-title"
                    className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                  >
                    {selectedExperience.title}
                  </h3>
                  <p
                    className="text-slate-200 text-sm md:text-lg font-medium mb-0.5 md:mb-1"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  >
                    {selectedExperience.organization}
                  </p>
                  <p className="text-slate-300 text-xs md:text-sm font-mono" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                    {selectedExperience.period}
                  </p>
                </div>
              </div>

              <p id="modal-description" className="text-slate-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                {selectedExperience.description}
              </p>

              <div className="border-t border-white/10 pt-4 md:pt-6">
                <h4
                  className="text-sm md:text-lg font-semibold text-white mb-3 md:mb-4"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                >
                  Key Highlights
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {selectedExperience.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-slate-300 text-xs md:text-base leading-relaxed flex gap-2 md:gap-3"
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
