import Link from "next/link"

export const Header = () => (
  <Link href={`/`}>
    <a className="flex-initial">
      <header className="border-b-2 border-b-neutral-200 px-6 pt-5 pb-4 opacity-70 hover:opacity-100 dark:border-b-neutral-700">
        <h1 className="inline-block text-2xl dark:text-white">
          Anandaroop Roy
          <span className="ml-2 text-neutral-500 dark:text-[rgb(180,180,180)]">
            cartography
          </span>
          <span className="ml-2 text-neutral-400 dark:text-[rgb(150,150,150)]">
            & information design
          </span>
        </h1>
      </header>
    </a>
  </Link>
)
