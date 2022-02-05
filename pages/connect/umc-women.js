import React from 'react';
import Layout from '../../components/layout/layout';
import WomenSection from '../../components/connect/umc-women/women-section';
import WomenDiv from '../../components/connect/umc-women/women-fixed-image/women-div';
const UMCWomenHome = () => {
  return (
    <Layout
      title="United Methodist Women"
      description="Asbury´s UMW unit meets monthly, alternating between the first Thursday at 9:00 AM and the first Sunday at 12:30 PM. A light luncheon is provided at Sunday meetings. Meetings include social time and programs on various topics."
    >
        <WomenSection/>
        <WomenDiv/>
    </Layout>
  );
};

export default UMCWomenHome;
