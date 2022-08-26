import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Header } from "~/components/Header"
import { Footer } from "~/components/Footer"

const DEBUG_BREAKPOINTS = true
const breakpoint_outline_styles =
  "outline outline-4 outline-red-500 sm:outline-orange-500 md:outline-yellow-500 lg:outline-green-500 xl:outline-blue-600"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-300 min-h-screen">
        <div
          className={`container mx-auto bg-neutral-100 dark:bg-neutral-600 min-h-screen ${
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
