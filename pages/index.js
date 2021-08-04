import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import MainPage from "../components/MainPage";

export default function Page() {
  const [session, loading] = useSession();
  return (
    <div className="container">
      <Head>
        <title>Showcase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && <h1>Loading...</h1>}
      {!session && (
        <>
          <h1>Not signed in</h1>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <MainPage />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
