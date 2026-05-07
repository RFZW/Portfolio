"use client"

import ProjectCarousel from "./components/ProjectCarousel"
import SkillBrowser from "./components/SkillBrowser"
import Link from "next/link"
import Navbar from "./components/Navbar"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import useEvilMode from "./hooks/useEvilMode"
import EvilText from "./components/EvilText"
import FlagChecker from "./components/FlagChecker"
import { useState, useEffect } from "react"
import GlitchText from "./components/GlitchText"
import Timeline from "./components/Timeline"
import { Project } from "../lib/getProjects"

export default function HomeClient({ experiences, skills, projects }: { experiences: any; skills: any; projects: Project[] }) {
  const { enabled: cookieState, flicker, glitch, toggle: toggleCookie } = useEvilMode()

  const text1 = "Computer Science graduate with experience developing applications in an Agile environment. Skilled in building scalable, data-driven applications using frontend frameworks and backend integrations"
  const text2 = "Taking a holistic approach in software development, taking the needs and nature of the application, as well as background of the user and their community, in order to create an application which is easily accessible, whilst being scalable due to the ever-growing nature of the industry. Eager to learn more in order to broaden my skillset to tackle bigger challenges ahead."
  const fullText = text1 + text2

  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    const combinedText = text1 + text2

    const ordered = [...selected]
      .sort((a, b) => a - b)
      .map(i => combinedText[i])
      .join("")
      .toLowerCase()

    if (ordered.includes("react")) {
      console.log("Unlocked!")
    }
  }, [selected])

  return (
    <div
      className={`bg-primary text-text font-sans 
      ${cookieState ? "evil-mode" : ""} 
      ${flicker ? "evil-flicker" : ""} 
      ${glitch ? "glitch" : ""}`}
    >
      {/* HERO */}
      <section className="h-screen flex items-center justify-center text-center scale-[0.9]">
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold">Ryan Foo</h1>
          <p className="mt-4 text-lg md:text-xl text-accent">Developer • Designer • Problem Solver</p>
        </div>
      </section>

      <Navbar cookieState={cookieState} toggleCookie={toggleCookie} />

      <section className="min-h-screen bg-secondary flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-6 w-full scale-[0.9]">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-accent">About Me</h2>

          <EvilText text={text1} evilMode={cookieState} solution="lockandkey" selected={selected} setSelected={setSelected} offset={0} fullText={fullText} />

          <EvilText text={text2} evilMode={cookieState} solution="lockandkey" selected={selected} setSelected={setSelected} offset={text1.length} fullText={fullText} />

          {/* ✅ PASS DATA HERE */}
          <Timeline experiences={experiences} />

          {/* SKILLS */}
          <SkillBrowser skills={skills} />
        </div>
      </section>

      {/* PROJECTS */}
      <div className="max-w-6xl mx-auto px-6 py-6 w-full scale-[0.9]">
        <ProjectCarousel projects={projects} />

        <div className="flex justify-center mt-10">
          <Link
            href="/projects"
            className="
        px-5 py-2.5
        border border-accent
        rounded-lg
        text-accent
        hover:bg-accent
        hover:text-black
        transition
      "
          >
            Find Out More
          </Link>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen bg-secondary flex items-center">
        <div className="max-w-3xl mx-auto w-full px-6 text-center scale-[0.9]">
          <h2 className="text-4xl font-bold mb-8 text-accent">Contact</h2>

          <GlitchText evilMode={cookieState} normalText="Feel free to reach out for opportunities, collaborations, or just a chat." glitchTexts={["To keep the creature at bay, \nThree Steps must take for it to light the way. \nFrom the hos7, \nThe LockandKey are spelt to trap them in their plac3.\nWhen Tailwind React and Postman is reached, \nthe Filter must be applied for it to take.\nThe Final address shrouded in plain sight; \nWith the end being the Key.\nThree lights aflam3.\nOnly then can the beast be sealed away.", "T0 k3ep the creature 4t bay, \nThree 5teps must tak3 for 1t t0 l1gh7 the way. \nFr0m the h057, \nThe LockandKey are 5p3lt t0 7rap th3m 1n th31r pl4c3.\nWh3n 741lw1nd Re4c7 4nd P05tm4n is r3ached, \nthe F1l7er mus7 b3 4ppli3d f0r 1t t0 7ake. \nThe F1n4l 4ddre5s 5hroud 1n pl4in 5igh7; \nWith the 3nd being 7h3 K3y.\nThre3 l1ght5 aflam3. \n0nly then c4n th3 8ea57 b3 5e413d 4w4y."]} />

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
