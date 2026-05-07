"use client"

import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../utils/cookies"

type Props = {
  tools: string[]
  evilMode: boolean
}

export default function EvilFilter({ tools, evilMode }: Props) {
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    if (!evilMode) return

    const required = ["tailwind css", "postman", "react"]

    const selectedLower = tools.map(t => t.toLowerCase())

    const hasAll = required.every(req => selectedLower.includes(req))

    const alreadySet = getCookie("flag2") === "true"

    if (hasAll && !alreadySet) {
      setCookie("flag2", true, 365)

      // 🔥 trigger overlay
      setTimeout(() => {
        setShowOverlay(true)
      }, 200)

      // 🔥 notify the app
    window.dispatchEvent(new Event("flagsUpdated"))
    }
  }, [tools])

  if (!showOverlay || !evilMode) return null

  return (
    <div onClick={() => setShowOverlay(false)} className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center cursor-pointer">
      <p className={`text-red-500 text-3xl font-bold animate-pulse ${evilMode ? "glitch" : ""}`}>Something has happened...</p>
    </div>
  )
}
