import React from "react";
import Link from "next/link";
import styles from './mobile-nav-item.module.css'
const MobileNavItem = (props) => {
  return (
    <>
      <Link href={props.href} passHref>
        <li
          className={`my-4 font-light tracking-widest`}
        >
          {props.children}
        </li>
      </Link>
      <hr className="border-b" />
    </>
  );
};

export default MobileNavItem;
