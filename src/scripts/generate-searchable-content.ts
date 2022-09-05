import { writeFileSync } from "fs"
import { request, gql } from "graphql-request"
import _ from "lodash"

async function fetchData(query: string) {
  const response = await request("http://localhost:3001", query)
  return response
}

;(async function () {
  try {
    const { allTags } = await fetchData(gql`
      {
        allTags(sortField: "name") {
          id
          name
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
            TagsSlides {
              Tag {
                name
              }
            }
          }
        }
      }
    `)

    const reshape = (project: any) => {
      const captions = project.Slides.map((s: any) => s.caption)
      const tags = project.Slides.map((s: any) =>
        s.TagsSlides.map((st: any) => st.Tag.name)
      )
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
        slide_tags: _.uniq(_.flatten(tags).sort()),
      }
    }

    const output = {
      projects: allProjects.map(reshape),
      clients: allClients.map((x: any) => ({ ...x, id: parseInt(x.id) })),
      tags: allTags.map((x: any) => ({ ...x, id: parseInt(x.id) })),
    }

    const fileName = `./data/searchable-content.json`
    const json = JSON.stringify(output, null, 2)
    writeFileSync(fileName, json)
  } catch (err) {
    console.error("err", err)
  }
})()
