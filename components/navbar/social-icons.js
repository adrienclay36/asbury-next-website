import React, { useContext, useState, useEffect } from "react";
import { BsFacebook, BsFillEnvelopeFill } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import { useRouter } from "next/router";
import { ImBubble } from "react-icons/im";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../store/user-context";
import { Tooltip, Modal, Drawer } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { supabase } from "../../supabase-client";
import Image from "next/image";
import styles from "./social-icons.module.css";
import SignInForm from "./sign-in-form";
import UIModal from "../ui/modal/UIModal";
import SignUpForm from "./sign-up-form";
const SocialIcons = ({ textColor, textHover }) => {
  const disableTooltip = useMediaQuery("(max-width: 900px)");
  const mobileWelcomeTooltip = useMediaQuery("(min-width: 900px)");
  const userContext = useContext(UserContext);
  const router = useRouter();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [userWelcome, setUserWelcome] = useState(false);
  const [signUpReminder, setSignUpReminder] = useState(false);
  const [welcomed, setWelcomed] = useState(false);

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
    if(!userContext.user && router.pathname === "/") {
      const reminderTimeout = setTimeout(() => {
        setSignUpReminder(true)
      }, 2000);
      return () => clearTimeout(reminderTimeout);
    }
  }, [userContext.user, router.pathname])

  useEffect(() => {
    if(signUpReminder) {
      const clearReminder = setTimeout(() => {
        setSignUpReminder(false);
      }, 5000);

      return () => clearTimeout(clearReminder);
    }
  }, [signUpReminder])

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [success]);

  const signInHandler = async (email, password) => {
    if (email && password) {
      try {
        const { data, error } = await supabase.auth.signIn({ email, password });
        if (error) {
          throw new Error();
        }
        setShowSignIn(false);
        setSuccess(true);
      } catch (error) {
        setError("Invalid Credentials");
      }
    } else {
      setError("Both Fields Required");
    }
  };

  const resetError = () => {
    setError("");
  };

  const toggleSignUp = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="container flex flex-wrap justify-center lg:justify-end md:justify-end items-center mt-4 h-16">
      {/* SIGN UP DRAWER */}

      <Drawer
        size={"60%"}
        opened={showSignUp}
        onClose={() => setShowSignUp(false)}
        title="Sign Up"
        padding="xl"
        position="top"
      >
        <SignUpForm setShowSignUp={setShowSignUp} />
      </Drawer>

      {/* SIGN IN MODALS */}
      <Modal centered opened={showSignIn} onClose={() => setShowSignIn(false)}>
        <SignInForm
          signInHandler={signInHandler}
          error={error}
          resetError={resetError}
          toggleSignUp={toggleSignUp}
        />
      </Modal>
      <UIModal
        centerModal={true}
        error={error}
        type="success"
        message="Successfully signed in!"
        opened={success}
        onClose={() => setSuccess(false)}
      />
      {!userContext.user && (
        <Tooltip opened={signUpReminder && !showSignIn && !showSignUp} transitionDuration={500} label="Sign In/Sign Up!" position="bottom" placement="start" withArrow>
          <Tooltip
            label="Sign In"
            position="bottom"
            placement="start"
            withArrow
            disabled={disableTooltip}
          >
            <AiOutlineLogin
              size={32}
              onClick={() => setShowSignIn(true)}
              className={`${textColor} mr-4 mt-2 hover:${textHover} cursor-pointer`}
            />
          </Tooltip>
        </Tooltip>
      )}
      {userContext.role === "user" && (
        <Tooltip
          opened={userWelcome}
          disabled={mobileWelcomeTooltip}
          label={`Welcome, ${userContext.firstName}`}
          transitionDuration={500}
          placement="start"
          position="bottom"
          withArrow
        >
          <Tooltip
            disabled={disableTooltip}
            label="Your Profile"
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
                  onClick={() =>
                    router.push(
                      `/profile/${
                        userContext.user.id
                      }/${userContext.firstName.toLowerCase()}-${userContext.lastName.toLowerCase()}`
                    )
                  }
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
        </Tooltip>
      )}
      {userContext.role === "admin" && (
        <Tooltip
          opened={userWelcome}
          disabled={mobileWelcomeTooltip}
          label={`Welcome, ${userContext.firstName}`}
          transitionDuration={500}
          placement="start"
          position="bottom"
          withArrow
        >
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
        </Tooltip>
      )}

      {userContext.user && (
        <Tooltip
          label="Sign Out"
          position="bottom"
          placement="start"
          withArrow
          disabled={disableTooltip}
        >
          <AiOutlineLogout
            size={30}
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
