import { useMemo } from "react"
import katex from "katex"

type Props = { math: string; block?: boolean }

export default function Tex({ math, block = false }: Props) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        errorColor: "#f87171",
        strict: "ignore" as const,
        trust: true,
      })
    } catch (e) {
      return `<span style="color:#f87171">TeX error: ${(e as Error).message}</span>`
    }
  }, [math, block])
  const Tag = block ? "div" : "span"
  return (
    <Tag
      className={block ? "my-2" : ""}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
