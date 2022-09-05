import type { NextPage } from "next"
import type { Client, Project } from "~/types"

import Head from "next/head"
import _ from "lodash"
import { fetchData } from "~/lib/fetchData"
import { ProjectList } from "~/components/ProjectList"
import { gql } from "graphql-request"
import { getIdFromSlug, getSlugFromClient } from "~/lib/slugs"

interface Props {
  client: Client
}

const Page: NextPage<Props> = (props) => {
  const { client } = props
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

      <h2 className="p-6 text-2xl font-medium md:text-3xl lg:text-4xl">
        Client: {client?.name}
      </h2>

      <ProjectList projects={client.Projects} />
    </>
  )
}

export default Page

export async function getStaticPaths() {
  const { data } = await fetchData(gql`
    query ClientsQuery {
      allClients(sortField: "name") {
        id
        name
      }
    }
  `)

  const paths = data.allClients.map(
    ({ id, name }: { id: number; name: string }) => {
      const slug = getSlugFromClient({ id, name })

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

export async function getStaticProps(
  context: Context
): Promise<{ props: Props }> {
  const {
    params: { slug },
  } = context
  const id = getIdFromSlug(slug)

  const {
    data: { client },
  } = await fetchData(
    gql`
      query ClientQuery($id: ID!) {
        client: Client(id: $id) {
          ...client
        }
      }

      fragment client on Client {
        id
        name
        Projects {
          ...project
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
    { id }
  )

  client.Projects = client.Projects.filter((p: Project) => p.visible)
  return { props: { client } }
}
