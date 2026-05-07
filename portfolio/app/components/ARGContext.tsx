"use client"

import { createContext, useContext, useState, useEffect } from "react"

type ARGContextType = {
  progress: string[]
  unlock: (key: string) => void
  isUnlocked: (key: string) => boolean
}

const ARGContext = createContext<ARGContextType | null>(null)

export function ARGProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<string[]>([])

  // 🔥 Persist progress
  useEffect(() => {
    const saved = localStorage.getItem("arg_progress")
    if (saved) setProgress(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("arg_progress", JSON.stringify(progress))
  }, [progress])

  const unlock = (key: string) => {
    setProgress(prev =>
      prev.includes(key) ? prev : [...prev, key]
    )
  }

  const isUnlocked = (key: string) => {
    return progress.includes(key)
  }

  return (
    <ARGContext.Provider value={{ progress, unlock, isUnlocked }}>
      {children}
    </ARGContext.Provider>
  )
}

export function useARG() {
  const context = useContext(ARGContext)
  if (!context) throw new Error("useARG must be used inside ARGProvider")
  return context
}