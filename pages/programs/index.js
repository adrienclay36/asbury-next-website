import React, { useEffect, useState } from 'react'
import ProgramSection from '../../components/programs/program-section'
import Layout from '../../components/layout/layout';
import { supabase } from '../../supabase-client';
const ProgramsHome = (props) => {
    const [files, setFiles] = useState([]);

    const getFiles = async () => {
        const { data, error } = await supabase.storage
          .from("programs")
          .list("programs", {
            limit: 100,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" },
          });
          setFiles(data);
    }
    useEffect(() => {
        getFiles();
    },[])
  return (
    <Layout title="Programs" description="Find today's program by scanning the QR code found at our entrance table!">
        <ProgramSection files={files} />
    </Layout>
  )
}

export default ProgramsHome

// export const getStaticProps = async (context ) => {
//     const { data, error } = await supabase.storage
//       .from("programs")
//       .list("programs", {
//         limit: 100,
//         offset: 0,
//         sortBy: { column: "created_at", order: "desc" },
//       });

//     return {
//         props: {
//             data,
//         },
//         revalidate: 60,
//     }
// }