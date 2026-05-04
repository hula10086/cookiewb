"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Menu, X } from "lucide-react"
import { chapters } from "@/lib/content"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    // Auto-expand chapter containing active section
    const activeChapter = chapters.find(ch => 
      ch.id === activeSection || ch.sections.some(s => s.id === activeSection)
    )
    if (activeChapter) {
      setExpandedChapters(prev => new Set([...prev, activeChapter.id]))
    }
  }, [activeSection])

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleNavigate = (id: string) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  const sidebarContent = (
    <div className="h-full overflow-y-auto py-4 px-3">
      <div className="mb-4 px-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          目录
        </h2>
      </div>
      <nav className="space-y-1">
        {chapters.map((chapter) => {
          const isExpanded = expandedChapters.has(chapter.id)
          const isActive = chapter.id === activeSection
          const hasActiveSection = chapter.sections.some(s => s.id === activeSection)

          return (
            <div key={chapter.id}>
              <button
                onClick={() => {
                  if (chapter.sections.length > 0) {
                    toggleChapter(chapter.id)
                  }
                  handleNavigate(chapter.id)
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                  (isActive || hasActiveSection)
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <span className="text-base">{chapter.emoji}</span>
                <span className="flex-1 text-left truncate">{chapter.title}</span>
                {chapter.sections.length > 0 && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                )}
                {(isActive || hasActiveSection) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && chapter.sections.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                      {chapter.sections.map((section) => {
                        const sectionActive = section.id === activeSection
                        return (
                          <button
                            key={section.id}
                            onClick={() => handleNavigate(section.id)}
                            className={cn(
                              "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                              sectionActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                          >
                            <span className="truncate block">{section.title}</span>
                            {sectionActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 w-1 h-5 bg-primary rounded-r-full"
                              />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 h-[calc(100vh-4rem)] sticky top-16 border-r border-border overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-background border-r border-border z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-semibold">文档目录</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
