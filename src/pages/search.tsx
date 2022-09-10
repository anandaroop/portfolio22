import type { NextPage } from "next"
import type { ProjectDocument } from "~/components/search/engine"

import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

import { searchEngine } from "~/components/search/engine"
import { useSearch } from "~/components/search/SearchContext"
import {
  MatchingTags,
  MatchingClients,
  MatchingProjects,
} from "~/components/search/SearchModal"

const Page: NextPage = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const { query, setQuery } = useSearch()

  useEffect(() => {
    const q = router?.query?.q
    if (q) setQuery(q as string)
  }, [router?.query?.q, setQuery])

  // synchronously fetch results when query changes
  const results = searchEngine.searchSync(query)

  return (
    <div className="p-6 lg:text-xl">
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
  )
}

export default Page
