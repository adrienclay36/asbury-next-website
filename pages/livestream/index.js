import React from 'react'
import Layout from '../../components/layout/layout'
import LivestreamSection from '../../components/livestream/livestream-section'
const LivestreamHome = () => {
  return (
    <Layout title="Livestream" description="Join us for our worship sessions on our livestreams every Sunday at 8:00AM and 11:00AM!">
        <LivestreamSection/>
    </Layout>
  )
}

export default LivestreamHome