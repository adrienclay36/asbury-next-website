import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import LibraryProvider, { LibraryContext } from '../../../components/admin/library-dash/library-admin-store';
import { useRouter } from 'next/router';
import BookEditForm from '../../../components/admin/library-dash/book-edit-form/book-edit-form';
import PageLoading from '../../../components/PageLoading/PageLoading';
import { useSupaBaseAuth } from '../../../hooks/useSupaBaseAuth';
import axios from 'axios';
const EditBook = () => {
    const router = useRouter();
    const libraryContext = useContext(LibraryContext)
    const bookID = router.query.bookID;
    const [book, setBook] = useState();
    const user = useSupaBaseAuth();
    
    
    const getBook = async () => {
        const response = await axios.get(`/api/library/${bookID}`)
        setBook(response.data.book);
    }

    useEffect(() => {
        if(bookID){
            getBook();

        }
    },[bookID])

    

    if(!user) {
        return null;
    }
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