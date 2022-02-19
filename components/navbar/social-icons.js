import React, { useContext } from 'react';
import { BsFacebook} from 'react-icons/bs';
import { MdOndemandVideo } from "react-icons/md";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { useRouter } from 'next/router';
import { ImBubble } from 'react-icons/im';
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from '../../store/user-context';
import styles from './social-icons.module.css';
const SocialIcons = ({ textColor, textHover }) => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  return (
    <div className=" container flex justify-end mt-4">
      {userContext.role === 'admin' && <FaRegUserCircle
        size={30}
        onClick={() => router.push("/admin/admin-dashboard")}
        className={`${styles.fade} ${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
      />}

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

      <ImBubble
        onClick={() => router.push("/joys-and-concerns")}
        size={30}
        className={`${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
      />

      <MdOndemandVideo
        onClick={() => router.push("/livestream")}
        size={30}
        className={`${textColor} mt-0.5 mr-4 hover:${textHover} cursor-pointer`}
      />

      <BsFillEnvelopeFill
        onClick={() => router.push("/contact")}
        size={30}
        className={`${textColor} mt-0.5 hover:${textHover} cursor-pointer`}
      />
    </div>
  );
};

export default SocialIcons;
