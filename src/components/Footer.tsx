import { Email } from "./Email"

export const Footer = () => {
  const thisYear = new Date().getFullYear()
  return (
    <footer className="flex-initial py-8 lg:text-xl">
      <div className="flex flex-col px-5 text-neutral-400 dark:text-neutral-500 md:block">
        <span>Copyright Anandaroop Roy © 2000–{thisYear}</span>
        <span className="mx-4 hidden md:inline">|</span>
        <span>
          Contact: <Email />
        </span>
      </div>
    </footer>
  )
}
