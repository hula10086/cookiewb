"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ZoomIn } from "lucide-react"
import CodeBlock from "./CodeBlock"
import { cn } from "@/lib/utils"

interface MarkdownContentProps {
  content: string
}

// Simple markdown parser
function parseMarkdown(content: string): JSX.Element[] {
  const lines = content.split("\n")
  const elements: JSX.Element[] = []
  let i = 0
  let key = 0

  const getKey = () => `md-${key++}`

  while (i < lines.length) {
    const line = lines[i]

    // Empty line
    if (!line.trim()) {
      i++
      continue
    }

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++
      elements.push(
        <CodeBlock
          key={getKey()}
          code={codeLines.join("\n")}
          language={lang || "text"}
        />
      )
      continue
    }

    // Inline code block (single backtick)
    if (line.startsWith("`") && line.endsWith("`") && line.length > 2) {
      const code = line.slice(1, -1)
      elements.push(
        <code
          key={getKey()}
          className="px-1.5 py-0.5 rounded-md bg-muted text-primary text-sm font-mono"
        >
          {code}
        </code>
      )
      i++
      continue
    }

    // Table
    if (line.startsWith("|")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i])
        i++
      }
      elements.push(renderTable(tableLines, getKey))
      continue
    }

    // Blockquote / Callout
    if (line.startsWith("> ")) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <blockquote
          key={getKey()}
          className="border-l-4 border-primary bg-muted/50 pl-4 py-2 pr-4 rounded-r-lg my-4 text-muted-foreground"
        >
          {quoteLines.join("\n")}
        </blockquote>
      )
      continue
    }

    // List item
    if (line.match(/^(\s*)[-*]\s/)) {
      const listItems: string[] = []
      const indent = line.match(/^(\s*)/)?.[1].length || 0
      while (i < lines.length && lines[i].match(new RegExp(`^\s{${indent}}[-*]\s`))) {
        listItems.push(lines[i].replace(new RegExp(`^\s{${indent}}[-*]\s`), ""))
        i++
      }
      elements.push(
        <ul key={getKey()} className="list-disc list-inside my-4 space-y-1 text-foreground">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-foreground/90">{parseInline(item)}</li>
          ))}
        </ul>
      )
      continue
    }

    // Numbered list
    if (line.match(/^\s*\d+\.\s/)) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].match(/^\s*\d+\.\s/)) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s/, ""))
        i++
      }
      elements.push(
        <ol key={getKey()} className="list-decimal list-inside my-4 space-y-1 text-foreground">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-foreground/90">{parseInline(item)}</li>
          ))}
        </ol>
      )
      continue
    }

    // Heading 4
    if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={getKey()} className="text-lg font-semibold mt-6 mb-3 text-foreground">
          {line.slice(5)}
        </h4>
      )
      i++
      continue
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      elements.push(<hr key={getKey()} className="my-8 border-border" />)
      i++
      continue
    }

    // Mermaid diagram placeholder
    if (line.startsWith("```mermaid")) {
      const diagramLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        diagramLines.push(lines[i])
        i++
      }
      i++
      elements.push(
        <div key={getKey()} className="mermaid-container">
          <div className="text-xs text-muted-foreground mb-2 font-mono">Mermaid Diagram</div>
          <pre className="text-sm text-foreground/80 overflow-x-auto">
            {diagramLines.join("\n")}
          </pre>
        </div>
      )
      continue
    }

    // Regular paragraph
    const paraLines: string[] = [line]
    i++
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("#") && !lines[i].startsWith("|") && !lines[i].startsWith("```") && !lines[i].startsWith("> ") && !lines[i].match(/^(\s*)[-*]\s/) && !lines[i].match(/^\s*\d+\.\s/)) {
      paraLines.push(lines[i])
      i++
    }

    const paraText = paraLines.join(" ")
    elements.push(
      <p key={getKey()} className="leading-7 text-foreground/90 mb-4">
        {parseInline(paraText)}
      </p>
    )
  }

  return elements
}

function parseInline(text: string): JSX.Element[] {
  const parts: JSX.Element[] = []
  let remaining = text
  let key = 0

  // Bold **text**
  const boldRegex = /\*\*(.*?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{parseInlineLinks(text.slice(lastIndex, match.index))}</span>)
    }
    parts.push(<strong key={key++} className="text-foreground font-semibold">{match[1]}</strong>)
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{parseInlineLinks(text.slice(lastIndex))}</span>)
  }

  return parts.length > 0 ? parts : [<span key={key++}>{parseInlineLinks(text)}</span>]
}

function parseInlineLinks(text: string): string | JSX.Element[] {
  // Simple link parsing
  const linkRegex = /\[(.*?)\]\((.*?)\)/g
  if (!linkRegex.test(text)) return text

  const parts: JSX.Element[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={parts.length}>{text.slice(lastIndex, match.index)}</span>)
    }
    parts.push(
      <a
        key={parts.length}
        href={match[2]}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {match[1]}
      </a>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(<span key={parts.length}>{text.slice(lastIndex)}</span>)
  }

  return parts
}

function renderTable(lines: string[], getKey: () => string): JSX.Element {
  if (lines.length < 2) return <div key={getKey()}>{lines.join("\n")}</div>

  const headers = lines[0].split("|").map(h => h.trim()).filter(Boolean)
  const rows = lines.slice(2).map(line =>
    line.split("|").map(c => c.trim()).filter(Boolean)
  )

  return (
    <div key={getKey()} className="overflow-x-auto my-6">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-muted">
            {headers.map((h, i) => (
              <th key={i} className="border border-border p-3 text-left font-semibold text-sm">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "transition-colors hover:bg-muted/50",
                i % 2 === 1 && "bg-muted/30"
              )}
            >
              {row.map((cell, j) => (
                <td key={j} className="border border-border p-3 text-sm text-foreground/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Lightbox component
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        src={src}
        alt={alt}
        className="max-w-full max-h-full rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
      >
        ✕
      </button>
    </motion.div>
  )
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const images = container.querySelectorAll("img")
    images.forEach((img) => {
      img.style.cursor = "zoom-in"
      img.addEventListener("click", () => {
        setLightbox({ src: img.src, alt: img.alt || "" })
      })
    })

    return () => {
      images.forEach((img) => {
        img.removeEventListener("click", () => {})
      })
    }
  }, [content])

  return (
    <div ref={containerRef} className="prose-custom">
      {parseMarkdown(content)}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
