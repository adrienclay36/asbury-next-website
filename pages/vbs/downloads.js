import React from 'react'
import VBSDownloadsSection from '../../components/vbs/downloads-section'
import Layout from '../../components/layout/layout';
import { supabase } from '../../supabase-client';
const VBSDownloads = ({ data2021, data2022 }) => {
  return (
    <Layout title="VBS Downloads" description="Find VBS Related Materials and get involved today!">
        <VBSDownloadsSection data1={data2021} data2={data2022}/>
    </Layout>
  )
}

export default VBSDownloads

// export const getStaticProps = async (context) => {
//     const { data: data2021 , error: error2021 } = await supabase.storage
//       .from("vbs-files")
//       .list("2021", {
//         limit: 20,
//         offset: 0,
//         sortBy: { column: "name"},
//       });
//     const { data: data2022, error: error2022 } = await supabase.storage
//     .from("vbs-files")
//     .list("2022", {
//         limit: 20,
//         offset: 0,
//         sortBy: { column: 'name'}
//     });
    
    


//     return {
//         props: {
//             data2021,
//             data2022,
//         }
//     }
// }

// DISABLE VBS UNTIL NEXT YEAR
export const getServerSideProps = (context) => {
  return {
    props: {},
    redirect: { destination: "/" }
  }
}
