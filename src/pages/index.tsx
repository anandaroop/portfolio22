import type { NextPage } from "next"
import type { Project } from "~/types"

import Head from "next/head"
import { fetchData } from "~/lib/fetchData"

interface Props {
  featuredProjects: Project[]
  projects: Project[]
}

const Home: NextPage<Props> = ({ featuredProjects, projects }) => {
  return (
    <>
      <Head>
        <title>Portfolio 22</title>
        <meta
          name="description"
          content="Portfolio site of Anandaroop Roy, freelance cartographer and information designer in New York City"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl my-4">Portfolio 22</h1>

      <pre>{JSON.stringify({ featuredProjects, projects }, null, 2)}</pre>
    </>
  )
}

export default Home

export async function getStaticProps(): Promise<{ props: Props }> {
  const response = await fetchData(`
      query ProjectsQuery {
          featuredProjects: allProjects(filter: {visible: 1, featured: 1}, sortField: "year", sortOrder: "desc") {
              ...project
          }
          projects: allProjects(filter: {visible: 1, featured: 0}, sortField: "year", sortOrder: "desc") {
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
              image
              placeholder
          }
      }
  `)
  return { props: response.data }
}
