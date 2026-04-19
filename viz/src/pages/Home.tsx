import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { SUBJECTS, TOPICS, type Subject } from "../topics"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  const bySubject: Record<Subject, typeof TOPICS> = {
    RA: [], AS: [], VACV: [], MLC: [],
  }
  TOPICS.forEach((t) => bySubject[t.subject].push(t))

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Interactive Maths
        </h1>
        <p className="mt-3 text-neutral-400 max-w-2xl">
          Companion visualisations to the notes — sliders, animations, and
          simulations for abstract concepts across Real Analysis, Algebraic
          Structures, VACV and Logic.
        </p>
      </motion.header>

      {(Object.keys(SUBJECTS) as Subject[]).map((key, idx) => {
        const s = SUBJECTS[key]
        const topics = bySubject[key]
        return (
          <motion.section
            key={key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * idx }}
            className="mb-14"
          >
            <div className="flex items-baseline gap-3 mb-5">
              <span
                className={`inline-block h-2 w-2 rounded-full bg-gradient-to-r ${s.color}`}
              />
              <h2 className="text-xl font-semibold text-neutral-100">
                {s.name}
              </h2>
              <span className="text-xs text-neutral-500">
                {topics.filter((t) => t.status === "live").length}/
                {topics.length} ready
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  to={`/${t.slug}`}
                  className="group relative block rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 hover:border-neutral-600 hover:bg-neutral-900 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs text-neutral-500 font-mono">
                      {key} · {String(t.number).padStart(2, "0")}
                    </div>
                    {t.status === "live" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400">
                        <Sparkles className="h-3 w-3" />
                        live
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider text-neutral-600">
                        soon
                      </span>
                    )}
                  </div>
                  <div className="mt-2 font-medium text-neutral-100">
                    {t.title}
                  </div>
                  <div className="mt-1 text-sm text-neutral-400">
                    {t.blurb}
                  </div>
                  <ArrowRight className="absolute right-4 bottom-4 h-4 w-4 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          </motion.section>
        )
      })}
    </div>
  )
}
