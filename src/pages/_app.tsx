import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Header } from "~/components/Header"
import { Footer } from "~/components/Footer"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-gray-200">
        <div className="container mx-auto bg-gray-100">
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
