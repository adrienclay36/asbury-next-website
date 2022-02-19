import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import LibraryProvider, { LibraryContext } from '../../../components/admin/library-dash/library-admin-store';
import { useRouter } from 'next/router';
import BookEditForm from '../../../components/admin/library-dash/book-edit-form/book-edit-form';
import PageLoading from '../../../components/PageLoading/PageLoading';
import { supabase } from '../../../supabase-client';
import { getPermissions, getItemById } from '../../../supabase-util';
const table = "books";
const EditBook = (props) => {
    const router = useRouter();
    const libraryContext = useContext(LibraryContext)
    const bookID = router.query.bookID;
    const [book, setBook] = useState();

    
    
    const getBook = async () => {
        const book = await getItemById(table, bookID);
        setBook(book[0]);
    }

    useEffect(() => {
        if(bookID){
            getBook();
        }
    },[bookID])

    
  return (
    <LibraryProvider>
        <AdminLayout>
            {!book && <PageLoading/>}
            {book && <BookEditForm book={book}/>}
        </AdminLayout>
    </LibraryProvider>
  )
}

export default EditBook;

export const getServerSideProps = async ({ req, res }) => {
  return getPermissions(req, ['library', 'master']);
};
