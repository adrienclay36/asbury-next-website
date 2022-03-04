import React, { useContext } from 'react'
import { UserContext } from '../../../store/user-context'
import SectionHeading from '../../ui/section-heading';
import NewSubscriptionSection from './new-subscription-section';
const ManageDonationsSection = () => {
    const userContext = useContext(UserContext);
  return (
      <SectionHeading title="Manage Donations">
          <NewSubscriptionSection/>
      </SectionHeading>
  )
}

export default ManageDonationsSection