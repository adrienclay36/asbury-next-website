import React, { useEffect, useContext } from "react";
import Head from "next/head";
import Footer from "../footer/footer";
import { UserContext } from "../../store/user-context";
import NavHeroCondensed from "../navbar-condensed/navhero-condensed";
const Layout = (props) => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.checkUser();
  }, [])
  return (
    <>
      <Head>
        <meta name="description" content={props.description} />
        <title>{props.title}</title>
      </Head>
      <div className="font-primaryFont">
        <NavHeroCondensed />
        {props.children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
