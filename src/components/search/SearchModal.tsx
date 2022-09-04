import type { Client, Project, Tag } from "~/types"

import React, {
  useEffect,
  useRef,
  // useState
} from "react"
import Link from "next/link"

import { useSearch } from "./SearchContext"
import {
  // JankyResults,
  JankySearch,
} from "./JankySearch"
import { getSlugFromProject } from "~/lib/slugs"

const jankySearch = JankySearch.create()

export const SearchModal: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const { inSearchMode, enterSearchMode, exitSearchMode, query, setQuery } =
    useSearch()

  // const [results, setResults] = useState<JankyResults>({
  //   clients: [],
  //   projects: [],
  //   tags: [],
  // })

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

  // asynchronously fetch results when query changes
  // useEffect(() => {
  //   const fetchResults = async () => {
  //     const newResults = await jankySearch.search(query)
  //     setResults(newResults)
  //   }
  //   fetchResults()
  // }, [query])

  // synchronously fetch results when query changes
  const results = jankySearch.searchSync(query)

  return (
    <dialog
      className="modal-styles container h-[90vh] w-[60em] border-8 border-black border-opacity-20 bg-white bg-opacity-95 p-7"
      ref={dialogRef}
    >
      <div className="text-xl leading-8">
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

        <MatchingProjects projects={results.projects} />
        <MatchingTags tags={results.tags} />
        <MatchingClients clients={results.clients} />
      </div>
    </dialog>
  )
}

const MatchingTags: React.FC<{ tags: Partial<Tag>[] }> = ({ tags }) => {
  if (!tags.length) return null

  return (
    <div className="mt-5">
      <h3 className="font-bold">Tags</h3>
      <ul>
        {tags.map((tag) => {
          return (
            <li className="mr-2 inline-block " key={tag.id}>
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

const MatchingClients: React.FC<{ clients: Partial<Client>[] }> = ({
  clients,
}) => {
  if (!clients.length) return null

  return (
    <div className="mt-5">
      <div className="font-bold">Clients</div>
      <ul>
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

const MatchingProjects: React.FC<{ projects: Partial<Project>[] }> = ({
  projects,
}) => {
  const { query, exitSearchMode } = useSearch()
  if (!query.length) return null

  return (
    <div className="mt-4">
      <div className="font-bold">Projects</div>
      <ul>
        {projects.map((project) => {
          const slug = getSlugFromProject(project as unknown as Project)
          return (
            <li className="mr-2 inline" key={project.id}>
              <Link href={`/projects/${slug}`}>
                <a
                  className="text-neutral-500 underline underline-offset-4"
                  onClick={exitSearchMode}
                >
                  {project.title}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
