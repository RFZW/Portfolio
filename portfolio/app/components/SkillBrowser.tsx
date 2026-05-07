"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"

type SkillCategory = {
  _id: string
  category: string
  items: string[]
}

export default function SkillBrowser({ skills }: { skills: SkillCategory[] }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const router = useRouter()

  // Flatten skills list
  const allSkills = skills.flatMap(group =>
    group.items.map(skill => ({
      name: skill,
      category: group.category
    }))
  )

  // Categories
  const categories = ["All", ...skills.map(group => group.category)]

  // Filter + sort
  const filteredSkills = useMemo(() => {
    return allSkills
      .filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = category === "All" || skill.category === category
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [search, category, allSkills])

  // Toggle select
  const toggleSkill = (skillName: string) => {
    setSelectedSkills(prev => (prev.includes(skillName) ? prev.filter(s => s !== skillName) : [...prev, skillName]))
  }

  // Redirect
  const handleFindProjects = () => {
    if (selectedSkills.length === 0) return

    const query = encodeURIComponent(selectedSkills.join(","))
    router.push(`/projects?tools=${query}`)
  }

  return (
    <div className="space-y-6">
      {/* SEARCH */}
      <input type="text" placeholder="Search skills..." value={search} onChange={e => setSearch(e.target.value)} className="w-full p-3 rounded bg-primary border border-gray-600 focus:border-accent outline-none" />

      {/* FILTER */}
      <select value={category} onChange={e => setCategory(e.target.value)} className="p-3 rounded bg-primary border border-gray-600 focus:border-accent outline-none">
        {categories.map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      {/* SELECTED SKILLS DISPLAY */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map(skill => (
            <span key={skill} className="px-3 py-1 text-sm bg-accent text-black rounded-full">
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* SKILLS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSkills.map(skill => {
          const isSelected = selectedSkills.includes(skill.name)

          return (
            <div
              key={skill.name}
              onClick={() => toggleSkill(skill.name)}
              className={`
                p-3 text-center rounded border cursor-pointer transition

                ${isSelected ? "bg-accent text-black border-accent scale-105" : "bg-secondary border-gray-600 hover:border-accent hover:text-accent hover:scale-105"}
              `}
            >
              {skill.name}
            </div>
          )
        })}
      </div>

      {/* FIND PROJECT BUTTON */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleFindProjects}
          disabled={selectedSkills.length === 0}
          className={`
            px-5 py-2.5 rounded-lg font-semibold transition
            ${selectedSkills.length === 0 ? "bg-gray-600 cursor-not-allowed" : "bg-accent text-black hover:opacity-80"}
          `}
        >
          Find Projects
        </button>

        <button
          onClick={() => setSelectedSkills([])}
          className={`
            px-9 py-3 mx-3 rounded-lg font-semibold transition
            ${selectedSkills.length === 0 ? "bg-gray-600 cursor-not-allowed" : "bg-accent text-black hover:opacity-80"}
          `}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
