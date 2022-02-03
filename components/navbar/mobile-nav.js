import React from 'react';
import MobileNavItem from './mobile-nav-item';
import styles from './mobile-nav.module.css';
const MobileNav = ({ navLinks, isOpen, textColor }) => {
  return (
    <div className="container">
      <ul className={`flex flex-1 flex-col text-center uppercase px-4 overflow-hidden ${!isOpen ? styles['mobile-hidden'] : styles['mobile-open']} ${textColor}`}>
        {navLinks.map((link) => (
          <MobileNavItem key={link.text} href={link.href}>
            {link.text}
          </MobileNavItem>
        ))}
      </ul>
    </div>
  );
};

export default MobileNav;
