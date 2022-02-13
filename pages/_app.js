import '../styles/globals.css'

import { useEffect, useState } from 'react';
import { polyfill } from 'smoothscroll-polyfill';
import { useRouter } from 'next/router';
import { supabase } from '../supabase-client';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
function MyApp({ Component, pageProps }) {

  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  const [accessToken, setAccessToken] = useState(null);

  const router = useRouter();

  const handleAuthChange = async (event, session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  const checkUser = async () => {
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState("authenticated");
    }
  };

  useEffect(() => {
    
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          return;
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
          return;
        }
        if(event === "PASSWORD_RECOVERY") {
          const hash = window.location.hash.substring(1);
          const query = new URLSearchParams(hash);
          const token = query.get("access_token");
          setAuthenticatedState('authenticated');
          router.push(`/admin/password-recovery?token=${token}`);
          return;
        }
        if(event === "USER_DELETED") {
          setAuthenticatedState('not-autenticated');
          router.push("/admin");
        }
      }
    );

    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  
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
      <NextNProgress height={4} color={"#899e9c"} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
