"use client"

import type { Experience } from "../../lib/getExperiences"

export default function Timeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="mt-2">
      <h3 className="text-3xl font-bold mb-8 text-accent">
        Experience & Education
      </h3>

      <div className="relative border-l border-gray-600 pl-6 space-y-8 pb-16">
        {experiences.map(item => (
          <div key={item._id} className="relative">
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-accent rounded-full" />

            <div className="pl-8">
              <p className="text-sm text-gray-400">{item.year}</p>
              <h4 className="text-lg md:text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-300">{item.organization}</p>
              <p className="text-sm mt-2 text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}