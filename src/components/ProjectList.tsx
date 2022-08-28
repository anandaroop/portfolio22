import type { Project } from "~/types"

import { ProjectSummary } from "./ProjectSummary"

interface Props {
  projects: Project[]
}

export const ProjectList: React.FC<Props> = ({ projects }) => {
  return (
    <div className="flex flex-wrap p-2">
      {projects.map((project: Project) => (
        <ProjectSummary key={project.id} project={project} />
      ))}
    </div>
  )
}
