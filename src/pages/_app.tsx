import "../styles/globals.css"
import type { AppProps } from "next/app"

import { DEBUG_BREAKPOINTS } from "~/lib/debug"
import { Header } from "~/components/Header"
import { Footer } from "~/components/Footer"
import { SearchModal, SearchProvider, useSearch } from "~/components/search"

const breakpoint_outline_styles =
  "outline outline-8 outline-red-500 sm:outline-orange-500 md:outline-yellow-500 lg:outline-green-500 xl:outline-blue-600 2xl:outline-violet-500"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <SearchDebug />
      <SearchModal />
      {DEBUG_BREAKPOINTS && <Debugger />}
      <div className="min-h-screen bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-300">
        <div
          className={`container mx-auto flex min-h-screen flex-col bg-neutral-100 dark:bg-neutral-600 ${
            DEBUG_BREAKPOINTS && breakpoint_outline_styles
          }`}
        >
          <Header />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </div>
    </SearchProvider>
  )
}

export default MyApp

const Debugger = () => (
  <div className="absolute h-[1em] overflow-hidden bg-white bg-opacity-70 text-5xl font-bold [line-height:100%]">
    <div className="text-red-500 sm:hidden">⦰</div>
    <div className="text-orange-500 md:hidden">sm</div>
    <div className="text-yellow-500 lg:hidden">md</div>
    <div className="text-green-500 xl:hidden">lg</div>
    <div className="text-blue-500 2xl:hidden">xl</div>
    <div className="text-violet-500">2xl</div>
  </div>
)

const SearchDebug = () => <pre>{JSON.stringify(useSearch())}</pre>
