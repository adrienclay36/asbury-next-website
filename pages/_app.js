import "../styles/globals.css";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../store/user-context";
import UserContextProvider from "../store/user-context";
import { polyfill } from "smoothscroll-polyfill";
import { useRouter } from "next/router";
import { supabase } from "../supabase-client";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    polyfill();
  }, []);

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
      <NextNProgress height={4} color={"#899e9c"} />
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  );
}

export default MyApp;
