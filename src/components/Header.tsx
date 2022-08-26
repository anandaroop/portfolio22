import Link from "next/link"

export const Header = () => (
  <Link href={`/`}>
    <a>
      <header className="pt-4">
        <h1 className="px-5 text-2xl">
          Anandaroop Roy
          <span className="ml-2 text-neutral-500 dark:text-neutral-400">
            cartography
          </span>
          <span className="ml-2 text-neutral-400 dark:text-[rgb(128,128,128)]">
            & information design
          </span>
        </h1>
      </header>
    </a>
  </Link>
)
