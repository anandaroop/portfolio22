import type { NextPage } from "next/types"

import Link from "next/link"
import Head from "next/head"

const Redirect: NextPage = () => {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`2; url=/`} />
      </Head>

      <div className="p-6">
        <p className="mb-4">This page has moved.</p>

        <p className="mb-4">
          You are being redirected to{" "}
          <Link href={`/`}>
            <a className="underline">anandarooproy.com/</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Redirect
