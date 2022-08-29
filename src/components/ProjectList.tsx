import type { Project } from "~/types"

import React from "react"
import { ProjectSummary } from "./ProjectSummary"

interface Props {
  projects: Project[]
}

export const ProjectList: React.FC<Props> = ({ projects }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
      {projects.map((project: Project) => (
        <ProjectSummary key={project.id} project={project} />
      ))}
    </div>
  )
}

export const ProjectListMemo = React.memo(ProjectList)
