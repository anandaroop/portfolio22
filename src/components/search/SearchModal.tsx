import React, { useEffect, useRef } from "react"
import { useSearch } from "./SearchContext"

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
