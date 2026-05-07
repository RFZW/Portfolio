"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import useEvilMode from "../hooks/useEvilMode"
import { setCookie, getCookie } from "../utils/cookies"
import { useRouter } from "next/navigation"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import GlitchText from "../components/GlitchText"
import FlagChecker from "../components/FlagChecker"

export default function ProjectsPage() {
  const { enabled: cookieState, flicker, glitch, toggle: toggleCookie } = useEvilMode()
  const router = useRouter()

  const [showOverlay, setShowOverlay] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // wait one tick so cookie loads properly
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return

    const alreadySet = getCookie("flag3") === "true"

    if (!alreadySet) {
      setCookie("flag3", true, 365)
      setShowOverlay(true)

      // 🔥 notify the app
      window.dispatchEvent(new Event("flagsUpdated"))
    }
  }, [cookieState, isReady, router])

  return (
    <div
      className={`bg-primary text-text font-sans 
      ${cookieState ? "evil-mode" : ""} 
      ${flicker ? "evil-flicker" : ""} 
      ${glitch ? "glitch" : ""}`}
    >
      {/* NAVBAR */}
      <Navbar cookieState={cookieState} toggleCookie={toggleCookie} />

      <div className="flex flex-col items-center justify-center text-center mt-20 px-6 m-20">
        <h1 className={`text-3xl font-bold animate-pulse mb-6 ${cookieState ? "text-green-400" : "text-red-500"}`}>{cookieState ? "The Seal is in place" : "You should not be here"}</h1>

        <button
          onClick={() => router.push("/")}
          className="
      px-6 py-3
      border border-accent
      rounded-lg
      text-accent
      hover:bg-accent
      hover:text-black
      transition
      hover:scale-105
    "
        >
          Return to Main
        </button>
      </div>

      {/* OVERLAY */}
      {showOverlay && (
        <div
          onClick={() => setShowOverlay(false)}
          className={`
            fixed inset-0 flex items-center justify-center z-[999] cursor-pointer 
            bg-black/80
            ${cookieState ? "evil-mode evil-flicker glitch" : ""}
          `}
        >
          <p className="text-red-500 text-3xl font-bold animate-pulse">Something has changed...</p>
        </div>
      )}
      {/* CONTACT */}
      <section id="contact" className="min-h-screen bg-secondary flex items-center">
        <div className="max-w-3xl mx-auto w-full px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-accent">Contact</h2>

          <GlitchText evilMode={cookieState} normalText="Feel free to reach out for opportunities, collaborations, or just a chat." glitchTexts={["To keep the creature at bay, \nThree Steps must take for it to light the way. \nFrom the hos7, \nThe LockandKey are spelt to trap them in their plac3.\nWhen Twine React and Unity is reached, \nthe Filter must be applied for it to take.\nThe Final address shrouded in plain sight; \nWith the end being the Key.\nThree lights aflam3.\nOnly then can the beast be sealed away.", "T0 k3ep the creature 4t bay, \nThree 5teps must tak3 for 1t t0 l1gh7 the way. \nFr0m the h057, \nThe LockandKey are 5p3lt t0 7rap th3m 1n th31r pl4c3.\nWh3n Twin3 Re4c7 and Un1ty is r3ached, \nthe F1l7er mus7 b3 4ppli3d f0r 1t t0 7ake. \nThe F1n4l 4ddre5s 5hroud 1n pl4in 5igh7; \nWith the 3nd being 7h3 K3y.\nThre3 l1ght5 aflam3. \n0nly then c4n th3 8ea57 b3 5e413d 4w4y."]} />

          {/* EMAIL */}
          <div className="mb-8">
            <a
              href="mailto:rfzw5692@gmail.com"
              className="
                      text-xl
                      text-accent
                      border-b border-accent
                      hover:opacity-80
                      transition
                    "
            >
              rfzw5692@gmail.com
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/rfzw"
              target="_blank"
              rel="noopener noreferrer"
              className="
                  flex items-center gap-2
                  px-5 py-2.5
                  border border-accent
                  rounded-lg
                  text-accent
                  hover:bg-accent
                  hover:text-black
                  transition
                  hover:scale-105
                "
            >
              <FaGithub size={18} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/ryan-foozw"
              target="_blank"
              rel="noopener noreferrer"
              className="
                  flex items-center gap-2
                  px-5 py-2.5
                  border border-accent
                  rounded-lg
                  text-accent
                  hover:bg-accent
                  hover:text-black
                  transition
                  hover:scale-105
                "
            >
              <FaLinkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      <div className="p-8">
        <FlagChecker toggleCookie={toggleCookie} />
      </div>
    </div>
  )
}
