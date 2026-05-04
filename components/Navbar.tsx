"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, motionValue } from "framer-motion"
import { BookOpen, Github, Heart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import SearchDialog from "@/components/SearchDialog"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])

  const scrollProgress = motionValue(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        scrollProgress.set((window.scrollY / docHeight) * 100)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollProgress])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled && "backdrop-blur-xl bg-background/80 border-b border-border shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">
              Cookie<span className="text-primary">Docs</span>
            </span>
          </a>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-4">
            <SearchDialog />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
        style={{
          width: useTransform(scrollProgress, [0, 100], ["0%", "100%"]),
        }}
      />
    </motion.header>
  )
}
