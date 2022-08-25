import "../styles/globals.css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-gray-200">
        <div className="container mx-auto bg-gray-100">
          <header>Anandaroop Roy</header>
          <main>
            <Component {...pageProps} />
          </main>
          <footer>Copyright 2000–{new Date().getFullYear()}</footer>
        </div>
      </div>
    </>
  )
}

export default MyApp
