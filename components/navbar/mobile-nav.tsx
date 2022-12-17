import React, { useContext } from 'react';
import MobileNavItem from './mobile-nav-item';
import styles from './mobile-nav.module.css';
import { Drawer } from '@mantine/core';
import { UserContext } from '../../store/user-context';
import Image from 'next/image';
import { NavLink } from './navbar';

interface Props {
  navLinks: NavLink[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
} 

const MobileNav: React.FC<Props> = ({ navLinks, isOpen, setIsOpen, setShowSignIn }) => {
  const userContext = useContext(UserContext);
  

  const signOutHandler = async () => {
    setIsOpen(false);
    userContext.logOutHandler();
  }

  const showSignIn = () => {
    setIsOpen(false);
    setShowSignIn(true);
  }
  return (
    <div className="container">
      <Drawer
        zIndex={10000}
        transitionDuration={750}
        trapFocus={false}
        size={"100%"}
        opened={isOpen}
        position="right"
        onClose={() => setIsOpen(false)}
        padding={20}
        className="overflow-scroll"
      >
        <ul
          className={`flex flex-1 flex-col text-center uppercase px-4 overflow-hidden text-black`}
        >
          <MobileNavItem href="/">Home</MobileNavItem>
          {navLinks.map((link) => (
            <MobileNavItem key={link.text} href={link.href}>
              {link.text}
            </MobileNavItem>
          ))}
          {/*  DISABLE VBS UNTIL NEXT YEAR  */}
          {/* <MobileNavItem href="/vbs">VBS Registration</MobileNavItem> */}
        </ul>
        {userContext?.avatarURL ? (
          <div
            onClick={() => signOutHandler()}
            className="flex flex-1 justify-center items-center my-4 mx-auto flex-row"
          >
            <Image
              className="object-cover rounded-full"
              src={userContext.avatarURL}
              height={50}
              width={50}
              alt={userContext?.firstName}
            />
            <p className="font-primaryFont font-semibold ml-4 underline">
              Sign Out
            </p>
          </div>
        ) : (
          <div
            onClick={() => showSignIn()}
            className="flex flex-1 justify-center items-center my-4 mx-auto flex-row"
          >
            <p className="font-primaryFont font-semibold ml-4 underline">
              Sign In
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default MobileNav;
