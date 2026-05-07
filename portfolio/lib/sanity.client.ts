import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: "2stki78k",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true
})
