import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Header } from "~/components/Header"
import { Footer } from "~/components/Footer"

const DEBUG_BREAKPOINTS = false

const breakpoint_outline_styles =
  "outline outline-4 outline-red-500 sm:outline-orange-500 md:outline-yellow-500 lg:outline-green-500 xl:outline-blue-600 2xl:outline-violet-500"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="min-h-screen bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-300">
        <div
          className={`container mx-auto min-h-screen bg-neutral-100 dark:bg-neutral-700 ${
            DEBUG_BREAKPOINTS && breakpoint_outline_styles
          }`}
        >
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default MyApp
