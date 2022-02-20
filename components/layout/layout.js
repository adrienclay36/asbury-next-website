import React from 'react';
import Head from 'next/head';
import Footer from '../footer/footer';

import NavHeroCondensed from '../navbar-condensed/navhero-condensed';
const Layout = (props) => {
  return (
    <>
    <Head>
      <meta name="description" content={props.description}/>
      <title>{props.title}</title>
    </Head>
      <div className="font-primaryFont">
          <NavHeroCondensed/>
          {props.children}
          <Footer/>
      </div>
    </>
  );
};

export default Layout;
