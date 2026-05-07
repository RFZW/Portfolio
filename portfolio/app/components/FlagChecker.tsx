"use client"

import { useEffect, useState } from "react"
import { getCookie, setCookie } from "../utils/cookies"

type Props = {
  toggleCookie: () => void
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

export default function FlagChecker({ toggleCookie }: Props) {
  const [flag1, setFlag1] = useState(false)
  const [flag2, setFlag2] = useState(false)
  const [flag3, setFlag3] = useState(false)

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

  const capture = flag1 && flag2 && flag3

  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    if (!capture) return

    const alreadyCompleted = getCookie("capture") === "true"
    if (alreadyCompleted) return

    // mark as completed (persist across reloads)
    setCookie("capture", true, 365)

    // turn OFF evil mode (only if ON)
    if (getCookie("toggleState") === "true") {
      toggleCookie()
    }

    // show overlay ONCE
    setShowOverlay(true)
  }, [capture, toggleCookie])

  const [isEvil, setIsEvil] = useState(false)
  useEffect(() => {
    setIsEvil(getCookie("toggleState") === "true")
  }, [])

  return (
    <div className="flex flex-col items-center mt-10 gap-4">
      {/* 🔥 STATUS TEXT */}
      <p className="text-xs text-white/70 tracking-wide animate-pulse">{!capture && !isEvil ? "Press me" : !capture && isEvil ? "I'm Free" : "Release me at once"}</p>

      {/* TOP */}
      <Light active={flag1} />

      {/* MIDDLE ROW */}
      <div className="flex items-center gap-8">
        <Light active={flag2} />

        {/* 🔥 CENTER (CLICKABLE) */}
        <button
          onClick={() => {
            if (capture) return // ❌ cannot toggle after completion
            toggleCookie()
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
