import React from 'react';
import Layout from '../../components/layout/layout';
import WelcomeSection from '../../components/welcome/welcome-section';
import WelcomeDiv from '../../components/welcome/welcome-fixed-image/welcome-div';
import StaffSection from '../../components/welcome/staff/staff-section';
const WelcomeHome = () => {
  return (
      <Layout title={'Welcome'} description={'Find out what Asbury UMC all about - Who we are, and what we do!'}>
          <WelcomeSection/>
          <StaffSection/>
          <WelcomeDiv/>
      </Layout>
  );
};

export default WelcomeHome;
