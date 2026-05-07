import { client } from "./sanity.client"

export type MediaComment = {
  _id: string
  projectId: string
  images?: string[]
  video?: string
}

// 🔥 final shape (same as your old data)
export type MediaComments = {
  [projectId: string]: {
    images: string[]
    video?: string
  }
}

export async function getMediaComments(): Promise<MediaComments> {
  const data: MediaComment[] = await client.fetch(`
    *[_type == "mediaComment"] {
      _id,
      projectId,
      images,
      video
    }
  `)

  // 🔥 transform array → object keyed by projectId
  const result: MediaComments = {}

  data.forEach(item => {
    result[item.projectId.toLowerCase()] = {
      images: item.images || [],
      video: item.video
    }
  })

  return result
}
