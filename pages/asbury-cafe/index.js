import React from 'react'
import Layout from '../../components/layout/layout';
import AsburyCafeSection from '../../components/asbury-cafe/asbury-cafe-section';
const AsburyCafeHome = () => {
  return (
    <Layout
      title="Asbury Cafe"
      description="The Asbury Cafe is a mission of Asbury UMC and several other local churches. We operate only during the NM State Fair in September.  All proceeds go to local charities that feed people."
    >
      <AsburyCafeSection/>
    </Layout>
  );
}

export default AsburyCafeHome