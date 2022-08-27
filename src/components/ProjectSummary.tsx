import type { Project } from "~/types"

import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component"

import { getSlugFromProject } from "~/lib/slugs"

interface Props {
  project: Project
}

const DELAY = 0

export const ProjectSummary: React.FC<Props> = ({ project }) => {
  const slug = getSlugFromProject(project)
  const slide = project.Slides[0]

  const prefix = DELAY ? `https://deelay.me/${DELAY}/` : ""

  // TODO: replace me with real asset
  const imgSrc = `${prefix}http://www.anandarooproy.com/assets/slide/image/${slide.id}/small/${slide.image}`

  return (
    <Link href={`/projects/${slug}`}>
      <a className="group aspect-square w-1/2 p-4 sm:w-1/3 lg:w-1/5">
        <div className="relative">
          <div
            className="absolute top-0 z-10 m-2 w-auto overflow-hidden overflow-ellipsis p-2 text-lg font-medium text-neutral-700 transition-opacity group-hover:opacity-0 group-focus:opacity-0 sm:text-xl lg:text-2xl"
            style={{ textShadow: "0 0 5px #fff" }}
          >
            <h2 className="text-neutral-900">{project.title}</h2>
            <div className="font-normal text-neutral-500">
              {project.Client.name}
            </div>
          </div>
          <LazyLoadImage
            alt={slide.caption}
            className="w-full opacity-40 transition-opacity group-hover:opacity-100 group-hover:blur-none group-focus:opacity-100 group-focus:blur-none"
            wrapperClassName="w-full aspect-square"
            src={imgSrc}
            placeholderSrc={slide.placeholder}
          />
        </div>
      </a>
    </Link>
  )
}
