import HomeClient from "./HomeClient"
import { getExperiences } from "../lib/getExperiences"
import { getSkills } from "../lib/getSkills"
import { getProjects } from "../lib/getProjects"

export default async function Page() {
  const experiences = await getExperiences()
  const skills = await getSkills()
  const projects = await getProjects()

  return <HomeClient experiences={experiences} skills={skills} projects={projects} />
}