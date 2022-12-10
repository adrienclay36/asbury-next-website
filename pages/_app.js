import "../styles/globals.css";

import { useEffect } from "react";
import UserContextProvider from "../store/user-context";
import { NotificationsProvider } from "@mantine/notifications";
import { polyfill } from "smoothscroll-polyfill";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import {
  useQueryclient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <NextNProgress height={4} color={"#899e9c"} />
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <NotificationsProvider position="bottom-right">
            <Component {...pageProps} />
          </NotificationsProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
