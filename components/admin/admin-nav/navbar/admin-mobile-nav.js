import React from 'react';
import MobileNavItem from './mobile-nav-item';
import styles from './mobile-nav.module.css';
import Link from 'next/link';

const MobileNav = ({ navLinks, isOpen, textColor, logoutHandler, loggingOut }) => {
  return (
    <div className="container">
      <ul
        className={`flex flex-1 flex-col text-center uppercase px-4 overflow-hidden ${
          styles["last-li"]
        } ${
          !isOpen ? styles["mobile-hidden"] : styles["mobile-open"]
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
    </div>
  );
};

export default MobileNav;
