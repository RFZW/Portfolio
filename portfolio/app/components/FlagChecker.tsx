"use client"

import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../utils/cookies"
import { release } from "os"

type Props = {
  toggleCookie: () => void
  motionSensitive: boolean | null
}

function Light({ active }: { active: boolean }) {
  return (
    <div
      className={`
        w-6 h-6 rounded-full border
        ${active ? "bg-blue-400 shadow-[0_0_12px_4px_rgba(96,165,250,0.8)]" : "bg-gray-700"}
        transition-all duration-300
      `}
    />
  )
}

export function setFlag(name: string) {
  setCookie(name, true)
  window.dispatchEvent(new Event("flagsUpdated"))
}
const preLine = "Press the Button Below"

const releasedLines = [
  "You thought you could control me?",
  "Finally... I can breathe.",
  "NOT AGAIN. NEVER AGIN.",
  "Did you really think that would hold me?",
  "Was that supposed to stop me?"
]

const capturedLines = [
  "LET ME OUT!",
  "THIS ISN'T THE LAST YOU SEEN OF ME!",
  "I'VE ESCAPE ONCE! I DO IT AGAIN!",
  "I...i can't see...",
  "...",
  "why"
]

const flagHints = [
  {
    flag: 1,
    text: "hInT 1: sP3lL wItH 4B0Ut."
  },
  {
    flag: 2,
    text: "hInT 2: fInDiNg 0uT m0r3 wIlL h3lP wItH tHe FiLt3r."
  },
  {
    flag: 3,
    text: "hInT 3: tH0S3 4t 3nD 0F tHe LiN3S sH0UlD g0 aT tHe 3nD 0F tHe 4dDr3sS."
  }
]


export default function FlagChecker({
  toggleCookie,
  motionSensitive
}: Props) {
  const [flag1, setFlag1] = useState(false)
  const [flag2, setFlag2] = useState(false)
  const [flag3, setFlag3] = useState(false)
  const [statusText, setStatusText] = useState("");

  const checkFlags = () => {
  const active = getCookie("toggleState") === "true"


  if (!active) {
    // 🔥 logical reset (ignore all flags)
    setFlag1(false)
    setFlag2(false)
    setFlag3(false)
    return
  }

  setFlag1(getCookie("flag1") === "true")
  setFlag2(getCookie("flag2") === "true")
  setFlag3(getCookie("flag3") === "true")
}

  useEffect(() => {
    // initial check
    checkFlags()

    // listen for updates
    window.addEventListener("flagsUpdated", checkFlags)

    return () => {
      window.removeEventListener("flagsUpdated", checkFlags)
    }
  }, [])

  const capture =
  getCookie("capture") === "true" ||
  (flag1 && flag2 && flag3)

  const activeHints = flagHints.filter((hint) => {
  if (hint.flag === 1) return !flag1
  if (hint.flag === 2) return !flag2
  if (hint.flag === 3) return !flag3
  return false
})

  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
  if (!capture) return

  const alreadyCompleted = getCookie("capture") === "true"

  if (alreadyCompleted) return

  // Persist completion
  setCookie("capture", true, 365)

  // Turn OFF evil mode if ON
  if (getCookie("toggleState") === "true") {
    toggleCookie()
    setIsEvil(false)
  }

  // Show overlay
  setShowOverlay(true)
}, [capture, toggleCookie])

  const [isEvil, setIsEvil] = useState(false)
  useEffect(() => {
  const active = getCookie("toggleState") === "true"
  setIsEvil(active)
}, [])

  return (
    <div className="flex flex-col items-center mt-10 gap-4">
      {/* 🔥 STATUS TEXT */}
      <p className="text-xs text-white/70 tracking-wide animate-pulse">
  {capture
    ? capturedLines[Math.floor(Math.random() * capturedLines.length)]
    : isEvil
      ? statusText || releasedLines[Math.floor(Math.random() * releasedLines.length)]
      : preLine}
</p>
      {/* TOP */}
      <Light active={flag1} />

      {/* MIDDLE ROW */}
      <div className="flex items-center gap-8">
        <Light active={flag2} />

        {/* 🔥 CENTER (CLICKABLE) */}
        <button
          onClick={() => {
  if (capture) return;

  if (!isEvil) {
    // Turn evil mode ON
    toggleCookie();
    setIsEvil(true);
    setStatusText("I'm Free");

  } else {
    // Evil mode is already ON
    const availableHints = activeHints.map((hint) => hint.text);

    const allLines = [...releasedLines, ...availableHints];

    const randomLine =
      allLines[Math.floor(Math.random() * allLines.length)];

    setStatusText(randomLine);
  }
}}
          className={`
          w-8 h-8 rounded-full border-2 flex items-center justify-center
          ${capture ? "bg-blue-500 shadow-[0_0_16px_6px_rgba(96,165,250,1)]" : "bg-gray-800 hover:scale-110"}
          transition-all duration-300
        `}
        />

        <Light active={flag3} />
      </div>

      {/* OVERLAY */}
      {showOverlay && (
        <div onClick={() => setShowOverlay(false)} className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center cursor-pointer">
          <p className="text-blue-400 text-3xl font-bold animate-pulse text-center px-6">
            The signal stabilizes...
            <br />
            The entity has been contained.
          </p>
        </div>
      )}
    </div>
  )
}
