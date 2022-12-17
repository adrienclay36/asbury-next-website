import React from 'react'
import Layout from '../../components/layout/layout';
import AsburyCafeSection from '../../components/asbury-cafe/asbury-cafe-section';
import CafeDiv from '../../components/asbury-cafe/cafe-fixed-image/cafe-div';
const AsburyCafeHome = () => {
  return (
    <Layout
      title="Asbury Cafe"
      description="The Asbury Cafe is a mission of Asbury UMC and several other local churches. We operate only during the NM State Fair in September.  All proceeds go to local charities that feed people."
    >
      <AsburyCafeSection/>
      <CafeDiv/>
      
    </Layout>
  );
}

export default AsburyCafeHome