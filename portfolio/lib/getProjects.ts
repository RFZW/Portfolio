import { client } from "./sanity.client"

export type SanityProject = {
  _id: string
  name: string
  id: string
  type: string
  team: string
  noimages: number
  video: boolean
  overview: string

  tools: {
    category: string
    items: string[]
  }[]

  features: string[]
  contributions: string[]
  challenges: string

  links?: {
    repo?: string
    live?: string
  }

  media?: {
    type: "image" | "video"
    url: string
    caption?: string
  }[]

  order?: number
}

// 🔥 transform to your OLD format (so UI doesn’t break)
export type Project = {
  name: string
  id: string
  type: string
  team: string
  noimages: number
  video: boolean
  overview: string

  tools: {
    [category: string]: string[]
  }

  features: string[]
  contributions: string[]
  challenges: string

  links?: {
    repo?: string
    live?: string
  }

  images: string[]
  videoUrl?: string
}

export async function getProjects(): Promise<Project[]> {
  const data: SanityProject[] = await client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      name,
      id,
      type,
      team,
      noimages,
      video,
      overview,
      tools,
      features,
      contributions,
      challenges,
      links,
      media
    }
  `)

  return data.map(p => {
    // 🔥 convert tools array → object
    const toolsObj: Record<string, string[]> = {}
    p.tools?.forEach(t => {
      toolsObj[t.category] = t.items
    })

    // 🔥 split media
    const images = p.media?.filter(m => m.type === "image").map(m => m.url) || []
    const video = p.media?.find(m => m.type === "video")?.url

    return {
      name: p.name,
      id: p.id.toLowerCase(),
      type: p.type,
      team: p.team,
      noimages: p.noimages,
      video: p.video,
      overview: p.overview,

      tools: toolsObj,

      features: p.features,
      contributions: p.contributions,
      challenges: p.challenges,

      links: p.links,

      images,
      videoUrl: video
    }
  })
}