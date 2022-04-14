import React from "react";
import Layout from "../../components/layout/layout";
import LibrarySection from "../../components/library/library-section";
import LibraryProvider from "../../store/library-store";
const LibraryHome = (props) => {
  return (
    <LibraryProvider>
      <Layout
        title="Library"
        description="Asbury’s library supports the congregation of Asbury United Methodist Church as we worship God and serve others. The library provides a well rounded collection of books and other media to help individuals of all ages grow in the understanding of their faith and their full potential as children of God."
      >
        <LibrarySection />
      </Layout>
    </LibraryProvider>
  );
};

export default LibraryHome;
