"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Search, X, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Fuse from "fuse.js"
import { chapters } from "@/lib/content"

interface SearchResult {
  id: string
  title: string
  chapter: string
  chapterId: string
  content: string
  type: "chapter" | "section"
}

function buildSearchIndex() {
  const items: SearchResult[] = []

  chapters.forEach((ch) => {
    items.push({
      id: ch.id,
      title: ch.title,
      chapter: ch.title,
      chapterId: ch.id,
      content: ch.content.slice(0, 200),
      type: "chapter",
    })

    ch.sections.forEach((sec) => {
      items.push({
        id: sec.id,
        title: sec.title,
        chapter: ch.title,
        chapterId: ch.id,
        content: sec.content.slice(0, 200),
        type: "section",
      })
    })
  })

  return items
}

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const searchData = useMemo(() => buildSearchIndex(), [])
  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: ["title", "content", "chapter"],
      threshold: 0.3,
      includeMatches: true,
    })
  }, [searchData])

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query, { limit: 10 })
  }, [query, fuse])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleNavigate = (chapterId: string, sectionId?: string) => {
    setIsOpen(false)
    setQuery("")
    const url = sectionId 
      ? `/#${sectionId}` 
      : `/#${chapterId}`
    window.location.href = url
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/50 hover:bg-muted text-sm text-muted-foreground transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">搜索文档...</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted-foreground/10 text-xs font-mono">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl mx-4 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索文档内容..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded hover:bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded bg-muted text-xs font-mono">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map(({ item, matches }) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.chapterId, item.type === "section" ? item.id : undefined)}
                        className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-start gap-3"
                      >
                        <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {item.chapter}
                          </div>
                          {matches && matches.length > 0 && (
                            <div className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">
                              {item.content}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query ? (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    未找到与 "{query}" 相关的结果
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                    输入关键词开始搜索文档...
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
