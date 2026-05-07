"use client"

import { useState, useEffect, useRef } from "react"

function setCookie(name: string, value: string | boolean, days: number) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
}

function getCookie(name: string): string {
  const cname = name + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(";")

  for (let c of ca) {
    while (c.charAt(0) === " ") c = c.substring(1)
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length)
    }
  }
  return ""
}

export default function useEvilMode() {
  const [enabled, setEnabled] = useState(false)
  const [flicker, setFlicker] = useState(false)
  const [glitch, setGlitch] = useState(false)

  const flickerTimeout = useRef<NodeJS.Timeout | null>(null)
  const glitchTimeout = useRef<NodeJS.Timeout | null>(null)

  // 🔥 Load from cookie on mount
  useEffect(() => {
    const saved = getCookie("toggleState")
    if (saved === "true") {
      setEnabled(true)
    }
  }, [])

  // 🔥 Apply class to body
  useEffect(() => {
    if (enabled) {
      document.body.classList.add("evil-mode")
    } else {
      document.body.classList.remove("evil-mode")
    }
  }, [enabled])

  // 🔥 Flicker effect
  useEffect(() => {
    if (!enabled) return

    const trigger = () => {
      setFlicker(true)

      setTimeout(() => setFlicker(false), 120)

      const next = Math.random() * 2000 + 100
      flickerTimeout.current = setTimeout(trigger, next)
    }

    trigger()

    return () => {
      if (flickerTimeout.current) clearTimeout(flickerTimeout.current)
    }
  }, [enabled])

  // 🔥 Glitch effect
  useEffect(() => {
    if (!enabled) return

    const trigger = () => {
      setGlitch(true)

      setTimeout(() => setGlitch(false), 150)

      const next = Math.random() * 2000 + 1000
      glitchTimeout.current = setTimeout(trigger, next)
    }

    trigger()

    return () => {
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current)
    }
  }, [enabled])

  const toggle = () => {
    const newState = !enabled
    setEnabled(newState)
    setCookie("toggleState", newState, 365)
  }

  return {
    enabled,
    flicker,
    glitch,
    toggle
  }
}