"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Torus, MeshDistortMaterial } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as THREE from "three"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Message is required"),
})

type ContactFormData = z.infer<typeof contactSchema>

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
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("submitting")
    try {
      const res = await fetch("https://formsubmit.co/ajax/yatin.kumar5284@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: `Portfolio Message from ${data.name}`,
        }),
      })
      if (!res.ok) throw new Error()
      setFormStatus("success")
      reset()
      setTimeout(() => setFormStatus("idle"), 5000)
    } catch {
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 4000)
    }
  }

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
    { name: "GitHub", url: "https://github.com/highOnBits", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com/in/yk5284", icon: Linkedin },
    { name: "Email", url: "mailto:yatin.kumar5284@gmail.com", icon: Mail },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-[auto] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 relative"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/contact-bg.jpg')`,
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
            filter: "blur(1px)", // Reduced blur from blur-sm to 1px for very subtle effect
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/85 to-black/85" />
      </div>

      <div className="absolute inset-0 opacity-20">
        {isVisible && (
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <AnimatedTorus />
          </Canvas>
        )}
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <h2
          className={`text-3xl md:text-6xl font-bold mb-4 md:mb-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <span className="text-white">Get In Touch</span>
        </h2>

        <p className="text-base md:text-xl text-center text-slate-100 mb-8 md:mb-16 leading-relaxed max-w-2xl mx-auto"
          style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.8)" }}
        >
          Have an idea worth building, a problem worth solving, or just want to talk shop? I'm always up for it.
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
          <div className="relative z-20 p-5 md:p-12">
            <div className="text-center space-y-5 md:space-y-8">
              <div>
                <h3 className="text-lg md:text-4xl font-bold mb-2 text-white break-all md:break-normal" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                  yatin.kumar5284@gmail.com
                </h3>
                <p className="text-muted-foreground text-sm md:text-lg" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                  Good conversations start with a simple hello
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
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
                      <link.icon className="relative z-20 w-4 h-4 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-12" />
                      <span className="relative z-20 ml-1.5" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                        {link.name}
                      </span>
                    </a>
                  </Button>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto space-y-4 text-left">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Your Name"
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("email")}
                    placeholder="Your Email"
                    type="email"
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <textarea
                    id="contact-message"
                    {...register("message")}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-200 resize-none"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting" || formStatus === "success"}
                    className="cursor-pointer relative group px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold backdrop-blur-[2px] bg-white/5 border-2 border-white/20 rounded-full overflow-hidden hover:-translate-y-1 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                  >
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
                    <span className="relative z-20 flex items-center gap-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                      {formStatus === "submitting" && (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      )}
                      {formStatus === "success" && (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          Message Sent!
                        </>
                      )}
                      {formStatus === "error" && (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          Failed — Try Again
                        </>
                      )}
                      {formStatus === "idle" && (
                        <>
                          <Send className="w-5 h-5 transition-transform duration-200 group-hover:scale-115 group-hover:rotate-12" />
                          Send a Message
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>

        <footer className="mt-8 md:mt-16 text-center text-muted-foreground text-sm md:text-base">
          <p>© 2025 Yatin Kumar. Crafted with React, Next.js & Three.js</p>
        </footer>
      </div>
    </section>
  )
}
