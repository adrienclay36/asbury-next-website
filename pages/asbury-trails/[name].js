import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../components/layout/layout';
import SectionHeading from '../../components/ui/section-heading';
import { supabase } from '../../supabase-client';
import { Document, Page } from 'react-pdf';
import PageLoading from '../../components/PageLoading/PageLoading';
const OpenFile = () => {
    const [pdfFile, setPDFFile] = useState(null);
    const router = useRouter();
    const { name } = router.query;
  

    const getFile = async (inputName) => {
      const { data, error } = await supabase.storage.from('trails').download(inputName);
      if(error) {
        console.log("Error getting file:: ", error);
        return;
      }
      const pdf = data.stream();
      setPDFFile(pdf);
      console.log(data);
    }

    useEffect(() => {
        if(name) {
            getFile(name);
        }
    }, [name])


  return (
    <Layout title="Asbury Trails">
      <SectionHeading title="Asbury Trails">
        {!pdfFile && <PageLoading />}
        {pdfFile && (
         <Document file={pdfFile}>
           <Page pageNumber={1}/>
         </Document>
        )}
      </SectionHeading>
    </Layout>
  )
}

export default OpenFile