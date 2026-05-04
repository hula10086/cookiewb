"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import { chapters } from "@/lib/content"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      <div id="docs-content" className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">📖 文档目录</h2>

          <div className="grid gap-4">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/chapter/${chapter.id}/`}
                  className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{chapter.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {chapter.title}
                      </h3>
                      {chapter.sections.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {chapter.sections.slice(0, 4).map((sec) => (
                            <span
                              key={sec.id}
                              className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                            >
                              {sec.title}
                            </span>
                          ))}
                          {chapter.sections.length > 4 && (
                            <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                              +{chapter.sections.length - 4} 更多
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors text-sm mt-1">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <footer className="mt-24 pt-8 border-t border-border text-center text-muted-foreground">
          <p>Cookie小铺开发团队 © 2026</p>
          <p className="text-sm mt-2">用 ❤️ 构建</p>
        </footer>
      </div>
    </div>
  )
}
