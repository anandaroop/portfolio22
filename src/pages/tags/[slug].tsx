import type { NextPage } from "next"
import type { Project, Slide } from "~/types"

import Head from "next/head"
import { gql } from "graphql-request"
import compact from "lodash/compact"
import flatten from "lodash/flatten"
import uniq from "lodash/uniq"
import sortBy from "lodash/sortBy"
import uniqBy from "lodash/uniqBy"

import { fetchData } from "~/lib/fetchData"
import { ProjectList } from "~/components/project-list/ProjectList"

interface Props {
  tagName: string
  projects: Project[]
}

const Page: NextPage<Props> = ({ tagName, projects }) => {
  return (
    <>
      <Head>
        <title>{`Anandaroop Roy | Tag: ${tagName}`}</title>
        <meta
          name="description"
          content="Portfolio site of Anandaroop Roy, freelance cartographer and information designer in New York City"
        />
      </Head>

      <h2 className="p-6 text-2xl font-medium md:text-3xl lg:text-4xl">
        Tag: {tagName}
      </h2>

      <ProjectList projects={projects} />
    </>
  )
}

export default Page

export async function getStaticPaths() {
  const { data } = await fetchData(gql`
    {
      allSlides {
        tags
      }
    }
  `)

  const uniqueTags = compact(
    uniq(flatten(data.allSlides.map(({ tags }: { tags: string[] }) => tags)))
  ).sort()

  const paths = uniqueTags.map((name) => {
    return {
      params: { slug: name },
    }
  })

  return { paths, fallback: false }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractProjects(response: any): Project[] {
  const projects = response.data.allSlides.map((s: Slide) => s.Project)
  const sortedProjects = sortBy(projects, (p) => -p.year * 12 - p.month)
  const uniqueProjects = uniqBy(sortedProjects, (p) => p.id)
  const result = uniqueProjects.filter((p: Project) => p.visible)
  return result
}

interface Context {
  params: {
    slug: string
  }
}

export async function getStaticProps(
  context: Context
): Promise<{ props: Props }> {
  const {
    params: { slug },
  } = context

  const response = await fetchData(
    gql`
      query TagQuery($name: String) {
        allSlides(filter: { tags: [$name] }) {
          caption
          tags
          Project {
            ...project
          }
        }
      }

      fragment project on Project {
        visible
        id
        title
        year
        month
        Client {
          name
        }
        Slides {
          id
          baseName
          placeholder
        }
      }
    `,
    { name: slug }
  )

  const projects = extractProjects(response)
  return { props: { projects, tagName: slug } }
}
