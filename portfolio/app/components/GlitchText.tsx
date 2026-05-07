"use client"

import { useEffect, useState } from "react"

type Props = {
  normalText: string
  glitchTexts: string[]
  evilMode: boolean
}

export default function GlitchText({ normalText, glitchTexts, evilMode }: Props) {
  const [displayText, setDisplayText] = useState(normalText)

  useEffect(() => {
    if (!evilMode) {
      setDisplayText(normalText)
      return
    }

    let timeout: NodeJS.Timeout

    const glitchLoop = () => {
      // randomly pick one glitch text
      const randomText = glitchTexts[Math.floor(Math.random() * glitchTexts.length)]

      setDisplayText(randomText)

      // random interval for unstable feel
      const next = Math.random() * 1000 + 200
      timeout = setTimeout(glitchLoop, next)
    }

    glitchLoop()

    return () => clearTimeout(timeout)
  }, [evilMode])

  return (
    <p
      className={`
    text-lg text-gray-300 transition-all duration-200 whitespace-pre-line
    ${evilMode ? "glitch" : ""}
  `}
    >
      {displayText}
    </p>
  )
}
