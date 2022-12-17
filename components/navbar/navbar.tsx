import React, { useState, useEffect } from "react";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import SocialIcons from "./social-icons";
import LogoUnited from "../logo/LogoUnited";
import { MessageDots, Bookmarks } from "tabler-icons-react";
import { CgCross } from "react-icons/cg";
import { FaChild, FaStripeS } from "react-icons/fa";
import { RiWomenLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { GiSewingNeedle } from "react-icons/gi";
import { BsFillPeopleFill, BsPaypal } from "react-icons/bs";
import { Burger } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import UIModal from "../ui/modal/UIModal";
import { Drawer, Modal } from "@mantine/core";
import SignUpForm from "./sign-up-form";
import SignInForm from "./sign-in-form";
import ForgotPasswordForm from "./forgot-password-form";
import { supabase } from "../../supabase-client";
import SubMenu from "./sub-menu";

interface Props {
  onOpen: () => void;
  classes?: string;
  marginTop?: boolean;
  invertImage?: boolean;
  textColor?: string;

}
const Navbar: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassSuccess, setResetPassSuccess] = useState(false);

  const router = useRouter();
  const hideLogo = useMediaQuery("(max-width: 1024px)");

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

  const signInHandler = async (email: string, password: string) => {
    if (email && password) {
      try {
        const { error } = await supabase.auth.signIn({ email, password });
        if (error) {
          console.log("Error Signging in :: ", error.message);
          throw new Error();
        }
        setShowSignIn(false);
        setSuccess(true);
      } catch (err) {
        console.log(err);
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
    setError("");
  };

  const toggleForgotPassword = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setForgotPassword(true);
    setError("");
  };

  const resetPasswordHandler = async (email: string) => {
    const { data: resetPassData, error: resetPassError } =
      await supabase.auth.api.resetPasswordForEmail(email);
    if (!resetPassError) {
      setResetPassSuccess(true);
      setForgotPassword(false);
    } else {
      setError(resetPassError.message);
    }
  };

  const restartSequence = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    setForgotPassword(false);
    setError("");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsInitial(false);

    props.onOpen();
  };
  return (
    <div>
      {/* SIGN IN/UP MODALS  */}

      <Drawer
        size={"80%"}
        opened={showSignUp}
        onClose={() => setShowSignUp(false)}
        title="Sign Up"
        padding="xl"
        position="top"
      >
        <SignUpForm
          restartSequence={restartSequence}
          setShowSignUp={setShowSignUp}
        />
      </Drawer>

      {/* SIGN IN MODALS */}
      <Modal centered opened={showSignIn} onClose={() => setShowSignIn(false)}>
        <SignInForm
        error={error}
          signInHandler={signInHandler}
          resetError={resetError}
          toggleSignUp={toggleSignUp}
          toggleForgotPassword={toggleForgotPassword}
        />
      </Modal>

      {/* FORGOT PASSWORD MODALS */}

      <Modal
        centered
        opened={forgotPassword}
        onClose={() => setForgotPassword(false)}
      >
        <ForgotPasswordForm
          resetError={resetError}
          error={error}
          resetPasswordHandler={resetPasswordHandler}
          restartSequence={restartSequence}
        />
      </Modal>

      <UIModal
        opened={resetPassSuccess}
        onClose={() => setResetPassSuccess(false)}
        centerModal={true}
        type="success"
        message="You will receive an email with further instructions for resetting your password!"
      />

      <UIModal
        centerModal={true}
        type="success"
        message="Successfully signed in!"
        opened={success}
        onClose={() => setSuccess(false)}
      />
      <SocialIcons
        textColor="text-white"
        textHover={"text-slate-200"}
        showSignIn={showSignIn}
        showSignUp={showSignUp}
        setShowSignIn={setShowSignIn}
        isOpen={isOpen}
      />
      <nav
        className={`container ${props.classes} flex items-center py-4 ${
          props.marginTop && "sm:mt-12"
        }`}
      >
        {!hideLogo && (
          <Link href="/" passHref>
            <div className={`py-1 ${props.invertImage && "invert"}`}>
              <LogoUnited />
            </div>
          </Link>
        )}
        <ul
          className={`hidden sm:flex flex-1 flex-wrap lg:flex-nowrap md:flex-wrap justify-center lg:justify-end md:justify-center items-center gap-6 lg:gap-10 md:gap-6 uppercase text-sm mt-2 text-semibold overflow-hidden ${props.textColor}`}
        >
          {navLinks.map((link, index) => {
            if (!link.subNav) {
              return (
                <Link key={link.text} href={link.href} passHref>
                  <li
                    tabIndex={0}
                    className="mb-2 cursor-pointer tracking-widest hover:text-slate-200 text-center"
                  >
                    {link.text}
                  </li>
                </Link>
              );
            }
            if (link.subNav) {
              return (
                <SubMenu
                  size={link.size}
                  key={link.text}
                  control={
                    <button
                      onClick={() => router.push(link.href)}
                      className="mb-2 cursor-pointer tracking-widest hover:text-slate-200 text-center uppercase"
                    >
                      {link.text}
                    </button>
                  }
                  items={link.items}
                />
              );
            }
          })}
        </ul>
        <div className="flex sm:hidden flex-1 justify-end mr-3">
          <Burger
            size={30}
            opened={isOpen}
            color="white"
            onClick={toggleMenu}
          />
        </div>
      </nav>
      <div className="sm:hidden md:block lg:block">
        <MobileNav
          isOpen={isOpen}
          navLinks={navLinks}
          setIsOpen={setIsOpen}
          setShowSignIn={setShowSignIn}
        />
      </div>
    </div>
  );
};

