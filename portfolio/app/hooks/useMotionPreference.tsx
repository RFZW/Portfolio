
"use client"

import { useEffect, useState } from "react"

export default function useMotionPreference() {
  const [sensitive, setSensitive] = useState<boolean | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("flashSensitive="))

    if (match) {
      setSensitive(match.split("=")[1] === "true")
    }

    setLoaded(true)
  }, [])

  const updatePreference = (value: boolean) => {
    setSensitive(value)

    document.cookie =
      `flashSensitive=${value};max-age=${365 * 24 * 60 * 60};path=/;SameSite=Lax`
  }

  return {
    sensitive,
    updatePreference,
    showOverlay: loaded && sensitive === null
  }
}
