import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { SUBJECTS, type Topic } from "../topics"

export default function TopicShell({
  topic,
  children,
}: {
  topic: Topic
  children: ReactNode
}) {
  const s = SUBJECTS[topic.subject]
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-300">
        ← all topics
      </Link>
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 mb-8"
      >
        <div className="text-xs text-neutral-500 font-mono">
          {topic.subject} · {String(topic.number).padStart(2, "0")}{" "}
          <span className="text-neutral-700">·</span> {s.name}
        </div>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
          {topic.title}
        </h1>
        <p className="mt-3 text-neutral-400 max-w-2xl">{topic.blurb}</p>
      </motion.header>
      {children}
    </div>
  )
}

export function Section({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <section className="mb-10">
      {title && (
        <h2 className="text-lg font-semibold text-neutral-100 mb-3">{title}</h2>
      )}
      {children}
    </section>
  )
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
      {children}
    </div>
  )
}
