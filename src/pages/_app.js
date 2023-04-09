import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      <link href='https://fonts.googleapis.com/css?family=Alkalami' rel='stylesheet'></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
