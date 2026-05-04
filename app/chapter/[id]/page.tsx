import ChapterClient from "./ChapterClient"
import { chapters } from "@/lib/content"

export function generateStaticParams() {
  return chapters.map((ch) => ({ id: ch.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const chapter = chapters.find((ch) => ch.id === id)
  return {
    title: chapter ? `${chapter.title} — Cookie小铺开发手册` : "Cookie小铺开发手册",
  }
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ChapterClient id={id} />
}
