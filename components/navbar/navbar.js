import React from "react";
import MobileNav from "./mobile-nav";
import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import SocialIcons from "./social-icons";
import Image from "next/image";
import LogoUnited from "../logo/LogoUnited";
import { CgCross } from "react-icons/cg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaChild } from 'react-icons/fa';
import { RiWomenLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { GiSewingNeedle } from 'react-icons/gi';
import { BsFillPeopleFill } from "react-icons/bs";
import { Burger } from '@mantine/core';
import SubMenu from "./sub-menu";
const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const router = useRouter();

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
        <Link href="/" passHref>
          <div className={`py-1 ${props.invertImage && "invert"}`}>
            <LogoUnited />
          </div>
        </Link>
        <ul
          className={`hidden sm:flex flex-1 justify-end items-center gap-6 lg:gap-10 md:gap-6 uppercase text-sm mt-2 text-semibold ${props.textColor}`}
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
          {/* <AiOutlineMenu
            className={`p-1 ${isOpen && styles["rotate-open"]} ${
              !isOpen && !isInitial && styles["rotate-close"]
            } ${props.textColor}`}
            onClick={toggleMenu}
            size={40}
          /> */}
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
      // {
      //   title: "About",
      //   href: "/welcome",
      //   icon: <AiOutlineInfoCircle size={20} />,
      // },
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
    text: "Blog",
    href: "/blog",
  },
  {
    text: "Events",
    href: "/events",
  },
  {
    text: "Giving",
    href: "/giving",
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
