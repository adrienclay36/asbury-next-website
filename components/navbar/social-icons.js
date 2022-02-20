import React, { useContext } from "react";
import { BsFacebook, BsFillEnvelopeFill } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import { useRouter } from "next/router";
import { ImBubble } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../store/user-context";
import { Tooltip } from "@mantine/core";
import styles from "./social-icons.module.css";
const SocialIcons = ({ textColor, textHover }) => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  return (
    <div className=" container flex justify-end mt-4">
      {userContext.role === "admin" && (
        <Tooltip
          label="User Profile"
          position="bottom"
          placement="start"
          withArrow
        >
          <FaRegUserCircle
            size={30}
            onClick={() => router.push("/admin/admin-dashboard")}
            className={`${styles.fade} ${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
          />
        </Tooltip>
      )}

      {userContext.role === "admin" && (
        <Tooltip label="Sign Out" position="bottom" placement="start" withArrow>
          <AiOutlineLogout
            size={29}
            onClick={() => userContext.logOutHandler()}
            className={`${styles.fade} ${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
          />
        </Tooltip>
      )}
      <Tooltip
        label="Visit Facebook"
        position="bottom"
        placement="start"
        withArrow
      >
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
      </Tooltip>

      <Tooltip label="Joys & Concerns" position="bottom" placement="start" withArrow>
        <ImBubble
          onClick={() => router.push("/joys-and-concerns")}
          size={30}
          className={`${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
        />
      </Tooltip>

      <Tooltip label="Live Stream" position="bottom" placement="start" withArrow>

      <MdOndemandVideo
        onClick={() => router.push("/livestream")}
        size={30}
        className={`${textColor} mt-0.5 mr-4 hover:${textHover} cursor-pointer`}
        />
        </Tooltip>

        <Tooltip label="Contact Us" position="bottom" placement="start" withArrow>

      <BsFillEnvelopeFill
        onClick={() => router.push("/contact")}
        size={30}
        className={`${textColor} mt-0.5 hover:${textHover} cursor-pointer`}
        />
        </Tooltip>
    </div>
  );
};

export default SocialIcons;