export default Navbar;

export type NavLink = {
  text: string;
  href: string;
  subNav?: boolean;
  size?: string;
  items?: SubNav[];
}

export type SubNav = {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export const navLinks: NavLink[] = [
  {
    text: "Welcome",
    href: "/welcome",
    subNav: true,
    size: "md",
    items: [
      {
        title: "Worship",
        href: "/worship",
        icon: <CgCross size={20} />,
      },
      {
        title: "Mothers Day Out",
        href: "/mothers-day-out",
        icon: <FaChild size={18} />,
      },
      {
        title: "Staff",
        href: "/welcome/#staff",
        icon: <BsFillPeopleFill size={20} />,
      },
    ],
  },

  {
    text: "News",
    href: "/blog",
    subNav: true,
    size: 'md',
    items: [
      {
        title: 'Bulletins',
        href: '/blog',
        icon: <MessageDots size={20}/>,
      },
      {
        title: 'Asbury Trails',
        href: '/asbury-trails',
        icon: <Bookmarks size={20}/>
      }
    ]
  },
  {
    text: "Events",
    href: "/events",
  },
  {
    text: "Giving",
    href: "/giving",
    subNav: true,
    size: "md",
    items: [
      // {
      //   title: "PayPal",
      //   href: "https://www.paypal.com",
      //   icon: <BsPaypal size={18} />,
      // },
      {
        title: "One Time Donation",
        href: "/giving/one-time-donation",
        icon: <FaStripeS size={18} />,
      },
    ],
  },
  {
    text: "Connect",
    href: "/connect",
    subNav: true,
    size: "lg",
    items: [
      {
        title: "United Methodist Women",
        href: "/connect/umc-women",
        icon: <RiWomenLine size={20} />,
      },
      {
        title: "Prayer Quilt Ministry",
        href: "/connect/prayer-quilt-ministry",
        icon: <GiSewingNeedle size={20} />,
      },
    ],
  },
  {
    text: "Library",
    href: "/library",
  },
  {
    text: "Asbury Cafe",
    href: "/asbury-cafe",
  },
  // {
  //   text: "Joys & Concerns",
  //   href: "/joys-and-concerns",
  // },
];
