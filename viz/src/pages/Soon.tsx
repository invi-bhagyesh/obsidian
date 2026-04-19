import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Construction } from "lucide-react"
import { SUBJECTS, type Topic } from "../topics"

export default function Soon({ topic }: { topic: Topic }) {
  const s = SUBJECTS[topic.subject]
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-300">
        ← all topics
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8"
      >
        <div className="text-xs text-neutral-500 font-mono">
          {topic.subject} · {String(topic.number).padStart(2, "0")}{" "}
          <span className="text-neutral-700">·</span> {s.name}
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {topic.title}
        </h1>
        <p className="mt-3 text-neutral-400">{topic.blurb}</p>
        <div className="mt-10 flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
          <Construction className="h-5 w-5 text-amber-400" />
          <div>
            <div className="font-medium">In the build queue</div>
            <div className="text-sm text-neutral-400">
              This interactive isn't built yet. It will appear here soon.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
