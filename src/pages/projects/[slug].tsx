import type { NextPage } from "next"
import type { Project } from "~/types"

import Head from "next/head"
import { gql } from "graphql-request"

import { fetchData } from "~/lib/fetchData"
import { getIdFromSlug, getSlugFromProject } from "~/lib/slugs"
import { ProjectView } from "~/components/project/ProjectView"

interface Props {
  project: Project & { slug: string }
}

const Page: NextPage<Props> = ({ project }) => {
  return (
    <>
      <Head>
        <title>{`Anandaroop Roy | ${project.title}`}</title>
        <meta
          name="description"
          content="Portfolio site of Anandaroop Roy, freelance cartographer and information designer in New York City"
        />
      </Head>

      <ProjectView project={project} />
    </>
  )
}

export default Page

export async function getStaticPaths() {
  const { data } = await fetchData(gql`
    query ProjectIDsQuery {
      allProjects(filter: { visible: 1 }) {
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
    gql`
      query ProjectQuery($id: ID!) {
        project: Project(id: $id) {
          id
          title
          subtitle
          year
          month
          description
          Client {
            id
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
