import type { Tag, Client } from "~/types"
import MiniSearch from "minisearch"
import searchableContent from "../../../data/searchable-content.json"

export type TagDocument = Pick<Tag, "id" | "name">
export type ClientDocument = Pick<Client, "id" | "name">
export type ProjectDocument = {
  id: number
  title: string
  subtitle: string
  year: number
  description: string
  client_name: string
  thumbnail: string
  slide_captions: string[]
  slide_tags: string[]
}

type SearchableContent = {
  tags: TagDocument[]
  clients: ClientDocument[]
  projects: ProjectDocument[]
}

export class SearchEngine {
  private projectsIndex: MiniSearch
  private clientsIndex: MiniSearch
  private tagsIndex: MiniSearch

  constructor({
    projects,
    tags,
    clients,
  }: {
    projects: ProjectDocument[]
    clients: ClientDocument[]
    tags: TagDocument[]
  }) {
    this.tagsIndex = new MiniSearch({
      fields: ["name"],
      storeFields: ["name"],
    })
    this.tagsIndex.addAll(tags)

    this.clientsIndex = new MiniSearch({
      fields: ["name"],
      storeFields: ["name"],
    })
    this.clientsIndex.addAll(clients)

    this.projectsIndex = new MiniSearch({
      fields: [
        "id",
        "title",
        "subtitle",
        "year",
        "description",
        "client_name",
        "thumbnail",
        "slide_captions",
        "slide_tags",
      ],
      storeFields: [
        // "id",
        "title",
        // "subtitle",
        "year",
        // "description",
        "client_name",
        "thumbnail",
        // "slide_captions",
        // "slide_tags",
      ],
    })
    this.projectsIndex.addAll(projects)
  }

  static create() {
    return new SearchEngine(searchableContent as unknown as SearchableContent)
  }

  searchSync(query: string) {
    const tags = this.tagsIndex.search(query, { prefix: true })
    const clients = this.clientsIndex.search(query, { prefix: true })
    const projects = this.projectsIndex.search(query, {
      boost: { title: 2 },
      prefix: true,
    })

    return {
      tags,
      clients,
      projects,
    }
  }
}
