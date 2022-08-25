import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Portfolio 22</title>
        <meta
          name="description"
          content="Portfolio site of Anandaroop Roy, freelance cartographer and information designer in New York City"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>Anandaroop Roy</header>
      <main>
        <div>
          <h1 className="text-2xl my-4">Portfolio 22</h1>
        </div>
      </main>
      <footer>Copyright 2000–{new Date().getFullYear()}</footer>
    </div>
  )
}

export default Home
