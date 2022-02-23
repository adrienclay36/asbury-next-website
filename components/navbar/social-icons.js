import React, { useContext } from "react";
import { BsFacebook, BsFillEnvelopeFill } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import { useRouter } from "next/router";
import { ImBubble } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../store/user-context";
import { Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import styles from "./social-icons.module.css";
const SocialIcons = ({ textColor, textHover }) => {
  const disableTooltip = useMediaQuery("(max-width: 900px)");
  const userContext = useContext(UserContext);
  const router = useRouter();
  return (
    <div className="container flex flex-wrap justify-center lg:justify-end md:justify-end items-center mt-4 h-16">
      {userContext.role === "admin" && (
        <Tooltip
          disabled={disableTooltip}
          label="Admin Dashboard"
          position="bottom"
          placement="start"
          withArrow
        >
          {userContext.avatarURL ? (
            <div className="mr-4 mt-2">
              <Image
                height={30}
                width={30}
                alt={userContext.firstName}
                priority
                onClick={() => router.push("/admin/admin-dashboard")}
                className={`${styles.fade} cursor-pointer object-cover rounded-full`}
                src={userContext.avatarURL}
                title={userContext.firstName}
              />
            </div>
          ) : (
            <FaRegUserCircle
              size={30}
              onClick={() => router.push("/admin/admin-dashboard")}
              className={`${styles.fade} ${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
            />
          )}
        </Tooltip>
      )}

      {userContext.role === "admin" && (
        <Tooltip
          label="Sign Out"
          position="bottom"
          placement="start"
          withArrow
          disabled={disableTooltip}
        >
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
        disabled={disableTooltip}
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

      <Tooltip
        label="Joys & Concerns"
        position="bottom"
        placement="start"
        withArrow
        disabled={disableTooltip}
      >
        <ImBubble
          onClick={() => router.push("/joys-and-concerns")}
          size={30}
          className={`${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
        />
      </Tooltip>

      <Tooltip
        label="Live Stream"
        position="bottom"
        placement="start"
        withArrow
        disabled={disableTooltip}
      >
        <MdOndemandVideo
          onClick={() => router.push("/livestream")}
          size={30}
          className={`${textColor} mt-0.5 mr-4 hover:${textHover} cursor-pointer`}
        />
      </Tooltip>

      <Tooltip
        label="Contact Us"
        position="bottom"
        placement="start"
        withArrow
        disabled={disableTooltip}
      >
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
