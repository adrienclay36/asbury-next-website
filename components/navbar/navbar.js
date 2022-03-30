import React, { useState } from "react";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import styles from "./navbar.module.css";
import SocialIcons from "./social-icons";
import LogoUnited from "../logo/LogoUnited";
import { CgCross } from "react-icons/cg";
import { FaChild, FaStripeS } from "react-icons/fa";
import { RiWomenLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { GiSewingNeedle } from 'react-icons/gi';
import { BsFillPeopleFill, BsPaypal } from "react-icons/bs";
import { Burger } from '@mantine/core';
import { useMediaQuery } from "@mantine/hooks";
import SubMenu from "./sub-menu";
const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const router = useRouter();
  const hideLogo = useMediaQuery('(max-width: 1024px)');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsInitial(false);

    props.onOpen();
  };
  return (
    <div>
      <SocialIcons textColor="text-white" textHover={"text-slate-200"} />
      <nav
        className={`container ${props.classes} flex items-center py-4 ${
          props.marginTop && "sm:mt-12"
        }`}
      >
        {!hideLogo && <Link href="/" passHref>
          <div className={`py-1 ${props.invertImage && "invert"}`}>
            <LogoUnited />
          </div>
        </Link>}
        <ul
          className={`hidden sm:flex flex-1 flex-wrap lg:flex-nowrap md:flex-wrap justify-center lg:justify-end md:justify-center items-center gap-6 lg:gap-10 md:gap-6 uppercase text-sm mt-2 text-semibold overflow-hidden ${props.textColor}`}
        >
          {navLinks.map((link) => {
            if (!link.subNav) {
              return (
                <Link key={link.text} href={link.href} passHref>
                  <li className="mb-2 cursor-pointer tracking-widest hover:text-slate-200 text-center">
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
                    <button onClick={() => router.push(link.href)} className="mb-2 cursor-pointer tracking-widest hover:text-slate-200 text-center uppercase">
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
          <Burger size={30} opened={isOpen} color="white" onClick={toggleMenu} />
        </div>
      </nav>
      <div className="sm:hidden md:block lg:block">
        <MobileNav
          textColor={props.textColor}
          isOpen={isOpen}
          className={styles.menuSlide}
          navLinks={navLinks}
          inverted={props.inverted}
        />
      </div>
    </div>
  );
};

export default Navbar;

export const navLinks = [
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
    text: "Bulletins",
    href: "/blog",
  },
  {
    text: "Events",
    href: "/events",
  },
  {
    text: "Giving",
    href: "/giving",
    subNav: true,
    size: "xs",
    items : [
      {
        title: "PayPal",
        href: "https://www.paypal.com",
        icon: <BsPaypal size={18}/>
      },
      {
        title: "Stripe",
        href: "/giving/one-time-donation",
        icon: <FaStripeS size={18}/>
      }
    ]
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
  {
    text: "Joys & Concerns",
    href: "/joys-and-concerns",
  },
];
