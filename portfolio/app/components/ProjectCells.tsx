"use client"

import Image from "next/image"
import { Project } from "../../lib/getProjects"

type Props = {
  project: Project
  isSelected: boolean
  onClick: () => void
}

export default function ProjectCells({ project, isSelected, onClick }: Props) {

  // flatten tools into one array
  const tools = Object.values(project.tools || {}).flat()

  // 🔥 get first image safely
  const imageUrl = project.images?.[0]

  return (
    <button
      onClick={onClick}
      className={`
        bg-secondary
        rounded-xl
        p-6
        text-left
        border
        transition
        hover:scale-105
        hover:border-accent

         ${isSelected ? "border-accent scale-105" : "border-transparent"}
      `}
    >

      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-3">
        {project.name}
      </h3>

      {/* TYPE + TEAM */}
      <div className="flex flex-wrap gap-2 mb-3">

        <span className="px-3 py-1 text-xs rounded-full bg-primary border border-gray-600">
          {project.type}
        </span>

        <span className="px-3 py-1 text-xs rounded-full bg-primary border border-gray-600">
          {project.team}
        </span>

      </div>

      {/* TOOLS */}
      <div className="flex flex-wrap gap-2 mb-4">

        {tools.map((tool) => (
          <span
            key={tool}
            className="
              px-3 py-1
              text-xs
              rounded-full
              border border-accent
              text-accent
            "
          >
            {tool}
          </span>
        ))}

      </div>

      {/* IMAGE */}
      <div className="w-full h-[160px] relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.name}
            fill
            className="rounded-md object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm border border-dashed border-gray-600 rounded-md">
            No Image
          </div>
        )}
      </div>
    </button>
  )
}