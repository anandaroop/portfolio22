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
      <a
        id="summary-square-parent"
        className="group aspect-w-1 aspect-h-1 w-full"
      >
        <div id="summary-square-child" className="relative">
          <div
            id="image-square-parent"
            className="aspect-w-1 aspect-h-1 absolute w-full"
          >
            <LazyLoadImage
              id="image-square-child"
              alt={slide.caption}
              className="w-full opacity-50 transition-opacity group-hover:opacity-100 group-focus:opacity-100 dark:opacity-60"
              src={imgSrc}
              placeholderSrc={slide.placeholder}
            />
          </div>
          <div
            id="text-square-parent"
            className="aspect-w-1 aspect-h-1 absolute w-full"
          >
            <div
              id="text-square-child"
              className="text-shadow dark:text-shadow-dark overflow-hidden p-2 text-lg transition-opacity group-hover:opacity-0 group-focus:opacity-0 md:text-xl lg:text-2xl"
            >
              <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {project.title}
              </h2>
              <div className="hidden font-medium text-neutral-600 dark:text-neutral-300 sm:block">
                {project.Client.name}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
