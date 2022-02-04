import React from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import NavHeroCondensed from '../navbar-condensed/navhero-condensed';
const Layout = (props) => {
  return (
      <div className="font-primaryFont">
          <NavHeroCondensed/>
          {props.children}
          <Footer/>
      </div>
  );
};

export default Layout;
