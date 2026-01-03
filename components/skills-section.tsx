"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Database, Cloud, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    color: "#61dafb",
  },
  {
    title: "Backend",
    icon: Database,
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    color: "#68a063",
  },
  {
    title: "DevOps",
    icon: Cloud,
    skills: ["Docker", "AWS", "CI/CD", "Git", "Linux", "Nginx"],
    color: "#2496ed",
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["VS Code", "Figma", "Postman", "Jest", "Webpack", "ESLint"],
    color: "#ffd43b",
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: "url('/images/skills-bg.jpg')",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/85 to-transparent" />
      </div>

      <h2
        className={`text-4xl md:text-6xl font-bold mb-4 text-center transition-all duration-700 relative z-10 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <span className="text-white" style={{ textShadow: "0 2px 20px rgba(0, 0, 0, 0.8)" }}>
          Technical Arsenal
        </span>
      </h2>

      <p
        className={`text-lg text-slate-100 text-center mb-16 max-w-2xl leading-relaxed relative z-10 transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
        style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.8)" }}
      >
        A comprehensive toolkit of modern technologies and frameworks I work with
      </p>

      <div className="w-full max-w-6xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={category.title}
            className={`relative backdrop-blur-[2px] bg-white/5 border-2 border-white/20 rounded-2xl overflow-hidden transition-all duration-600 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: `${categoryIndex * 100}ms` }}
          >
            {/* Corner highlights */}
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
              {/* Category header with icon */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    backgroundColor: `${category.color}20`,
                    border: `2px solid ${category.color}40`,
                  }}
                >
                  <category.icon
                    className="w-6 h-6"
                    style={{
                      color: category.color,
                      filter: `drop-shadow(0 0 8px ${category.color}80)`,
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)" }}>
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className={`px-4 py-2 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                    style={{
                      textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)",
                      transitionDelay: `${categoryIndex * 100 + skillIndex * 50}ms`,
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
