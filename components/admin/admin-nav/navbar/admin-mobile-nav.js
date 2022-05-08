import React from 'react';
import MobileNavItem from './mobile-nav-item';
import styles from './mobile-nav.module.css';
import Link from 'next/link';
import { Drawer } from '@mantine/core';

const MobileNav = ({ navLinks, isOpen, textColor, logoutHandler, setIsOpen, }) => {
  return (
    <div className="container">
      <Drawer noFocusTrap position="bottom" size={'90%'} padding={20} transitionDuration={750} opened={isOpen} onClose={() => setIsOpen(false)}>

      <ul
        className={`flex flex-1 flex-col text-center uppercase px-4 overflow-hidden ${
          styles["last-li"]
        } ${textColor}`}
      >
        {navLinks.map((link) => (
          <MobileNavItem key={link.text} href={link.href}>
            {link.text}
          </MobileNavItem>
        ))}
      <button onClick={logoutHandler}>
        <li className={`my-4 tracking-widest uppercase`}>Logout</li>
      </button>
      <hr className="border-b" />
      </ul>
          </Drawer>
    </div>
  );
};

export default MobileNav;
