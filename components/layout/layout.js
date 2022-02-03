import React from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
const Layout = (props) => {
  return (
      <div className="font-primaryFont">
          <Navbar/>
          {props.children}
          <Footer/>
      </div>
  );
};

export default Layout;
