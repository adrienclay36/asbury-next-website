import React from 'react'
import DonationComplete from '../../components/giving/donation-complete'
import Layout from '../../components/layout/layout'
const DonationCompletePage = () => {
  return (
    <Layout title="Donation Complete" description="Thank you for your donation. Asbury UMC thrives on donations from members like yourself. We hope to see you soon!">
        <DonationComplete/>
    </Layout>
  )
}

export default DonationCompletePage