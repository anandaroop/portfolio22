/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { Client, Project, Tag } from "~/types"

import React, { useEffect, useRef } from "react"
import { useSearch } from "./SearchContext"

import { tags, clients, projects } from "../../../data.json"
import Link from "next/link"

export const SearchModal: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { inSearchMode, enterSearchMode, exitSearchMode, query, setQuery } =
    useSearch()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // app state updates modal state
    if (inSearchMode) {
      // avoid Next hot-refresh error msg
      if (!dialog.hasAttribute("open")) {
        dialog.showModal()
      }
    } else {
      dialog.close()
    }

    // modal state updates app state
    dialog.addEventListener("close", exitSearchMode)

    // listen for hotkey
    const listenForHotKey = (e: KeyboardEvent) => {
      if (e.key == "k" && e.metaKey) enterSearchMode()
    }
    window.addEventListener("keydown", listenForHotKey)

    // clean up
    return () => {
      dialog.removeEventListener("close", exitSearchMode)
      window.removeEventListener("keydown", listenForHotKey)
    }
  }, [inSearchMode, exitSearchMode, enterSearchMode])

  const matchingTags = tags.filter((tag: Partial<Tag>) => {
    const re = new RegExp(query, "i")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (tag.name!.match(re)) return true
  })

  const matchingClients = clients.filter((client: Partial<Client>) => {
    const re = new RegExp(query, "i")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (client.name!.match(re)) return true
  })

  const matchingProjects = (
    projects as unknown as Partial<
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

  return (
    <dialog ref={dialogRef}>
      <p>I am a search modal</p>
      <input
        type="text"
        placeholder="Enter search terms"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <MatchingTags tags={matchingTags} />
      <MatchingClients clients={matchingClients} />
      <MatchingProjects projects={matchingProjects} />
    </dialog>
  )
}

const MatchingTags: React.FC<{ tags: Partial<Tag>[] }> = ({ tags }) => {
  if (!tags.length) return null

  return (
    <div>
      <div>Tags</div>
      <ul>
        {tags.map((tag) => {
          return (
            <li className="mr-2 inline" key={tag.id}>
              <Link href={`/tags/${tag.name}`}>
                <a>{tag.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const MatchingClients: React.FC<{ clients: Partial<Client>[] }> = ({
  clients,
}) => {
  if (!clients.length) return null

  return (
    <div>
      <div>Clients</div>
      <ul>
        {clients.map((client) => {
          return (
            <li className="mr-2 inline" key={client.id}>
              <Link href={`/clients/${client.name}`}>
                <a>{client.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const MatchingProjects: React.FC<{ projects: Partial<Project>[] }> = ({
  projects,
}) => {
  if (!projects.length) return null

  return (
    <div>
      <div>Projects</div>
      <ul>
        {projects.map((project) => {
          return (
            <li className="mr-2 inline" key={project.id}>
              <Link href={`/projects/${project.title}`}>
                <a>{project.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
