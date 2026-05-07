"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import ProjectDisplay from "../components/ProjectDisplay"
import ProjectCells from "../components/ProjectCells"
import { useSearchParams } from "next/navigation"
import ProjectPageFilter from "../components/ProjectPageFilter"
import useEvilMode from "../hooks/useEvilMode"
import EvilFilter from "../components/EvilFilter"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import GlitchText from "../components/GlitchText"
import FlagChecker from "../components/FlagChecker"
import { Project } from "../../lib/getProjects"
import { MediaComments } from "../../lib/getMediaComments"

type SkillCategory = {
  _id: string
  category: string
  items: string[]
}

export default function ProjectsPageClient({ skills, projects, mediaComments }: { skills: SkillCategory[]; projects: Project[]; mediaComments: MediaComments }) {
  const { enabled: cookieState, flicker, glitch, toggle: toggleCookie } = useEvilMode()

  const [selectedProject, setSelectedProject] = useState(projects[0] || null)

  const [search, setSearch] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [filters, setFilters] = useState({
    type: [] as string[],
    team: [] as string[],
    tools: [] as string[]
  })

  const [appliedFilters, setAppliedFilters] = useState(filters)

  const allTypes = [...new Set(projects.map(p => p.type))]
  const allTeams = [...new Set(projects.map(p => p.team))]

  const allTools = skills.flatMap(group => group.items)

  const filteredProjects = projects.filter(project => {
    // 🔍 Search
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase())

    // 🎛️ Filters
    const matchesType = appliedFilters.type.length === 0 || appliedFilters.type.includes(project.type)

    const matchesTeam = appliedFilters.team.length === 0 || appliedFilters.team.includes(project.team)

    const projectTools = Object.values(project.tools).flat()

    const projectToolsLower = projectTools.map(t => t.toLowerCase())

    const matchesTools = appliedFilters.tools.length === 0 || appliedFilters.tools.every(t => projectToolsLower.includes(t.toLowerCase()))

    return matchesSearch && matchesType && matchesTeam && matchesTools
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const toolsParam = searchParams.get("tools")

    if (toolsParam) {
      const toolsArray = toolsParam.split(",")

      setFilters(prev => ({
        ...prev,
        tools: toolsArray
      }))

      setAppliedFilters(prev => ({
        ...prev,
        tools: toolsArray
      }))
    }
  }, [searchParams])

  useEffect(() => {
    if (!selectedProject && filteredProjects.length > 0) {
      setSelectedProject(filteredProjects[0])
      return
    }

    if (selectedProject && !filteredProjects.find(p => p.name === selectedProject.name)) {
      setSelectedProject(filteredProjects[0] || null)
    }
  }, [filteredProjects])

  return (
    <div
      className={`bg-primary text-text font-sans 
  ${cookieState ? "evil-mode" : ""} 
  ${flicker ? "evil-flicker" : ""} 
  ${glitch ? "glitch" : ""}`}
    >
      {/* NAVBAR */}
      <Navbar cookieState={cookieState} toggleCookie={toggleCookie} />

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* SELECTED PROJECT DISPLAY */}
        {selectedProject ? <ProjectDisplay project={selectedProject} mediaComments={mediaComments} /> : <div className="text-center text-gray-400 py-20">No project selected</div>}
        <div className="px-6 py-6">
          <div className="flex gap-4 items-center mb-8">
            {/* SEARCH */}
            <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 p-3 rounded bg-secondary border border-gray-600" />

            {/* FILTER BUTTON */}
            <button onClick={() => setIsFilterOpen(true)} className="px-4 py-3 border border-accent rounded text-accent hover:bg-accent hover:text-black transition">
              Filters
            </button>
          </div>

          <ProjectPageFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} filters={filters} setFilters={setFilters} applyFilters={() => setAppliedFilters(filters)} allTypes={allTypes} allTeams={allTeams} allTools={allTools} />
          {/* SELECTED SKILLS DISPLAY */}
          {appliedFilters.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {appliedFilters.tools.map(skill => (
                <span
                  key={skill}
                  className="
          flex items-center gap-2
          px-3 py-1 text-sm
          bg-accent text-black
          rounded-full
        "
                >
                  {skill}

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => {
                      const updated = appliedFilters.tools.filter(t => t !== skill)

                      setFilters(prev => ({ ...prev, tools: updated }))
                      setAppliedFilters(prev => ({ ...prev, tools: updated }))
                    }}
                    className="text-black hover:opacity-70"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
          {/* PROJECT GRID */}
          {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-400 mt-20 text-lg">No projects match the selected filters.</div>
          ) : (
            <div className="grid grid-cols-3 gap-8 mt-16">
              {filteredProjects.map(project => (
                <ProjectCells
                  key={project.name}
                  project={project}
                  isSelected={selectedProject?.name === project.name}
                  onClick={() => {
                    setSelectedProject(project)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

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
      <EvilFilter tools={appliedFilters.tools} evilMode={cookieState} />
      <div className="p-8">
        <FlagChecker toggleCookie={toggleCookie} />
      </div>
    </div>
  )
}
