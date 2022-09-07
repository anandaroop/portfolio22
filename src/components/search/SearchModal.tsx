import type { Client, Project } from "~/types"
import type { ClientDocument, ProjectDocument, TagDocument } from "./engine"

import React, { useEffect, useRef } from "react"
import Link from "next/link"

import { useSearch } from "./SearchContext"
import { getSlugFromClient, getSlugFromProject } from "~/lib/slugs"
import { SearchEngine } from "./engine"

const searchEngine = SearchEngine.create()

export const SearchModal: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    inSearchMode,
    enterSearchMode,
    exitSearchMode,
    query,
    setQuery,
    canDialog,
  } = useSearch()

  useEffect(() => {
    if (!canDialog) return

    const dialog = dialogRef.current
    if (!dialog) return

    // app state updates modal state
    if (inSearchMode) {
      // avoid Next hot-refresh error msg
      if (!dialog.hasAttribute("open")) {
        dialog.showModal()
        inputRef.current?.select()
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
  }, [inSearchMode, exitSearchMode, enterSearchMode, canDialog])

  if (!canDialog) return null

  // synchronously fetch results when query changes
  const results = searchEngine.searchSync(query)

  return (
    <dialog
      className="modal-styles container h-[90vh] w-[60em] border-8 border-black border-opacity-20 bg-white bg-opacity-95 p-7"
      ref={dialogRef}
    >
      <div className="lg:text-xl">
        <div className="mb-4 flex align-top">
          <h2 className="h-8 flex-1 text-base font-bold lg:text-2xl">
            Search results{query.length > 1 ? ` for "${query}"` : ""}
          </h2>
          <button
            className="block aspect-square w-8 text-lg lg:text-2xl"
            onClick={exitSearchMode}
          >
            ✕
          </button>
        </div>

        <input
          className="my-2 w-full border-2 border-neutral-200 px-2 py-1 text-lg lg:px-3 lg:py-2 lg:text-xl"
          ref={inputRef}
          type="text"
          placeholder="Search by keyword, e.g. title, tag, client, year"
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
  const { exitSearchMode } = useSearch()
  if (!tags.length) return null

  return (
    <div className="pt-1 first-of-type:pt-0 lg:pt-2">
      <h3 className="mt-2 font-bold lg:mt-4">Tags</h3>
      <ul className="leading-7 lg:leading-9">
        {tags.map((tag) => {
          return (
            <li className="mr-2 inline-block" key={tag.id}>
              <Link href={`/tags/${tag.name}`}>
                <a
                  className="text-neutral-500 underline underline-offset-4"
                  onClick={exitSearchMode}
                >
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
  const { exitSearchMode } = useSearch()
  if (!clients.length) return null

  return (
    <div className="pt-1 first-of-type:pt-0 lg:pt-2">
      <h3 className="mt-2 font-bold lg:mt-4">Clients</h3>
      <ul className="leading-7 lg:leading-9">
        {clients.map((client) => {
          const slug = getSlugFromClient(client as unknown as Client)
          return (
            <li className="mr-2 inline-block" key={client.id}>
              <Link href={`/clients/${slug}`}>
                <a
                  className="text-neutral-500 underline underline-offset-4"
                  onClick={exitSearchMode}
                >
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
    <div className="pt-1 first-of-type:pt-0 lg:pt-2">
      <h3 className="my-2 font-bold lg:my-4">Projects</h3>
      <ul>
        {projects.map((project: ProjectDocument) => {
          const slug = getSlugFromProject(project as unknown as Project)
          return (
            <li className="mr-2 inline" key={project.id}>
              <Link href={`/projects/${slug}`}>
                <a
                  className="text-sm text-neutral-500 lg:text-xl"
                  onClick={exitSearchMode}
                >
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
