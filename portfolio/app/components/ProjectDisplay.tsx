"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Project } from "../../lib/getProjects"
import { MediaComments } from "../../lib/getMediaComments"

type Props = {
  project: Project
  mediaComments: MediaComments
}

export default function ProjectDisplay({ project, mediaComments }: Props) {
  const [mediaIndex, setMediaIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [resetTrigger, setResetTrigger] = useState(0)

  // 🔥 get media directly from sanity
  const media = [...project.images.map(url => ({ type: "image", url })), ...(project.videoUrl ? [{ type: "video", url: project.videoUrl }] : [])]

  const currentMedia = media[mediaIndex]

  const projectComments = mediaComments?.[project.id]

  const currentComment = currentMedia?.type === "image" ? projectComments?.images?.[mediaIndex] : projectComments?.video

  const nextMedia = () => {
    setMediaIndex(prev => (prev + 1) % media.length)
  }

  const prevMedia = () => {
    setMediaIndex(prev => (prev - 1 + media.length) % media.length)
  }

  const resetTimer = () => {
    setResetTrigger(prev => prev + 1)
  }

  useEffect(() => {
    setMediaIndex(0)
  }, [project])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (isOpen || media.length === 0) return

    intervalRef.current = setInterval(() => {
      nextMedia()
    }, 10000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [mediaIndex, resetTrigger, isOpen, media.length])

  return (
    <section className="bg-secondary rounded-xl p-10 shadow-xl">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-accent mb-2">{project.name}</h1>

      <p className="text-sm text-gray-400 mb-6">
        {project.type} • {project.team}
      </p>

      {/* OVERVIEW */}
      <p className="mb-8 max-w-3xl">{project.overview}</p>

      {/* MEDIA DISPLAY */}
      <div
        className="relative w-full h-[500px] mb-8 cursor-pointer group"
        onMouseEnter={() => {
          setIsHovered(true)
          resetTimer()
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
      >
        {/* MEDIA */}
        {currentMedia?.type === "video" ? <video src={currentMedia.url} className="w-full h-full object-cover rounded-lg" autoPlay muted loop /> : currentMedia?.url ? <Image src={currentMedia.url} alt={project.name} fill className="object-cover rounded-lg" /> : null}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg" />

        {/* TEXT */}
        <div className="absolute bottom-4 left-4 text-white">{currentComment || project.name}</div>

        {/* ARROWS */}
        <button
          onClick={e => {
            e.stopPropagation()
            prevMedia()
            resetTimer()
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 px-3 py-2 rounded"
        >
          ←
        </button>

        <button
          onClick={e => {
            e.stopPropagation()
            nextMedia()
            resetTimer()
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 px-3 py-2 rounded"
        >
          →
        </button>
      </div>

      {/* TOOLS */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-accent">Tools & Technologies</h3>

        <div className="flex flex-wrap gap-2">
          {Object.values(project.tools)
            .flat()
            .map((tool: string) => (
              <span key={tool} className="px-3 py-1 bg-primary rounded-full text-sm border border-gray-600">
                {tool}
              </span>
            ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-accent">Features</h3>
        <ul className="list-disc list-inside">
          {project.features?.map((f: string) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      {/* CONTRIBUTIONS */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-accent">My Contributions</h3>
        <ul className="list-disc list-inside">
          {project.contributions?.map((c: string) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      {/* CHALLENGES */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-accent">Challenges</h3>
        <p>{project.challenges}</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          {/* STOP click bubbling so image click doesn't close */}
          <div className="relative max-w-5xl w-full px-6" onClick={e => e.stopPropagation()}>
            {/* MEDIA */}
            {currentMedia?.type === "video" ? <video src={currentMedia.url} className="w-full max-h-[80vh] object-contain rounded-lg" controls autoPlay /> : <img src={currentMedia?.url} className="w-full max-h-[80vh] object-contain rounded-lg" />}

            {/* COMMENT */}
            <div className="text-white text-center mt-4 text-lg">{currentComment || project.name}</div>

            {/* LEFT BUTTON */}
            <button
              onClick={e => {
                e.stopPropagation()
                prevMedia()
                resetTimer()
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 px-4 py-3 text-white text-2xl rounded"
            >
              ←
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={e => {
                e.stopPropagation()
                nextMedia()
                resetTimer()
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 px-4 py-3 text-white text-2xl rounded"
            >
              →
            </button>

            {/* CLOSE BUTTON */}
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white text-3xl">
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
