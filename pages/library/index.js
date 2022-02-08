import React from 'react';
import Layout from '../../components/layout/layout';
import LibrarySection from '../../components/library/library-section';
const LibraryHome = (props) => {

  return (
    <Layout
      title="Library"
      description="Asbury’s library supports the congregation of Asbury United Methodist Church as we worship God and serve others. The library provides a well rounded collection of books and other media to help individuals of all ages grow in the understanding of their faith and their full potential as children of God.">
          <LibrarySection/>
      </Layout>
  );
};

export default LibraryHome;


// export const getStaticProps = async (context) => {
//   const books = await getAllBooks();

//   return {
//     props: {
//       books: books,
//     },
//     revalidate: 1600,
//   }
// }