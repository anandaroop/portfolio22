import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"

type SearchContextType = {
  // search mode
  inSearchMode: boolean
  enterSearchMode: () => void
  exitSearchMode: () => void
  toggleSearchMode: () => void

  // search results
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const SearchContext = React.createContext<SearchContextType>({
  inSearchMode: false,
  enterSearchMode: () => console.log("unimplemented"),
  exitSearchMode: () => console.log("unimplemented"),
  toggleSearchMode: () => console.log("unimplemented"),
  query: "",
  setQuery: () => console.log("unimplemented"),
})

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inSearchMode, setSearchMode] = useState<boolean>(false)
  const enterSearchMode = () => setSearchMode(true)
  const exitSearchMode = () => setSearchMode(false)
  const toggleSearchMode = () => setSearchMode(!inSearchMode)

  const [query, setQuery] = useState<string>("")

  useEffect(() => {
    // Most inert-ness seems to be handled natively by <dialog> element
    // when invoked with dialog.showModal() —— but not scroll lock :(
    const html = document.querySelector("html")
    if (!html) return

    if (inSearchMode) {
      html.style.overflow = "hidden"
    } else {
      html.style.overflow = ""
    }
  }, [inSearchMode])

  return (
    <SearchContext.Provider
      value={{
        inSearchMode,
        enterSearchMode,
        exitSearchMode,
        toggleSearchMode,
        query,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
