
"use client"

import { useEffect, useState } from "react"

type Props = {
  normalText: string
  glitchTexts: string[]
  evilMode: boolean
  motionSensitive: boolean | null
}

export default function GlitchText({
  normalText,
  glitchTexts,
  evilMode,
  motionSensitive
}: Props) {
  const [displayText, setDisplayText] = useState(normalText)

  useEffect(() => {
    // Evil Mode OFF: Show normal text
    if (!evilMode) {
      setDisplayText(normalText)
      return
    }

    // Evil Mode ON, but motion effects disabled:
    // Show the first riddle without flickering.
    if (motionSensitive !== false) {
      setDisplayText(glitchTexts[0] || normalText)
      return
    }

    // Evil Mode ON and motion effects allowed:
    // Randomly switch between riddle versions.
    let timeout: ReturnType<typeof setTimeout>

    const glitchLoop = () => {
      const randomText =
        glitchTexts[Math.floor(Math.random() * glitchTexts.length)]

      setDisplayText(randomText)

      const next = Math.random() * 1000 + 200
      timeout = setTimeout(glitchLoop, next)
    }

    if (glitchTexts.length > 0) {
      glitchLoop()
    }

    return () => clearTimeout(timeout)

  }, [evilMode, motionSensitive, normalText, glitchTexts])

  const effectsEnabled = evilMode && motionSensitive === false

  return (
    <p
      className={`
        text-lg text-gray-300 transition-all duration-200 whitespace-pre-line
        ${effectsEnabled ? "glitch" : ""}
      `}
    >
      {displayText}
    </p>
  )
}
