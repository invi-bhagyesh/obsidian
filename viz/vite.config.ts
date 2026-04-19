import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Site lives at https://invi-bhagyesh.github.io/obsidian/interactive/
export default defineConfig({
  plugins: [react()],
  base: "/obsidian/interactive/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})
