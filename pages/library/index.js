import React from "react";
import Layout from "../../components/layout/layout";
import LibrarySection from "../../components/library/library-section";
import LibraryProvider from "../../store/library-store";
import { supabase } from "../../supabase-client";
const XLSX = require('xlsx');
import { getDateInfo } from "../../utils/dates";
const LibraryHome = ({ books, lastUpdated }) => {
  return (
    <LibraryProvider>
      <Layout
        title="Library"
        description="Asbury’s library supports the congregation of Asbury United Methodist Church as we worship God and serve others. The library provides a well rounded collection of books and other media to help individuals of all ages grow in the understanding of their faith and their full potential as children of God."
      >
        <LibrarySection books={books} lastUpdated={lastUpdated} />
      </Layout>
    </LibraryProvider>
  );
};

export default LibraryHome;


export const getStaticProps = async () => {
  const { data: lastModified, error: lastModifiedError } =
      await supabase.storage.from("library").list();
    if (lastModifiedError) {
      console.log(
        "Error getting created_at from file:: ",
        lastModifiedError.message
      );
    }
    console.log(lastModified);
    const { monthText, day } = getDateInfo(lastModified[0]?.created_at, true);
    const year = new Date().getFullYear();
    const dateString = `${monthText} ${day}, ${year}`;


    const { data, error } = await supabase.storage
      .from("library")
      .download("Web Search.xls");
    if (error) {
      console.log("Error fetching books:: ", error.message);
      return;
    }
    const workbook = XLSX.read(await data.arrayBuffer(), { type: "array" });
    const jsonBooks = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    );

  return {
    props: {
      books: jsonBooks,
      lastUpdated: dateString,
    },
    revalidate: 3600,
    
  }

}
