import type { Project } from "~/types"

import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component"

import { getSlugFromProject } from "~/lib/slugs"

interface Props {
  project: Project
}

export const ProjectSummary: React.FC<Props> = ({ project }) => {
  const slug = getSlugFromProject(project)
  const slide = project.Slides[0]
  const imgSrc = `/slides/${slide.id}/200-square/${slide.baseName}.webp`

  return (
    <Link href={`/projects/${slug}`}>
      <a className="group aspect-square">
        <div className="relative">
          <div className="text-shadow dark:text-shadow-dark absolute top-0 z-10 w-full overflow-hidden overflow-ellipsis p-2 text-lg font-medium  text-neutral-700 transition-opacity group-hover:opacity-0 group-focus:opacity-0 md:p-4 md:text-xl lg:text-2xl">
            <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {project.title}
            </h2>
            <div className="hidden font-medium text-neutral-600 dark:text-neutral-300 sm:block">
              {project.Client.name}
            </div>
          </div>
          <LazyLoadImage
            alt={slide.caption}
            className="w-full opacity-50 transition-opacity group-hover:opacity-100 group-hover:blur-none group-focus:opacity-100 group-focus:blur-none dark:opacity-60"
            wrapperClassName="w-full aspect-square"
            src={imgSrc}
            placeholderSrc={slide.placeholder}
          />
        </div>
      </a>
    </Link>
  )
}
