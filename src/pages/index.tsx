import type { NextPage } from "next"
import type { Project } from "~/types"

import Head from "next/head"

import { fetchData } from "~/lib/fetchData"
import { ProjectList } from "~/components/ProjectList"

interface Props {
  allProjects: Project[]
}

const Home: NextPage<Props> = ({ allProjects }) => {
  return (
    <>
      <Head>
        <title>Anandaroop Roy</title>
        <meta
          name="description"
          content="Portfolio site of Anandaroop Roy, freelance cartographer and information designer in New York City"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProjectList projects={allProjects} />
    </>
  )
}

export default Home

export async function getStaticProps(): Promise<{ props: Props }> {
  const response = await fetchData(`
      query ProjectsQuery {
          allProjects(filter: {visible: 1}, sortField: "year", sortOrder: "desc") {
              ...project
          }
      }
      
      fragment project on Project {
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
  `)
  return { props: response.data }
}
