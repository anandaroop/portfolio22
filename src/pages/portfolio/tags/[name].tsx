import type { NextPage } from "next/types"

import Link from "next/link"
import Head from "next/head"
import compact from "lodash/compact"
import flatten from "lodash/flatten"
import uniq from "lodash/uniq"
import { gql } from "graphql-request"

import { fetchData } from "~/lib/fetchData"

interface Props {
  tag: string
}

const Redirect: NextPage<Props> = ({ tag }) => {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`2; url=/tags/${tag}`} />
      </Head>

      <div className="p-6">
        <p className="mb-4">
          The page for <span className="font-bold">{tag}</span> has moved.
        </p>

        <p className="mb-4">
          You are being redirected to{" "}
          <Link href={`/tags/${tag}`}>
            <a className="underline">anandarooproy.com/tags/{tag}</a>
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
      allSlides {
        tags
      }
    }
  `)

  const uniqueTags = compact(
    uniq(flatten(data.allSlides.map(({ tags }: { tags: string[] }) => tags)))
  ).sort() as string[]

  const paths = uniqueTags.map((name: string) => {
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

  return { props: { tag: name } }
}
