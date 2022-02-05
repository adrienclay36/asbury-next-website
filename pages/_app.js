import '../styles/globals.css'
import { useEffect } from 'react';
import { polyfill } from 'smoothscroll-polyfill';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    polyfill();
  }, [])

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Welcome to Asbury UMC, where all are welcome to share in the joy of our lord. Find a service and get involved today!"
        />
        <title>Asbury UMC</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <NextNProgress height={4} color={"#fff"}/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
