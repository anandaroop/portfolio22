import type { Client, Project, Slide } from "~/types"

import { writeFileSync } from "fs"
import { request, gql } from "graphql-request"
import compact from "lodash/compact"
import flatten from "lodash/flatten"
import uniq from "lodash/uniq"

async function fetchData(query: string) {
  const response = await request("http://localhost:3002", query)
  return response
}

;(async function () {
  try {
    const { allSlides } = await fetchData(gql`
      {
        allSlides {
          tags
        }
      }
    `)

    const { allClients } = await fetchData(gql`
      {
        allClients(sortField: "name") {
          id
          name
        }
      }
    `)

    const { allProjects } = await fetchData(gql`
      {
        allProjects(sortField: "title", filter: { visible: 1 }) {
          id
          title
          subtitle
          year
          description
          Client {
            name
          }
          Slides {
            id
            baseName
            caption
            tags
          }
        }
      }
    `)

    const reshape = (project: Project) => {
      console.log(project.id, project.title)

      const captions = project.Slides.map((s: Slide) => s.caption)
      const tags = project.Slides.map(({ tags }) => tags)
      const slide = project.Slides[0]
      const thumbnail = `/slides/${slide.id}/200-square/${slide.baseName}.webp`

      return {
        id: project.id,
        title: project.title,
        subtitle: project.subtitle,
        year: project.year,
        description: project.description,
        client_name: project.Client.name,
        thumbnail,
        slide_captions: captions,
        slide_tags: uniq(flatten(tags).sort()),
      }
    }

    const allTags = allSlides.map((s: Slide) => s.tags)
    const uniqueTags = uniq(compact(flatten(allTags))).sort() as string[]

    const output = {
      projects: allProjects.map(reshape),
      // @ts-expect-error id string vs number weirdness
      clients: allClients.map((x: Client) => ({ ...x, id: parseInt(x.id) })),
      tags: uniqueTags.map((tag: string, i: number) => ({ id: i, name: tag })),
    }

    const fileName = `./data/searchable-content.json`
    const json = JSON.stringify(output, null, 2)
    writeFileSync(fileName, json)
  } catch (err) {
    console.error("err", err)
  }
})()
