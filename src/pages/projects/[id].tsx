import type { NextPage } from "next"
import type { Project, Slide } from "~/types"

import Head from "next/head"
import { fetchData } from "~/lib/fetchData"

interface Props {
  project: Project
}

const Page: NextPage<Props> = ({ project }) => {
  return (
    <>
      <Head>
        <title>Anandaroop Roy | {project.title}</title>
        <meta
          name="description"
          content="Portfolio site of Anandaroop Roy, freelance cartographer and information designer in New York City"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-5">
        <h2>{project.title}</h2>

        <div dangerouslySetInnerHTML={{ __html: project.description }} />

        <div className="flex flex-wrap">
          {project.Slides.map((slide: Slide) => (
            <img
              key={slide.id}
              className="w-[200px] m-2"
              src={slide.placeholder}
              alt={slide.caption}
            />
          ))}
        </div>
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
        } 
    }
    `)
  const paths = data.allProjects.map(({ id }: { id: number }) => ({
    params: { id },
  }))
  return { paths, fallback: false }
}

interface Context {
  params: {
    id: number
  }
}

export async function getStaticProps(context: Context) {
  const {
    params: { id },
  } = context
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
                    #image
                    placeholder
                    width
                    height
                }
            }
        }
        `,
    { id }
  )
  return { props: { project } }
}
