import type { NextPage } from "next"
import type { Client } from "~/types"

import Link from "next/link"
import countBy from "lodash/countBy"
import { gql } from "graphql-request"

import { fetchData } from "~/lib/fetchData"
import { getSlugFromClient } from "~/lib/slugs"

type ClientWithProjectCount = Client & { projectCount: number }
interface Props {
  allClients: ClientWithProjectCount[]
}

const Page: NextPage<Props> = ({ allClients }) => {
  return (
    <>
      <h1 className="p-6 pb-0 text-2xl lg:text-4xl">All clients</h1>
      <div className="columns-1 p-6 lg:columns-2 ">
        {allClients.map((client) => (
          <Client key={client.id} client={client} />
        ))}
      </div>
    </>
  )
}

const Client: React.FC<{ client: ClientWithProjectCount }> = ({ client }) => {
  const slug = getSlugFromClient(client)

  return (
    <div className="py-2 text-lg lg:text-xl">
      <Link href={`/clients/${slug}`}>
        <a className="underline underline-offset-4">{client.name}</a>
      </Link>

      {client.projectCount > 1 && (
        <span className="dark:text-neutral-500">
          {" "}
          ({client.projectCount} projects)
        </span>
      )}
    </div>
  )
}

export default Page

export async function getStaticProps(): Promise<{ props: Props }> {
  const response = await fetchData(gql`
    query ClientsQuery {
      allClients(sortField: "name") {
        name
        id
      }
      allProjects {
        client_id
      }
    }
  `)

  const { allClients, allProjects } = response.data

  const projectCounts = countBy(allProjects, (p) => p.client_id)

  return {
    props: {
      allClients: allClients.map((client: Client) => ({
        ...client,
        projectCount: projectCounts[client.id],
      })),
    },
  }
}
