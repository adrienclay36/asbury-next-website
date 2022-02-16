import React from 'react'
import Layout from '../../components/layout/layout'
import PrayerQuiltSection from '../../components/connect/prayer-quilt-ministry/prayer-quilt-section'
import QuiltDiv from '../../components/connect/prayer-quilt-ministry/prayer-quilt-fixed-image/quilt-div'
import QuiltSectionTwo from '../../components/connect/prayer-quilt-ministry/quilt-section-two';
const PrayerQuiltMinistry = () => {
  return (
    <Layout
      title="Prayer Quilt Ministry"
      description="Learn about our Prayer Quilt Ministry, which represents a prayer for each tied knot on the quilt. These quilts go to those in need so the congregation can be with them, reminding them that many prayers are being said on their behalf."
    >
      <PrayerQuiltSection />
      <QuiltDiv/>
      <QuiltSectionTwo/>
    </Layout>
  );
}

export default PrayerQuiltMinistry