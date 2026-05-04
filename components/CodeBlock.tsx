"use client"

import { useState, useEffect } from "react"
import { Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

export default function CodeBlock({
  code,
  language = "javascript",
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlighted, setHighlighted] = useState("")

  useEffect(() => {
    // Simple syntax highlighting fallback
    const highlighted = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /(const|let|var|function|return|if|else|for|while|import|export|from|async|await|class|interface|type|extends)/g,
        '<span style="color: #c678dd">$1</span>'
      )
      .replace(
        /(".*?"|'.*?'|`.*?`)/g,
        '<span style="color: #98c379">$1</span>'
      )
      .replace(
        /(\/\/.*$)/gm,
        '<span style="color: #5c6370; font-style: italic">$1</span>'
      )
      .replace(
        /\b(\d+)\b/g,
        '<span style="color: #d19a66">$1</span>'
      )
      .replace(
        /\b(true|false|null|undefined)\b/g,
        '<span style="color: #d19a66">$1</span>'
      )
    setHighlighted(highlighted)
  }, [code])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden my-6 border border-border shadow-lg"
    >
      {/* macOS Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/80 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          {filename && (
            <span className="ml-3 text-xs text-muted-foreground font-mono">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            title="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative bg-[#1e1e1e] dark:bg-[#0d1117] overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code
            className="font-mono"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
        {showLineNumbers && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-muted/20 border-r border-border/20 select-none">
            {lines.map((_, i) => (
              <div
                key={i}
                className="text-right pr-3 text-xs text-muted-foreground/50 leading-relaxed py-0"
                style={{ height: "1.5em" }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
