import React from 'react'
import Layout from "../../components/layout/layout";
import VBSSection from '../../components/vbs/vbs-section';
const index = () => {
  return (
    <Layout title="VBS Registration">
        <VBSSection/>
    </Layout>
  )
}

export default index


// DISABLE VBS UNTIL NEXT YEAR
export const getServerSideProps = (context) => {
  return {
    props: {},
    redirect: { destination: "/" }
  }
}