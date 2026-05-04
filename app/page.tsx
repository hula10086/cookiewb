"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Hero from "@/components/Hero"
import MarkdownContent from "@/components/MarkdownContent"
import BackToTop from "@/components/BackToTop"
import ParticleBackground from "@/components/ParticleBackground"
import { chapters } from "@/lib/content"
import { cn } from "@/lib/utils"

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const [showHero, setShowHero] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )

    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Handle scroll to show/hide hero
  useEffect(() => {
    const handleScroll = () => {
      setShowHero(window.scrollY < window.innerHeight * 0.5)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigate = (id: string) => {
    const element = sectionRefs.current.get(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el)
  }

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <AnimatePresence>
        {showHero && (
          <motion.div
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div id="docs-content" className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

            <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-12">
              <div className="max-w-4xl mx-auto">
                {/* Document Header */}
                <div className="mb-12 pb-8 border-b border-border">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Cookie小铺
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      全景式开发手册 — 面向情侣的微信小程序架构文档
                    </p>
                    <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                        版本 2026.05.04
                      </span>
                      <span>22 个云函数</span>
                      <span>•</span>
                      <span>25 个数据库集合</span>
                      <span>•</span>
                      <span>45 个页面</span>
                    </div>
                  </motion.div>
                </div>

                {/* Chapters */}
                <div className="space-y-16">
                  {chapters.map((chapter, chapterIndex) => (
                    <motion.section
                      key={chapter.id}
                      id={chapter.id}
                      ref={registerRef(chapter.id)}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="scroll-mt-24"
                    >
                      {/* Chapter Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">{chapter.emoji}</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                          {chapter.title}
                        </h2>
                      </div>

                      {/* Chapter Content */}
                      {chapter.content && (
                        <div className="mb-8">
                          <MarkdownContent content={chapter.content} />
                        </div>
                      )}

                      {/* Sub Sections */}
                      {chapter.sections.length > 0 && (
                        <div className="space-y-10">
                          {chapter.sections.map((section, sectionIndex) => (
                            <motion.div
                              key={section.id}
                              id={section.id}
                              ref={registerRef(section.id)}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{ duration: 0.4, delay: sectionIndex * 0.05 }}
                              className="scroll-mt-24"
                            >
                              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full" />
                                {section.title}
                              </h3>
                              <div className="pl-4">
                                <MarkdownContent content={section.content} />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.section>
                  ))}
                </div>

                {/* Footer */}
                <footer className="mt-24 pt-8 border-t border-border text-center text-muted-foreground">
                  <p>Cookie小铺开发团队 © 2026</p>
                  <p className="text-sm mt-2">用 ❤️ 构建</p>
                </footer>
              </div>
            </main>

            {/* Right TOC - Desktop */}
            <aside className="hidden xl:block w-64 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto py-4 px-4">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                本页目录
              </div>
              <nav className="space-y-1">
                {chapters.map((ch) => (
                  <div key={ch.id}>
                    <button
                      onClick={() => handleNavigate(ch.id)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors",
                        activeSection === ch.id
                          ? "text-primary font-medium bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <span className="truncate block">{ch.emoji} {ch.title}</span>
                    </button>
                    {ch.sections.length > 0 && (
                      <div className="ml-3 mt-1 space-y-1">
                        {ch.sections.map((sec) => (
                          <button
                            key={sec.id}
                            onClick={() => handleNavigate(sec.id)}
                            className={cn(
                              "w-full text-left px-2 py-1 rounded-md text-xs transition-colors",
                              activeSection === sec.id
                                ? "text-primary font-medium bg-primary/10"
                                : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/30"
                            )}
                          >
                            <span className="truncate block">{sec.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </aside>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}
