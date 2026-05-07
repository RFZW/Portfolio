"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Project } from "../../lib/getProjects"

type Props = {
  projects: Project[]
}

export default function ProjectCarousel({ projects }: Props) {
  const [index, setIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const dragStart = useRef<number | null>(null)
  const dragEnd = useRef<number | null>(null)

  const next = () => {
    setIndex(prev => (prev + 1) % projects.length)
  }

  const prev = () => {
    setIndex(prev => (prev - 1 + projects.length) % projects.length)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart.current !== null) {
      dragEnd.current = e.clientX
    }
  }

  const handleMouseUp = () => {
    if (dragStart.current !== null && dragEnd.current !== null) {
      const distance = dragStart.current - dragEnd.current

      if (distance > 80) next()
      if (distance < -80) prev()
    }

    dragStart.current = null
    dragEnd.current = null
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        next()
      } else {
        prev()
      }
    }

    const el = carouselRef.current

    if (el) {
      el.addEventListener("wheel", handleWheel)
    }

    return () => {
      if (el) {
        el.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  const left = (index - 1 + projects.length) % projects.length
  const right = (index + 1) % projects.length

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <h2 className="text-4xl font-bold mb-16 text-accent">Projects</h2>

      <div className="relative w-full max-w-6xl flex items-center justify-center cursor-grab active:cursor-grabbing" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div className="absolute left-0 opacity-50 scale-90 transition-all duration-500">
          <ProjectCard project={projects[left]} />
        </div>

        <div className="z-10 transition-all duration-500">
          <ProjectCard project={projects[index]} />
        </div>

        <div className="absolute right-0 opacity-50 scale-90 transition-all duration-500">
          <ProjectCard project={projects[right]} />
        </div>
      </div>

      <div className="flex gap-10 mt-10">
        <button onClick={prev} className="text-4xl hover:text-accent">
          ←
        </button>
        <button onClick={next} className="text-4xl hover:text-accent">
          →
        </button>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const imageSrc = project.images && project.images.length > 0 
    ? project.images[0] 
    : `/${project.id}/${project.id} (1).png`

  return (
    <div className="bg-secondary p-8 rounded-xl shadow-xl max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2">{project.name}</h3>

      <p className="text-sm text-gray-300 mb-4">
        {project.type} • {project.team}
      </p>

      <p className="text-sm mb-6">{project.overview}</p>

      <div className="w-full h-[220px] relative">
        <Image 
          src={imageSrc} 
          alt={project.name} 
          fill 
          className="rounded-lg object-cover" 
          onError={(e) => {
            // Hide the image container if image fails to load
            const container = e.currentTarget.parentElement
            if (container) container.style.display = 'none'
          }}
        />
      </div>
    </div>
  )
}
