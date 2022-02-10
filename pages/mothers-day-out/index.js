import React from 'react'
import Layout from '../../components/layout/layout'
import MDOSection from '../../components/mothers-day-out/MDO-section'
import MDODiv from '../../components/mothers-day-out/mdo-fixed-image/mdo-div'
const MothersDayOut = () => {
  return (
    <Layout title={"Mothers Day Out"} description={"Mother’s Day Out and our preschool have been in operation since 1972, offering licensed child care for preschool children. We provide Full time, Part time and Drop in services."}>
        <MDOSection/>
        <MDODiv/>
    </Layout>
  )
}

export default MothersDayOut