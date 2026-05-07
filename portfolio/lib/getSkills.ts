import { client } from "./sanity.client"

export type SkillCategory = {
  _id: string
  category: string
  items: string[]
}

export async function getSkills(): Promise<SkillCategory[]> {
  return client.fetch(`
    *[_type == "skillCategory"] | order(order asc) {
      _id,
      category,
      items
    }
  `)
}