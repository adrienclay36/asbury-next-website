import React, { useEffect, useContext } from "react";
import Head from "next/head";
import Footer from "../footer/footer";

import NavHeroCondensed from "../navbar-condensed/navhero-condensed";

interface Props {
  description: string;
  title: string;
  children: React.ReactNode;
}
const Layout: React.FC<Props> = (props) => {

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
