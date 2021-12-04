import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Swiftpass</title>
        <meta name="description" content="Smart password generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="index">
        <div className="container">
          <h1>Smart password generator</h1>
          <h2>Swiftpass is a password generator which can generate not only strong, but also quick-to-enter passwords.</h2>
          <div className="links">
            <Link href="/generate">
              <a className="btn btn-l btn-primary">Generate</a>
            </Link>
            <Link href="/remember">
              <a className="btn btn-l btn-secondary">Remember</a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
