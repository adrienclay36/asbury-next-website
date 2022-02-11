import React from 'react';
import AdminMobileNav from './admin-mobile-nav';
import Link from 'next/link';
import { useState } from 'react';
import styles from './navbar.module.css';
import { AiOutlineMenu } from 'react-icons/ai';
import Image from "next/image";
import { useRouter } from 'next/router';
import { supabase } from '../../../../supabase-client';
const AdminNavbar = (props) => {
  const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isInitial, setIsInitial] = useState(true);

    const logoutHandler = async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      router.replace("/admin");
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsInitial(false);
        

    }
  return (
    <div>
      <nav
        className={`container ${props.classes} flex items-center py-4 mt-12 ${
          props.marginTop && "sm:mt-12"
        }`}
      >
        <Link href="/admin/admin-dashboard" passHref>
          <div className={`py-1 ${props.invertImage && "invert"}`}>
            <Image
              className={`max-h-16 py-1 cursor-pointer`}
              height={64}
              width={153.6}
              src="/images/AsburyLogoFull.png"
              alt="Asbury Logo"
              priority={true}
            />
          </div>
        </Link>
        <ul
          className={`hidden sm:flex flex-1 justify-end items-center gap-10 uppercase text-sm mt-2 text-semibold ${props.textColor}`}
        >
          {navLinks.map((link) => {
            return (
              <Link key={link.text} href={link.href} passHref>
                <li className="mb-2 cursor-pointer tracking-widest text-lg hover:text-seaFoam-600">
                  {link.text}
                </li>
              </Link>
            );
          })}
          <button
            onClick={logoutHandler}
            className="mb-2 cursor-pointer tracking-widest text-lg hover:text-seaFoam-600 uppercase"
          >
            Logout
          </button>
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
        <AdminMobileNav
          textColor={props.textColor}
          isOpen={isOpen}
          className={styles.menuSlide}
          navLinks={navLinks}
          inverted={props.inverted}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
};

export default AdminNavbar;

export const navLinks = [
  {
    text: "Admin Home",
    href: "/admin/admin-dashboard",
  },
  {
    text: "Blog Operations",
    href: "/admin/blog-dashboard",
  },
  {
    text: "Librarian",
    href: "/admin/library-dashboard",
  },
];
