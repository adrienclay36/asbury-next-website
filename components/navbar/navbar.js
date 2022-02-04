import React from 'react';
import MobileNav from './mobile-nav';
import Link from 'next/link';
import { useState } from 'react';
import styles from './navbar.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import SocialIcons from './social-icons';
import Image from 'next/image';
import Logo from '../logo/Logo';
const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isInitial, setIsInitial] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsInitial(false);
        if(!props.home){
          props.onOpen();
        }

    }
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
            <Logo/>
          </div>
        </Link>
        <ul
          className={`hidden sm:flex flex-1 justify-end items-center gap-10 uppercase text-sm mt-2 text-semibold ${props.textColor}`}
        >
          {navLinks.map((link) => {
            return (
              <Link key={link.text} href={link.href} passHref>
                <li className="mb-2 cursor-pointer tracking-widest hover:text-slate-200">
                  {link.text}
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="flex sm:hidden flex-1 justify-end mr-3">
          <AiOutlineMenu
            className={`p-1 ${isOpen && styles["rotate-open"]} ${
              !isOpen && !isInitial && styles["rotate-close"]
            } ${props.textColor}`}
            onClick={toggleMenu}
            size={40}
          />
        </div>
      </nav>
      <div className="sm:hidden">
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
  },
  {
    text: "Worship",
    href: "/worship",
  },
  {
    text: "Blog",
    href: "/blog",
  },
  {
    text: "Giving",
    href: "/giving",
  },
  {
    text: "Connect",
    href: "/connect",
  },
  {
    text: "Joys & Concerns",
    href: "/joys-and-concerns"
  }

];
