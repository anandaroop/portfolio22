import type { NextPage } from "next/types"
import type { Project } from "~/types"

import Link from "next/link"
import Head from "next/head"
import { gql } from "graphql-request"
import { fetchData } from "~/lib/fetchData"
import { getSlugFromProject } from "~/lib/slugs"

interface Props {
  project: Project & { slug: string }
}

const Redirect: NextPage<Props> = ({ project }) => {
  return (
    <>
      <Head>
        <meta
          httpEquiv="refresh"
          content={`2; url=/projects/${project.slug}`}
        />
      </Head>

      <div className="p-6">
        <p className="mb-4">
          The page for <cite className="font-bold italic">{project.title}</cite>{" "}
          has moved.
        </p>

        <p className="mb-4">
          You are being redirected to{" "}
          <Link href={`/projects/${project.slug}`}>
            <a className="underline">
              anandarooproy.com/projects/{project.slug}
            </a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Redirect

export async function getStaticPaths() {
  const { data } = await fetchData(gql`
    query ProjectIDsQuery {
      allProjects(filter: { visible: 1 }) {
        id
        title
      }
    }
  `)

  const paths = data.allProjects.map(({ id }: { id: number }) => {
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
    data: { project },
  } = await fetchData(
    gql`
      query ProjectQuery($id: ID!) {
        project: Project(id: $id) {
          id
          title
        }
      }
    `,
    { id }
  )

  const slug = getSlugFromProject(project)

  return { props: { project: { ...project, slug } } }
}
