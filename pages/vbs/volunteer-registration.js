import React from 'react'
import SectionHeading from '../../components/ui/section-heading'
import Layout from '../../components/layout/layout'
import VolunteerRegistrationForm from '../../components/vbs/volunteer-registration-form'
const VolunteerRegistration = () => {
  return (
    <Layout title="Volunteer Registration">
        <SectionHeading title="Volunteer Registration">
            <VolunteerRegistrationForm/>
        </SectionHeading>
    </Layout>
  )
}

export default VolunteerRegistration;

