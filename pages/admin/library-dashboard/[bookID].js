import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import LibraryProvider from '../../../store/library-store';
import { useRouter } from 'next/router';
import BookEditForm from '../../../components/admin/library-dash/book-edit-form/book-edit-form';
import PageLoading from '../../../components/PageLoading/PageLoading';
import { getPermissions, getItemById } from '../../../supabase-util';
const table = "books";
const EditBook = () => {
    const router = useRouter();
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
