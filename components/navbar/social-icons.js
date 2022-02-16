import React from 'react';
import { BsFacebook} from 'react-icons/bs';
import { MdOndemandVideo } from "react-icons/md";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { ImBubble } from 'react-icons/im';
import Link from 'next/link';
const SocialIcons = ({ textColor, textHover }) => {
  const router = useRouter();
  return (
    <div className=" container flex justify-end mt-4">
      <a
        href="https://www.facebook.com/AsburyABQ"
        rel="noreferrer"
        target="_blank"
      >
        <BsFacebook
          size={30}
          className={`${textColor} mt-0.5 mr-4 hover:${textHover} cursor-pointer`}
        />
      </a>
      <a href="https://asbury-social.netlify.app/" target="_blank" rel="noreferrer">
        <ImBubble
          size={30}
          className={`${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
        />
      </a>
      <MdOndemandVideo
        onClick={() => router.push("/livestream")}
        size={30}
        className={`${textColor} mt-0.5 mr-4 hover:${textHover} cursor-pointer`}
      />
    </div>
  );
};

export default SocialIcons;
