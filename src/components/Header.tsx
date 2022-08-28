import Link from "next/link"

export const Header = () => (
  <Link href={`/`}>
    <a className="flex-initial">
      <header className="border-b-2 border-b-neutral-200 px-6 py-5 opacity-70 hover:opacity-100 dark:border-b-neutral-700 lg:mb-2 lg:pb-8">
        <h1 className="flex flex-col text-xl dark:text-white lg:block lg:text-3xl">
          <span>Anandaroop Roy</span>
          <span className="text-lg lg:ml-4 lg:text-3xl">
            <span className="text-neutral-500 dark:text-[rgb(180,180,180)]">
              cartography&nbsp;
            </span>
            <span className="text-neutral-400 dark:text-[rgb(150,150,150)]">
              & information design
            </span>
          </span>
        </h1>
      </header>
    </a>
  </Link>
)
