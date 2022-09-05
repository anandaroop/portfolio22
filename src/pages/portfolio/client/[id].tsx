import type { NextPage } from "next/types"
import type { Client } from "~/types"

import Link from "next/link"
import Head from "next/head"
import { gql } from "graphql-request"
import { fetchData } from "~/lib/fetchData"
import { getSlugFromClient } from "~/lib/slugs"

interface Props {
  client: Client & { slug: string }
}

const Redirect: NextPage<Props> = ({ client }) => {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`2; url=/clients/${client.slug}`} />
      </Head>

      <div className="p-6">
        <p className="mb-4">
          The page for <span className="font-bold">{client.name}</span> has
          moved.
        </p>

        <p className="mb-4">
          You are being redirected to{" "}
          <Link href={`/clients/${client.slug}`}>
            <a className="underline">anandarooproy.com/clients/{client.slug}</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Redirect

export async function getStaticPaths() {
  const { data } = await fetchData(gql`
    {
      allClients {
        id
        name
      }
    }
  `)

  const paths = data.allClients.map(({ id }: { id: number }) => {
    return {
      params: { id },
    }
  })

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
    data: { client },
  } = await fetchData(
    gql`
      query ClientQuery($id: ID!) {
        client: Client(id: $id) {
          id
          name
        }
      }
    `,
    { id }
  )

  const slug = getSlugFromClient(client)

  return { props: { client: { ...client, slug } } }
}
