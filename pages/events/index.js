import React from 'react';
import Layout from '../../components/layout/layout';
import EventsSection from '../../components/events/events-section';
const EventsHome = () => {
  return (
      <Layout title="Events" description="Check out our events page for more information on when we gather, worship, volunteer, and more!">
          <EventsSection />
      </Layout>
  );
};

export default EventsHome;
