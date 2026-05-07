import { client } from "./sanity.client"

export type Experience = {
  _id: string
  year: string
  title: string
  organization: string
  description: string
}

export async function getExperiences(): Promise<Experience[]> {
  return client.fetch(`
    *[_type == "experience"] | order(order asc) {
      _id,
      year,
      title,
      organization,
      description
    }
  `)
}