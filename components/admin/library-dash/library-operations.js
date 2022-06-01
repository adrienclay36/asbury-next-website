import React, { useContext, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import BookList from './book-list';
import { useRouter } from 'next/router';
import { UserContext } from '../../../store/user-context';
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
import AsburyButton from '../../ui/AsburyButton';
import { Plus } from 'tabler-icons-react';
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
    <div className="my-12">
      {userContext.libraryPermissions && <div className="flex justify-center items-center w-full lg:w-1/6 md:w-1/6 mx-auto">
        <AsburyButton onClick={() => newBookNavigate()} loading={routing} text="Add Book" leftIcon={<Plus color="white" size={20}/>} />
      </div>}
      <BookList/>
    </div>
  );
};

export default LibraryOperations;
