import { Project } from "~/types"

import Link from "next/link"
import { getSlugFromClient } from "~/lib/slugs"
import { SlideShow } from "./SlideShow"
import { VimeoClips } from "./VimeoClips"
import { abort } from "process"

interface Props {
  project: Project
}

export const ProjectView: React.FC<Props> = ({ project }) => {
  const clientSlug = getSlugFromClient(project.Client)
  const photoSlides = project.Slides.filter((slide) => !slide.clip).sort(
    (a, b) => (a.position < b.position ? -1 : b.position < a.position ? 1 : 0)
  )
  const videoClips = project.Slides.filter((slide) => !!slide.clip)

  return (
    <div className="p-6">
      <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
        {project.title}
      </h2>
      {project.subtitle && (
        <h3 className="my-2 text-lg text-neutral-500 dark:text-neutral-400 md:text-xl lg:text-2xl">
          {project.subtitle}
        </h3>
      )}

      <div className="my-2 text-lg md:text-xl lg:text-2xl">
        <Link href={`/clients/${clientSlug}`}>
          <a className="underline-offset-2 hover:underline">
            {project.Client.name}
          </a>
        </Link>
        , {project.year}
      </div>

      <div
        className="prose prose-neutral mt-6 leading-loose text-neutral-500 dark:prose-invert dark:text-neutral-400 md:prose-xl lg:prose-2xl"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />

      <SlideShow slides={photoSlides} square />

      {videoClips.length > 0 && <VimeoClips clips={videoClips} />}
    </div>
  )
}
