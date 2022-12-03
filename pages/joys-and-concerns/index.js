import React, { useContext, useEffect } from "react";
import JoysAndConcernsSection from "../../components/joys-and-concerns/joys-and-concerns-section";
import Layout from "../../components/layout/layout";
import FrontPrayerContextProvider from "../../components/joys-and-concerns/board-view/main-board-store";
const JoysAndConcerns = () => {

  return (
    <FrontPrayerContextProvider>
      <Layout title="Joys and Concerns" description="A place for the community to share their weekly joys and concerns. If you forgot to use that familiar blue slip of paper in the back of the pew, you can use this tool to make them public to the community.">
        <JoysAndConcernsSection />
      </Layout>
    </FrontPrayerContextProvider>
  );
};

export default JoysAndConcerns;

export const getServerSideProps = (context) => {
  return {
    props: {},
    redirect: { destination: "/" } 
  }
}