import Link from "next/link"
import type { Project } from "~/types"

interface Props {
  project: Project
}

export const ProjectSummary: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <a className="w-1/2 sm:w-1/3 lg:w-1/4 aspect-square hover:outline-8 focus:opacity-20 focus:z-10 p-4 group">
        <div className="relative">
          <h2 className="absolute w-full text-neutral-700 text-lg sm:text-xl lg:text-2xl font-medium p-2 top-0 group-hover:top-[-1em] group-hover:opacity-0 transition-all overflow-hidden overflow-ellipsis">
            {project.title}
          </h2>
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
