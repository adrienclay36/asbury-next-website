import React from "react";
import WorshipSection from "../../components/worship/worship-section";
import Layout from "../../components/layout/layout";
import WorshipDiv from "../../components/worship/worship-fixed-image/worship-div";
import WorshipArts from "../../components/worship/worship-arts/worship-arts";
const WorshipHome = () => {
  return (
    <Layout title={'Worship'} description={'Come worship with us! Find a service today - open to all!'}>
      <WorshipSection />
      <WorshipDiv/>
      <WorshipArts/>
    </Layout>
  );
};

export default WorshipHome;
