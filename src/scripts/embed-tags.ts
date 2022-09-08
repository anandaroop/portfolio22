import type { Slide } from "~/types"

import { readFileSync, writeFileSync } from "fs"
import { request, gql } from "graphql-request"

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
          TagsSlides {
            slide_id
          }
        }
      }
    `)

    type Tag = {
      id: string
      name: string
      TagsSlides: { slide_id: string }[]
    }

    type SlideTagsMap = Record<string, string[]>

    const slideTagsMap = allTags.reduce((acc: SlideTagsMap, tag: Tag) => {
      tag.TagsSlides.map(({ slide_id }) => {
        if (acc[slide_id]) {
          acc[slide_id].push(tag.name)
        } else {
          acc[slide_id] = [tag.name]
        }
      })
      return acc
    }, {})

    console.log(slideTagsMap)

    const data = JSON.parse(readFileSync("./data/data.json", "utf8"))

    const updatedSlides = data.slides.map((slide: Slide) => ({
      ...slide,
      tags: slideTagsMap[slide.id],
    }))

    const timestamp = new Date()
      .toISOString()
      .replace(/\W/g, "")
      .replace(/\d{3}Z$/, "")
      .replace(/T/, ".")
    const fileName = `./data.${timestamp}.json`

    const json = JSON.stringify({ ...data, slides: updatedSlides }, null, 2)

    writeFileSync(fileName, json)
  } catch (err) {
    console.error("err", err)
  }
})()
