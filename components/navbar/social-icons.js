import React from 'react';
import { BsFacebook} from 'react-icons/bs';
import { MdOndemandVideo } from "react-icons/md";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
const SocialIcons = ({ textColor, textHover }) => {
  const router = useRouter();
  return (
    <div className=" container flex justify-end mt-4">
      <BsFacebook
        size={30}
        className={`${textColor} mt-0.5 mr-4 hover:${textHover} cursor-pointer`}
      />
      <AiFillTwitterCircle
        size={35}
        className={`${textColor} mr-4 hover:${textHover} cursor-pointer`}
      />
      <MdOndemandVideo
      onClick={() => router.push("/livestream")}
        size={30}
        className={`${textColor} mt-0.5 mr-4 hover:${textHover} cursor-pointer`}
      />
    </div>
  );
};

export default SocialIcons;
