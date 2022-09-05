import type { NextPage } from "next/types"
import type { Tag } from "~/types"

import Link from "next/link"
import Head from "next/head"
import { gql } from "graphql-request"
import { fetchData } from "~/lib/fetchData"

interface Props {
  tag: Tag
}

const Redirect: NextPage<Props> = ({ tag }) => {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`2; url=/tags/${tag.name}`} />
      </Head>

      <div className="p-6">
        <p className="mb-4">
          The page for <span className="font-bold">{tag.name}</span> has moved.
        </p>

        <p className="mb-4">
          You are being redirected to{" "}
          <Link href={`/tags/${tag.name}`}>
            <a className="underline">anandarooproy.com/tags/{tag.name}</a>
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
      allTags {
        name
      }
    }
  `)

  const paths = data.allTags.map(({ name }: { name: string }) => {
    return {
      params: { name },
    }
  })

  return { paths, fallback: false }
}

interface Context {
  params: {
    name: string
  }
}

export async function getStaticProps(context: Context) {
  const {
    params: { name },
  } = context

  const {
    data: { allTags },
  } = await fetchData(
    gql`
      query TagQuery($name: String) {
        allTags(filter: { name: $name }) {
          id
          name
        }
      }
    `,
    { name }
  )

  return { props: { tag: allTags[0] } }
}
