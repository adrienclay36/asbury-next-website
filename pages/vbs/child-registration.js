import React from 'react'
import Layout from '../../components/layout/layout'
import SectionHeading from '../../components/ui/section-heading'
import ChildRegistrationForm from '../../components/vbs/child-registration-form'
const ChildRegistrationPage = () => {
  return (
    <Layout title="Child Registration">
        <SectionHeading title="Child Registration">
            <ChildRegistrationForm/>
        </SectionHeading>
    </Layout>
  )
}

export default ChildRegistrationPage