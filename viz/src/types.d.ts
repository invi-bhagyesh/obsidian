declare module "react-katex" {
  import type { ReactNode } from "react"
  interface Props {
    math: string
    children?: ReactNode
    errorColor?: string
    renderError?: (error: Error) => ReactNode
  }
  export const InlineMath: (props: Props) => JSX.Element
  export const BlockMath: (props: Props) => JSX.Element
}
