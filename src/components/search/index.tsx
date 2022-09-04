import React, {
  ReactNode,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react"

export const SearchModal: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { inSearchMode, enterSearchMode, exitSearchMode } = useSearch()

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

  return (
    <dialog ref={dialogRef}>
      <p>I am a search modal</p>
      <input type="text" placeholder="Enter search terms" autoFocus />
    </dialog>
  )
}

/* context */

type SearchContextType = {
  inSearchMode: boolean
  enterSearchMode: () => void
  exitSearchMode: () => void
  toggleSearchMode: () => void
}

const SearchContext = React.createContext<SearchContextType>({
  inSearchMode: false,
  enterSearchMode: () => console.log("unimplemented"),
  exitSearchMode: () => console.log("unimplemented"),
  toggleSearchMode: () => console.log("unimplemented"),
})

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inSearchMode, setSearchMode] = useState<boolean>(false)
  const enterSearchMode = () => setSearchMode(true)
  const exitSearchMode = () => setSearchMode(false)
  const toggleSearchMode = () => setSearchMode(!inSearchMode)

  return (
    <SearchContext.Provider
      value={{
        inSearchMode,
        enterSearchMode,
        exitSearchMode,
        toggleSearchMode,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
