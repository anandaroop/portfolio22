import Link from "next/link"
import { useSearch } from "~/components/search/SearchContext"

export const Header = () => {
  const { canDialog, enterSearchMode } = useSearch()

  return (
    <div className="flex-initial">
      <header className="flex content-between border-b-2 border-b-neutral-200 px-6 py-5 opacity-70 hover:opacity-100 dark:border-b-neutral-700">
        <div className="flex-1">
          <Link href={`/`}>
            <a className="inline-block">
              <h1 className="flex flex-col text-xl dark:text-white lg:block lg:text-3xl">
                <span className="">Anandaroop Roy</span>
                <span className="text-lg lg:ml-4 lg:text-3xl">
                  <span className="text-neutral-500 dark:text-[rgb(180,180,180)]">
                    cartography&nbsp;
                  </span>
                  <span className="text-neutral-400 dark:text-[rgb(150,150,150)]">
                    & information design
                  </span>
                </span>
              </h1>
            </a>
          </Link>
        </div>
        <div className="flex-0 ml-2 flex flex-col justify-center">
          {canDialog ? (
            <button
              className="border-2 border-neutral-200 bg-white py-1 px-2 placeholder-neutral-200 dark:border-neutral-700 dark:bg-neutral-500 dark:text-neutral-100 xl:px-4 xl:py-2 "
              onClick={enterSearchMode}
            >
              <span>Search&nbsp;</span>
              <span className="hidden xl:inline">
                by keyword, client or year&nbsp;
              </span>
              <span className="hidden sm:inline">🔎</span>
            </button>
          ) : (
            <Link href="/search">
              <a className="border-2 border-neutral-200 bg-white py-1 px-2 placeholder-neutral-200 dark:border-neutral-700 dark:bg-neutral-500 dark:text-neutral-100 xl:px-4 xl:py-2 ">
                Search 🔎
              </a>
            </Link>
          )}
        </div>
      </header>
    </div>
  )
}
