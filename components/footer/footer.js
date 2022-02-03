import React from 'react';
import styles from './footer.module.css';
import { navLinks } from '../navbar/navbar';
import Link from 'next/link';
import SocialIcons from '../navbar/social-icons';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className="py-8 bg-gray-100">
      <div className="container flex flex-col items-center">
          <div className="mb-12">

        <Link href="/" passHref>
          <Image
            className="max-h-16 cursor-pointer"
            src="/images/AsburyLogoFull.png"
            alt="Asbury Logo"
            height={64}
            width={153}
            />
        </Link>
            </div>
        <div className="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-12">
          <ul className="flex flex-col lg:flex-row justify-end text-black text-center uppercase gap-12 text-md">
            {navLinks.map((link) => {
              return (
                <Link key={link.text} href={link.href} passHref>
                  <li className="mb-2 cursor-pointer tracking-widest hover:text-seaFoam-400">
                    {link.text}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-10 mt-12 md:mt-0">
          <SocialIcons textColor="text-seaFoam-500" textHover={"text-seaFoam-800"} />
        </div>
        <div>
            <p className="py-10 text-center text-gray-400 text-xs">&copy; Asbury Methodist Church 2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
