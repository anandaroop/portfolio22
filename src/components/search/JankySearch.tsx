/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { Client, Project, Tag } from "~/types"

import data from "../../../data.json"

export type JankyResults = {
  clients: Client[]
  projects: Project[]
  tags: Tag[]
}
export class JankySearch {
  private _clients: Client[]
  private _projects: Project[]
  private _tags: Tag[]

  constructor({
    clients,
    projects,
    tags,
  }: {
    clients: Client[]
    projects: Project[]
    tags: Tag[]
  }) {
    this._clients = clients
    this._projects = projects
    this._tags = tags
    console.log(
      `Created JankySearch with ${clients.length} clients,  ${projects.length} projects,  ${tags.length} tags`
    )
  }

  static create() {
    return new JankySearch({
      clients: data.clients,
      projects: data.projects as unknown as Project[],
      tags: data.tags as unknown as Tag[],
    })
  }

  search(query: string): Promise<JankyResults> {
    return new Promise((resolve, reject) => {
      try {
        const results = this.searchSync(query)
        resolve(results)
      } catch (err) {
        reject(err)
      }
    })
  }

  searchSync(query: string): JankyResults {
    const matchingTags = this._tags.filter((tag: Partial<Tag>) => {
      const re = new RegExp(query, "i")
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (tag.name!.match(re)) return true
    })

    const matchingClients = this._clients.filter((client: Partial<Client>) => {
      const re = new RegExp(query, "i")
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (client.name!.match(re)) return true
    })

    const matchingProjects = (
      this._projects as unknown as Partial<
        Pick<Project, "title" | "subtitle" | "description" | "visible">
      >[]
    ).filter((project) => {
      const re = new RegExp(query, "i")
      if (!project.visible) return false
      if (
        project.title!.match(re) ||
        project.subtitle!.match(re) ||
        project.description!.match(re)
      )
        return true
    })

    return {
      clients: matchingClients as unknown as Client[],
      projects: matchingProjects as unknown as Project[],
      tags: matchingTags as unknown as Tag[],
    }
  }
}
