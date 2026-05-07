"use client"

import { useState, useEffect } from "react"
import { setCookie, getCookie } from "../utils/cookies"

type Props = {
  text: string
  evilMode: boolean
  solution: string
  selected: number[]
  setSelected: React.Dispatch<React.SetStateAction<number[]>>
  offset: number
  fullText: string // ✅ ADD THIS
}

export default function EvilText({ text, evilMode, solution, selected, setSelected, offset, fullText }: Props) {
  const [showOverlay, setShowOverlay] = useState(false)

  const toggleLetter = (index: number) => {
    if (!evilMode) return

    const globalIndex = index + offset

    setSelected(prev => (prev.includes(globalIndex) ? prev.filter(i => i !== globalIndex) : [...prev, globalIndex]))
  }

  function containsSequence(source: string, target: string) {
    let j = 0

    for (let i = 0; i < source.length; i++) {
      if (source[i] === target[j]) {
        j++
      }
      if (j === target.length) return true
    }

    return false
  }

  useEffect(() => {
    const ordered = [...selected]
      .sort((a, b) => a - b)
      .map(i => fullText[i]) // ✅ FIXED
      .join("")
      .toLowerCase()

    const alreadySet = getCookie("flag1") === "true"

    if (!alreadySet && containsSequence(ordered, "lockandkey")) {
      setCookie("flag1", true, 365)
      setShowOverlay(true)
      // 🔥 notify the app
    window.dispatchEvent(new Event("flagsUpdated"))
    }
  }, [selected])

  return (
    <>
      {/* TEXT */}
      <p className="text-lg max-w-3xl leading-relaxed">
        {text.split("").map((char, i) => (
          <span
            key={i}
            onClick={() => toggleLetter(i)}
            className={`
  ${evilMode ? "cursor-pointer hover:text-accent transition" : ""}
  ${selected.includes(i + offset) ? "text-accent underline" : ""}
          `}
          >
            {char}
          </span>
        ))}
      </p>
      {/* OVERLAY */}
      {showOverlay && (
        <div onClick={() => setShowOverlay(false)} className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center cursor-pointer">
          <p className={`text-red-500 text-3xl font-bold animate-pulse ${evilMode ? "glitch" : ""}`}>Something has happened...</p>
        </div>
      )}
    </>
  )
}
