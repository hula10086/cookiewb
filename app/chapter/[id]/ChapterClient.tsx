"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar"
import MarkdownContent from "@/components/MarkdownContent"
import BackToTop from "@/components/BackToTop"
import { chapters } from "@/lib/content"

interface ChapterClientProps {
  id: string
}

export default function ChapterClient({ id }: ChapterClientProps) {
  const chapter = chapters.find((ch) => ch.id === id)

  if (!chapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">章节未找到</h1>
          <Link href="/" className="text-primary hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 lg:py-12 pt-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回目录
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">{chapter.emoji}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {chapter.title}
            </h1>
          </div>

          {chapter.content && (
            <div className="mb-10">
              <MarkdownContent content={chapter.content} />
            </div>
          )}

          {chapter.sections.length > 0 && (
            <div className="space-y-12">
              {chapter.sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="scroll-mt-24"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded-full" />
                    {section.title}
                  </h2>
                  <div className="pl-4">
                    <MarkdownContent content={section.content} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <footer className="mt-24 pt-8 border-t border-border text-center text-muted-foreground">
          <p>Cookie小铺开发团队 © 2026</p>
        </footer>
      </main>

      <BackToTop />
    </div>
  )
}
