import React, { useContext, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import BookList from './book-list';
import { useRouter } from 'next/router';
import { UserContext } from '../../../store/user-context';
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
const LibraryOperations = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const [routing, setRouting] = useState(false);

  const newBookNavigate = () => {
    setRouting(true);
    router.push("/admin/library-dashboard/new-book")
    
  }

  const buttonText = (
    <>
    <AiOutlinePlus size={25} className="mr-4" />
    <span className="mr-4 tracking-normal lg:tracking-wide md:tracking-wide">Add Book</span>
    </>
  )
  return (
    <div className="container my-12">
      {userContext.libraryPermissions && <div className="flex justify-center items-center w-full lg:w-1/6 md:w-1/6 mx-auto">
        <button
          onClick={newBookNavigate}
          className="flex flex-1 justify-center items-center px-7 py-2 bg-emerald-600 text-white font-semibold uppercase rounded-lg"
        >
          {routing ? <DualRingLoader/> : buttonText}
        </button>
      </div>}
      <BookList/>
    </div>
  );
};

export default LibraryOperations;
