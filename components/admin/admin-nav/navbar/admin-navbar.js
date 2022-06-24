import React, { useContext } from "react";
import AdminMobileNav from "./admin-mobile-nav";
import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "../../../../supabase-client";
import DualRingLoader from "../../../dual-ring-loader/DualRingLoader";
import { UserContext } from "../../../../store/user-context";
import AsburyButton from "../../../ui/AsburyButton";
const AdminNavbar = (props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const userContext = useContext(UserContext);

  const logoutHandler = async (e) => {
    e.preventDefault();
    setLoggingOut(true);
    await supabase.auth.signOut();
    await userContext.checkUser();
    setTimeout(() => {
      router.push("/admin");
    }, 1000);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsInitial(false);
  };
  return (
    <div>
      <nav
        className={`container ${props.classes} flex items-center py-4 mt-12 ${
          props.marginTop && "sm:mt-12"
        }`}
      >
        <Link href="/admin" passHref>
          <div className={`py-1 ${props.invertImage && "invert"}`}>
            <Image
              className={`max-h-16 py-1 cursor-pointer`}
              height={64}
              width={153.6}
              src="/images/UMCLeft.png"
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
          <div className="mb-3">
            <AsburyButton
              text="Log Out"
              onClick={logoutHandler}
              loading={loggingOut}
            />
          </div>
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
          loggingOut={loggingOut}
          setIsOpen={setIsOpen}
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
    text: "Bulletins",
    href: "/admin/bulletins-dashboard",
  },
  {
    text: "Librarian",
    href: "/admin/library-dashboard/upload-file",
  },
  {
    text: "Worship Services",
    href: "/admin/worship-service-dashboard",
  },
  // {
  //   text: 'Scheduling',
  //   href: '/admin/cafe-scheduling',
  // },
];
