import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      <link href='https://fonts.googleapis.com/css?family=Alkalami' rel='stylesheet'></link>
      <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet"></link>
      </Head >
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
