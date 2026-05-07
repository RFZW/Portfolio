import { getProjects } from "../../lib/getProjects"
import { getSkills } from "../../lib/getSkills"
import { getMediaComments } from "../../lib/getMediaComments"
import ProjectsPageClient from "./ProjectsPageClient"

export const dynamic = 'force-dynamic'

export default async function Page() {
  try {
    const projects = await getProjects()
    const skills = await getSkills()
    const mediaComments = await getMediaComments()

    return <ProjectsPageClient projects={projects} skills={skills} mediaComments={mediaComments} />
  } catch (error) {
    console.error('Error fetching data:', error)
    // Return a fallback or error page
    return <div>Error loading projects. Please try again later.</div>
  }
}
