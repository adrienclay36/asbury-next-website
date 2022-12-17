import React, { useContext, useState, useEffect } from "react";
import { BsFacebook, BsFillEnvelopeFill } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import { useRouter } from "next/router";
import { ImBubble } from "react-icons/im";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { FaRegUserCircle, FaChild } from "react-icons/fa";
import { UserContext } from "../../store/user-context";
import { Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import styles from "./social-icons.module.css";



interface Props {
  textColor?: string;
  textHover?: string;
  showSignIn?: boolean
  showSignUp?: boolean;
  setShowSignIn: (booleanValue: boolean) => void;
  isOpen?: boolean;
  hideButton?: boolean;
}
const SocialIcons: React.FC<Props> = ({
  textColor,
  textHover,
  showSignIn,
  showSignUp,
  setShowSignIn,
  isOpen,
  hideButton = false,
}) => {
  const disableTooltip = useMediaQuery("(max-width: 900px)");
  const mobileWelcomeTooltip = useMediaQuery("(min-width: 900px)");
  const mobileScreen = useMediaQuery("(max-width: 520px)");
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [userWelcome, setUserWelcome] = useState(false);
  const [signUpReminder, setSignUpReminder] = useState(false);

  useEffect(() => {
    if (userContext.firstName && router.pathname === "/") {
      const timeout = setTimeout(() => {
        setUserWelcome(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [userContext.firstName, router.pathname]);

  useEffect(() => {
    if (userWelcome && router.pathname === "/") {
      const userTimeout = setTimeout(() => {
        setUserWelcome(false);
      }, 5000);

      return () => clearTimeout(userTimeout);
    }
  }, [userWelcome, router.pathname]);

  useEffect(() => {
    if (!userContext.user && router.pathname === "/") {
      const reminderTimeout = setTimeout(() => {
        setSignUpReminder(true);
      }, 2000);
      return () => clearTimeout(reminderTimeout);
    }
  }, [userContext.user, router.pathname]);

  useEffect(() => {
    if (signUpReminder) {
      const clearReminder = setTimeout(() => {
        setSignUpReminder(false);
      }, 5000);

      return () => clearTimeout(clearReminder);
    }
  }, [signUpReminder]);

  useEffect(() => {
    if (isOpen) {
      setSignUpReminder(false);
    }
  }, [isOpen]);

  return (
    <>
      <div className="container flex flex-wrap justify-center lg:justify-end md:justify-end items-center mt-4 h-16">
        {/* TODO: DISABLE VBS UNTIL NEXT YEAR */}
        {/* {!mobileScreen && !hideButton && (
          <MainButton margin="mr-8" onClick={() => router.push("/vbs")}>
            VBS Registration
          </MainButton>
        )} */}

        {/* SIGN UP DRAWER */}
        {!userContext.user && (
          <Tooltip
            opened={signUpReminder && !showSignIn && !showSignUp}
            transitionDuration={500}
            label="Sign In/Sign Up!"
            position="bottom-start"
          
            withArrow
            zIndex={1000}
          >
            <Tooltip
              label="Sign In"
              position="bottom-start"
              mt="xs"
              withArrow
              disabled={disableTooltip}
            >
              <div>
                <AiOutlineLogin
                  size={34}
                  onClick={() => setShowSignIn(true)}
                  className={`${textColor} mr-3 mt-1 hover:${textHover} cursor-pointer`}
                />
              </div>
            </Tooltip>
          </Tooltip>
        )}
        {userContext.user && (
          <Tooltip
            opened={userWelcome}
            disabled={mobileWelcomeTooltip}
            label={`Welcome, ${userContext.firstName}`}
            transitionDuration={500}
            position="bottom-start"
            withArrow
          >
            <Tooltip
              disabled={disableTooltip}
              label="Your Profile"
              position="bottom-start"
              withArrow
            >
              {userContext.avatarURL ? (
                <div className="mr-4 mt-2">
                  <Image
                    tabIndex={0}
                    height={30}
                    width={30}
                    priority
                    alt={userContext.firstName}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        router.push(
                          `/profile/${userContext.firstName.toLowerCase()}-${userContext.lastName.toLowerCase()}`
                        );
                      }
                    }}
                    onClick={() =>
                      router.push(
                        `/profile/${userContext.firstName.toLowerCase()}-${userContext.lastName.toLowerCase()}`
                      )
                    }
                    className={`cursor-pointer object-cover rounded-full`}
                    src={userContext.avatarURL}
                    title={userContext.firstName}
                  />
                </div>
              ) : (
                <FaRegUserCircle
                  tabIndex={0}
                  size={30}
                  onKeyDown={(e) => {
                    if (e.code === "Enter") {
                      router.push(
                        `/profile/${userContext.firstName.toLowerCase()}-${userContext.lastName.toLowerCase()}`
                      );
                    }
                  }}
                  onClick={() =>
                    router.push(
                      `/profile/${userContext.firstName.toLowerCase()}-${userContext.lastName.toLowerCase()}`
                    )
                  }
                  className={`${styles.fade} ${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
                />
              )}
            </Tooltip>
          </Tooltip>
        )}

        {userContext.user && (
          <Tooltip mt="xs" withArrow label="Logout" position="bottom-start">
            <div>
              <AiOutlineLogout
                tabIndex={0}
                size={30}
                onClick={() => userContext.logOutHandler()}
                className={`${textColor} mr-4 mt-0.5 hover:${textHover} cursor-pointer`}
              />
            </div>
          </Tooltip>
        )}
        <Tooltip
          label="Visit Facebook"
          position="bottom-start"
          mt="xs"
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
              tabIndex={0}
              className={`${textColor} mt-0.5 mr-4 hover:${textHover} cursor-pointer`}
            />
          </a>
        </Tooltip>

        <Tooltip
          label="Contact Us"
          position="bottom-start"
          
          withArrow
          mt="xs"
          disabled={disableTooltip}
        >
          <div>
            <BsFillEnvelopeFill
              tabIndex={0}
              onClick={() => router.push("/contact")}
              size={30}
              className={`${textColor} mt-0.5 hover:${textHover} cursor-pointer`}
            />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default SocialIcons;
