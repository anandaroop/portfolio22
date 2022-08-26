import Link from "next/link"
import type { Project } from "~/types"

interface Props {
  project: Project
}

export const ProjectSummary: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <a className="group aspect-square w-1/2 p-4 hover:outline-8 focus:z-10 focus:opacity-20 sm:w-1/3 lg:w-1/4">
        <div className="relative">
          <h2 className="absolute top-0 w-full overflow-hidden overflow-ellipsis p-2 text-lg font-medium text-neutral-700 transition-all group-hover:top-[-1em] group-hover:opacity-0 sm:text-xl lg:text-2xl">
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
