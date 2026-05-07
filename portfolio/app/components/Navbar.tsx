"use client"

import Link from "next/link"
import { setCookie } from "../utils/cookies"

type Props = {
  cookieState: boolean
  toggleCookie: () => void
}

const setFlagAndNotify = (name: string, value: boolean) => {
  setCookie(name, value, 365)
  window.dispatchEvent(new Event("flagsUpdated"))
}

export default function Navbar({ cookieState, toggleCookie }: Props) {
  return (
    <nav className="sticky top-0 bg-secondary border-b border-accent z-50">
      <div className="max-w-6xl mx-auto flex justify-end items-center gap-8 px-6 py-4">
        {/* EVIL MODE BUTTON */}
        {/*
        <button onClick={toggleCookie} className="bg-accent text-black px-3 py-1 rounded">
          Toggle: {cookieState ? "ON" : "OFF"}
        </button>
*/}
        {/* NAV LINKS */}
        <Link href="/" className="hover:text-accent">
          Home
        </Link>

        <Link href="/#about" className="hover:text-accent">
          About
        </Link>

        <Link href="/#projects" className="hover:text-accent">
          Projects
        </Link>

        <Link href="/projects" className="hover:text-accent">
          More...
        </Link>

        <Link href="/#contact" className="hover:text-accent">
          Contact
        </Link>

        <a href="/resume/RyanFoo_Resume.pdf" download className="bg-accent text-black px-3 py-1 rounded">
          Download PDF
        </a>

        {/* DEBUG BUTTONS */}
        {/*
        <button onClick={() => setFlagAndNotify("flag1", true)} className="px-2 py-1 border border-blue-400 text-blue-400 rounded">
          Flag1
        </button>

        <button onClick={() => setFlagAndNotify("flag2", true)} className="px-2 py-1 border border-blue-400 text-blue-400 rounded">
          Flag2
        </button>

        <button onClick={() => setFlagAndNotify("flag3", true)} className="px-2 py-1 border border-blue-400 text-blue-400 rounded">
          Flag3
        </button>

        <button
          onClick={() => {
            setFlagAndNotify("flag1", false)
            setFlagAndNotify("flag2", false)
            setFlagAndNotify("flag3", false)
            setFlagAndNotify("capture", false)  
          }}
          className="px-2 py-1 border border-red-400 text-red-400 rounded"
        >
          Reset
        </button>
        */}
      </div>
    </nav>
  )
}
