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

const experiences: ExperienceItem[] = [
  {
    id: 5,
    title: "Senior Software Developer",
    organization: "Leading Tech Corporation",
    period: "July 2024 - Present",
    type: "work",
    side: "left",
    description: "Leading development of enterprise-scale applications and mentoring engineering teams.",
    details: [
      "Lead architect for mission-critical enterprise applications",
      "Manage team of 8 engineers across multiple projects",
      "Design and implement scalable cloud infrastructure on AWS",
      "Drive technical strategy and architectural decisions",
      "Reduced system latency by 70% through optimization initiatives",
      "Implemented advanced security measures and compliance standards",
      "Mentor junior and mid-level developers",
      "Collaborate with product and design teams on feature roadmaps",
      "Establish engineering best practices and coding standards",
      "Present quarterly technical reviews to executive leadership",
      "Drive innovation through POCs and technology evaluations",
      "Champion DevOps culture and continuous improvement initiatives",
    ],
  },
  {
    id: 4,
    title: "Master of Science in Computer Science",
    organization: "Oregon State University",
    period: "2022 - 2024",
    type: "education",
    side: "right",
    description: "Advanced studies in artificial intelligence, machine learning, and distributed systems.",
    details: [
      "Specialized in Machine Learning and Artificial Intelligence",
      "Completed thesis on deep learning applications in computer vision",
      "GPA 3.9/4.0 with focus on advanced algorithms and theory",
      "Research assistant working on neural network optimization",
      "Published 2 papers in peer-reviewed conferences",
      "Collaborated with industry partners on real-world AI projects",
      "Completed coursework in Cloud Computing and Big Data",
      "Presented research findings at international conferences",
      "Received Graduate Research Fellowship",
      "Contributed to cutting-edge research in NLP and computer vision",
    ],
  },
  {
    id: 3,
    title: "Software Developer",
    organization: "Innovation Labs",
    period: "2021 - 2022",
    type: "work",
    side: "left",
    description: "Led development of scalable microservices and cloud-based solutions.",
    details: [
      "Architected and implemented microservices using Node.js and Docker",
      "Designed and optimized database schemas for high-traffic applications",
      "Implemented CI/CD pipelines using Jenkins and GitHub Actions",
      "Led team of 3 developers in delivering critical features",
      "Migrated legacy monolithic application to microservices architecture",
      "Reduced deployment time by 60% through automation",
      "Implemented comprehensive monitoring and logging solutions",
      "Conducted technical interviews and evaluated candidates",
      "Presented technical solutions to stakeholders and leadership",
      "Contributed to open-source projects and community initiatives",
    ],
  },
  {
    id: 2,
    title: "Associate Software Developer",
    organization: "Tech Company Inc.",
    period: "2019 - 2021",
    type: "work",
    side: "left",
    description: "Developed and maintained web applications using modern JavaScript frameworks.",
    details: [
      "Built responsive web applications using React and TypeScript",
      "Collaborated with cross-functional teams to deliver features",
      "Implemented RESTful APIs and integrated third-party services",
      "Participated in code reviews and maintained coding standards",
      "Optimized application performance and reduced load times by 40%",
      "Worked closely with designers to implement pixel-perfect UIs",
      "Wrote comprehensive unit and integration tests",
      "Contributed to technical documentation and best practices",
      "Mentored junior developers and conducted knowledge sharing sessions",
      "Participated in agile development processes and sprint planning",
    ],
  },
  {
    id: 1,
    title: "Bachelor of Science in Computer Science",
    organization: "University Name",
    period: "2016 - 2020",
    type: "education",
    side: "right",
    description: "Foundation in computer science principles, algorithms, and software engineering.",
    details: [
      "Graduated with honors, GPA 3.8/4.0",
      "Completed coursework in Data Structures, Algorithms, and System Design",
      "Led senior capstone project on distributed systems",
      "Teaching Assistant for Introduction to Programming",
      "Member of ACM and Computer Science Society",
      "Participated in multiple hackathons and coding competitions",
      "Completed research project on machine learning applications",
      "Received Dean's List recognition for 6 consecutive semesters",
      "Collaborated on cross-functional team projects",
      "Published paper on algorithm optimization techniques",
    ],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null)
  const [cardVisibility, setCardVisibility] = useState<boolean[]>(experiences.map(() => false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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
    const cardRefs = document.querySelectorAll("[data-experience-card]")

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-card-index"))
            setCardVisibility((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        })
      },
      { threshold: 0.15 },
    )

    cardRefs.forEach((card) => cardObserver.observe(card))

    return () => {
      cardRefs.forEach((card) => cardObserver.unobserve(card))
    }
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/experience-bg.jpg')",
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
          className={`text-4xl md:text-6xl font-bold mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{
            textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.2)",
          }}
        >
          <span className="text-white">Experience</span>
        </h2>

        <div className="hidden md:flex justify-between items-start max-w-6xl mx-auto mb-8 px-4">
          <div
            className={`w-[45%] text-center transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/20 backdrop-blur-[2px] bg-white/5">
              <Briefcase className="w-5 h-5 text-green-300" />
              <h3 className="text-xl font-bold text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                Work Experience
              </h3>
            </div>
          </div>
          <div
            className={`w-[45%] text-center transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/20 backdrop-blur-[2px] bg-white/5">
              <GraduationCap className="w-5 h-5 text-blue-300" />
              <h3 className="text-xl font-bold text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                Education
              </h3>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central vertical line connector */}
          <div
            className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/10 via-white/30 to-white/10 -translate-x-1/2 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            }`}
            style={{ transformOrigin: "top" }}
          />

          <div className="relative space-y-4">
            {experiences.map((experience, index) => {
              const isLeft = experience.side === "left"
              const needsUpwardShift = index === 1 || index === 2

              return (
                <div
                  key={experience.id}
                  data-experience-card
                  data-card-index={index}
                  className={`relative ${isLeft ? "md:pr-[52%]" : "md:pl-[52%]"} ${needsUpwardShift ? "md:-mt-32" : ""}`}
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
                      className="w-full text-left border-2 border-white/20 backdrop-blur-[2px] bg-white/5 rounded-xl p-4 md:p-5 transition-all duration-200 hover:border-white/30 hover:bg-white/8 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] relative overflow-hidden"
                    >
                      {/* Glass corner highlights */}
                      <div
                        className="absolute top-0 left-4 w-[50px] h-[1px] pointer-events-none z-[11]"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                      />
                      <div
                        className="absolute top-0 right-4 w-[50px] h-[1px] pointer-events-none z-[11]"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-4 w-[50px] h-[1px] pointer-events-none z-[11]"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-4 w-[50px] h-[1px] pointer-events-none z-[11]"
                        style={{
                          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)",
                        }}
                      />

                      {/* Glass shine layers */}
                      <div
                        className="absolute inset-0 pointer-events-none z-10 rounded-xl"
                        style={{
                          boxShadow:
                            "inset 2px 2px 3px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 3px 0px rgba(255,255,255,0.2)",
                        }}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none z-10 opacity-60 rounded-xl"
                        style={{
                          boxShadow: "inset 1px 1px 2px 0px rgba(255,255,255,0.5)",
                        }}
                      />

                      <div className="relative z-20">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <h3
                              className="text-lg md:text-xl font-bold text-white mb-1"
                              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                            >
                              {experience.title}
                            </h3>
                            <p
                              className="text-slate-200 text-sm font-medium"
                              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                            >
                              {experience.organization}
                            </p>
                          </div>
                          <div
                            className={`p-2 rounded-lg ${
                              experience.type === "education"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-green-500/20 text-green-300"
                            }`}
                          >
                            {experience.type === "education" ? (
                              <GraduationCap className="w-5 h-5" />
                            ) : (
                              <Briefcase className="w-5 h-5" />
                            )}
                          </div>
                        </div>

                        <p
                          className="text-slate-300 text-xs font-mono mb-2"
                          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                        >
                          {experience.period}
                        </p>

                        <p
                          className="text-slate-300 text-sm leading-relaxed line-clamp-2"
                          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                        >
                          {experience.description}
                        </p>

                        <span
                          className="inline-block mt-3 text-xs text-white/70 hover:text-white"
                          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                        >
                          Click for details →
                        </span>
                      </div>
                    </button>

                    <div className="hidden md:block">
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
                          width: "calc(50% + 2.5rem)",
                          transform: `translateY(-50%) ${cardVisibility[index] ? "scaleX(1)" : "scaleX(0)"}`,
                          transitionDelay: `${200}ms`,
                        }}
                      />
                      {/* Dot on center line */}
                      <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-out ${
                          cardVisibility[index] ? "opacity-100 scale-100" : "opacity-0 scale-0"
                        }`}
                        style={{
                          transitionDelay: `${300}ms`,
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full bg-white border-2 border-white/60 relative"
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedExperience(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[80vh] overflow-hidden border-2 border-white/20 backdrop-blur-[2px] bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] animate-in zoom-in-95 duration-200 slide-in-from-bottom-4"
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
              onClick={() => setSelectedExperience(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-30"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <div className="relative z-20 p-6 md:p-8 overflow-y-auto max-h-[80vh]">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    selectedExperience.type === "education"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {selectedExperience.type === "education" ? (
                    <GraduationCap className="w-6 h-6" />
                  ) : (
                    <Briefcase className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                  >
                    {selectedExperience.title}
                  </h3>
                  <p
                    className="text-slate-200 text-lg font-medium mb-1"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  >
                    {selectedExperience.organization}
                  </p>
                  <p className="text-slate-300 text-sm font-mono" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                    {selectedExperience.period}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                {selectedExperience.description}
              </p>

              <div className="border-t border-white/10 pt-6">
                <h4
                  className="text-lg font-semibold text-white mb-4"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                >
                  Key Highlights
                </h4>
                <ul className="space-y-3">
                  {selectedExperience.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-slate-300 leading-relaxed flex gap-3"
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                    >
                      <span className="text-white/50 mt-1">•</span>
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
