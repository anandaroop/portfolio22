import type { NextPage } from "next"
import type { Project } from "~/types"

import Head from "next/head"

import { fetchData } from "~/lib/fetchData"
import { getIdFromSlug, getSlugFromProject } from "~/lib/slugs"
import { SlideShow } from "~/components/project/SlideShow"
import { VimeoClips } from "~/components/project/VimeoClips"

interface Props {
  project: Project & { slug: string }
}

const Page: NextPage<Props> = ({ project }) => {
  const photoSlides = project.Slides.filter((slide) => !slide.clip)
  const videoClips = project.Slides.filter((slide) => !!slide.clip)

  return (
    <>
      <Head>
        <title>{`Anandaroop Roy | ${project.title}`}</title>
        <meta
          name="description"
          content="Portfolio site of Anandaroop Roy, freelance cartographer and information designer in New York City"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-6">
        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
          {project.title}
        </h2>

        <div className="my-2 p-1 text-lg font-medium md:text-xl lg:text-2xl">
          {project.Client.name}, {project.year}
        </div>

        <div
          className="maxleading-loose prose prose-neutral my-4 dark:prose-invert dark:text-neutral-400 md:prose-xl lg:prose-2xl"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        <SlideShow slides={photoSlides} />

        {videoClips.length > 0 && <VimeoClips clips={videoClips} />}
      </div>
    </>
  )
}

export default Page

export async function getStaticPaths() {
  const { data } = await fetchData(`
    query ProjectIDsQuery { 
        allProjects(filter: {visible: 1}) {
            id
            title
        } 
    }
    `)

  const paths = data.allProjects.map(
    ({ id, title }: { id: number; title: string }) => {
      const slug = getSlugFromProject({ id, title })

      return {
        params: { slug },
      }
    }
  )
  return { paths, fallback: false }
}

interface Context {
  params: {
    slug: string
  }
}

export async function getStaticProps(context: Context) {
  const {
    params: { slug },
  } = context

  const id = getIdFromSlug(slug)

  const {
    data: { project },
  } = await fetchData(
    `
        query ProjectQuery($id: ID!) {
            project: Project(id: $id) {
                id
                title
                year
                month
                description
                Client {
                    name
                }
                Slides {
                    id
                    position
                    caption
                    clip
                    vimeo_clipid
                    aspect
                    image
                    baseName
                    placeholder
                    width
                    height
                }
            }
        }
        `,
    { id }
  )

  return { props: { project: { ...project, slug } } }
}
