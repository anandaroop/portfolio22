import type { Project } from "~/types"

import Link from "next/link"
import { getSlugFromProject } from "~/lib/slugs"

interface Props {
  project: Project
}

export const ProjectSummary: React.FC<Props> = ({ project }) => {
  const slug = getSlugFromProject(project)

  return (
    <Link href={`/projects/${slug}`}>
      <a className="aspect-square w-1/2 p-4 opacity-90 hover:opacity-100 sm:w-1/3 lg:w-1/5">
        <div className="relative">
          <div className="absolute top-0 w-full overflow-hidden overflow-ellipsis p-2 text-lg font-medium text-neutral-700 transition-all sm:text-xl lg:text-2xl">
            <h2 className=" text-neutral-900">{project.title}</h2>
            <div className="font-normal text-neutral-500">
              {project.Client.name}
            </div>
          </div>
          <img
            className="w-full"
            src={project.Slides[0].placeholder}
            alt={project.title}
          />
        </div>
      </a>
    </Link>
  )
}
