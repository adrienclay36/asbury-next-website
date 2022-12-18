import React from 'react';
import Layout from '../../components/layout/layout';
import GivingSection from '../../components/giving/giving-section';
import GivingDiv from '../../components/giving/giving-fixed-image/giving-div';
const GivingHome = () => {
  return (
    <Layout
      title="Giving"
      description="Help your local community in a number of ways. Your tithes, offerings and donations enable our church to fulfill its mission to love God and one another in Jesus Christ as we raise up a new generation of Christians.">
          <GivingSection/>
          <GivingDiv/>
      </Layout>
  );
};

export default GivingHome;
