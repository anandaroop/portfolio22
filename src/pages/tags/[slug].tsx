import type { NextPage } from "next"
import type { Project, Tag, TagSlide } from "~/types"

import Head from "next/head"
import _ from "lodash"
import { fetchData } from "~/lib/fetchData"
import { ProjectList } from "~/components/ProjectList"
import { gql } from "graphql-request"

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
        <link rel="icon" href="/favicon.ico" />
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
    query TagsQuery {
      allTags(sortField: "name") {
        name
      }
    }
  `)

  const paths = data.allTags.map(({ name }: { name: string }) => {
    return {
      params: { slug: name },
    }
  })

  return { paths, fallback: false }
}

function extractProjects(response: any): Project[] {
  const tag = response.data.allTags[0]
  const projects = tag.TagsSlides.map((ts: TagSlide) => ts.Slide.Project)
  const sortedProjects = _.sortBy(projects, (p) => -p.year)
  const uniqueProjects = _.uniqBy(sortedProjects, (p) => p.id)
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
        allTags(filter: { name: $name }) {
          ...tag
        }
      }

      fragment tag on Tag {
        id
        name
        TagsSlides {
          Slide {
            TagsSlides {
              tag_id
              slide_id
            }
            Project {
              ...project
            }
          }
        }
      }

      fragment project on Project {
        visible
        id
        title
        year
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
