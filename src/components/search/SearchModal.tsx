import type { Project } from "~/types"
import type { ClientDocument, ProjectDocument, TagDocument } from "./engine"

import React, { useEffect, useRef } from "react"
import Link from "next/link"

import { useSearch } from "./SearchContext"
import { getSlugFromProject } from "~/lib/slugs"
import { SearchEngine } from "./engine"

const searchEngine = SearchEngine.create()

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

  // synchronously fetch results when query changes
  const results = searchEngine.searchSync(query)

  return (
    <dialog
      className="modal-styles container h-[90vh] w-[60em] border-8 border-black border-opacity-20 bg-white bg-opacity-95 p-7"
      ref={dialogRef}
    >
      <div className="text-xl">
        <h2 className="mb-4 text-2xl font-bold">
          Search results{query.length > 1 ? ` for "${query}"` : ""}
        </h2>

        <input
          className="my-2 w-full border-2 border-neutral-200 p-1 text-xl"
          type="text"
          placeholder="Enter some search terms to see results"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        <MatchingTags tags={results.tags} />
        <MatchingClients clients={results.clients} />
        <MatchingProjects
          projects={results.projects as unknown as ProjectDocument[]}
        />
      </div>
    </dialog>
  )
}

const MatchingTags: React.FC<{ tags: Partial<TagDocument>[] }> = ({ tags }) => {
  if (!tags.length) return null

  return (
    <div>
      <h3 className="mt-5 mb-2 font-bold">Tags</h3>
      <ul className="leading-8">
        {tags.map((tag) => {
          return (
            <li className="mr-2 inline-block" key={tag.id}>
              <Link href={`/`}>
                <a className="text-neutral-500 underline underline-offset-4">
                  {tag.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const MatchingClients: React.FC<{ clients: Partial<ClientDocument>[] }> = ({
  clients,
}) => {
  if (!clients.length) return null

  return (
    <div>
      <h3 className="mt-5 mb-2 font-bold">Clients</h3>
      <ul className="leading-8">
        {clients.map((client) => {
          return (
            <li className="mr-2 inline-block" key={client.id}>
              <Link href={`/`}>
                <a className="text-neutral-500 underline underline-offset-4">
                  {client.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const MatchingProjects: React.FC<{ projects: ProjectDocument[] }> = ({
  projects,
}) => {
  const { query, exitSearchMode } = useSearch()
  if (!query.length) return null

  return (
    <div className="">
      <h3 className="mt-5 mb-2 font-bold">Projects</h3>
      <ul>
        {projects.map((project: ProjectDocument) => {
          const slug = getSlugFromProject(project as unknown as Project)
          return (
            <li className="mr-2 inline" key={project.id}>
              <Link href={`/projects/${slug}`}>
                <a className="text-neutral-500 " onClick={exitSearchMode}>
                  <div className="flex items-center">
                    <img
                      className="mr-4 h-12"
                      src={project.thumbnail}
                      alt={project.title}
                    />
                    <div>
                      <span className="underline underline-offset-4">
                        {project.title}
                      </span>
                      <span className="text-neutral-400 no-underline">
                        {" "}
                        {project.client_name}, {project.year}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
