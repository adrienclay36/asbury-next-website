import React from 'react';
import styles from './footer.module.css';
import { navLinks } from '../navbar/navbar';
import Link from 'next/link';
import SocialIcons from '../navbar/social-icons';
import Image from 'next/image';
import { useRouter } from 'next/router';


const Footer = () => {
  const router = useRouter();
  return (
    <footer className="py-8 bg-gray-100">
      <div className="container flex flex-col items-center">
        <div className="flex gap-10 my-12 md:mt-0">
          <SocialIcons
            textColor="text-seaFoam-500"
            textHover={"text-seaFoam-800"}
          />
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-12">
          <ul className="flex flex-col lg:flex-row justify-end text-black text-center uppercase gap-12 text-md">
            {navLinks.map((link) => {
              return (
                <Link key={link.text} href={link.href} passHref>
                  <li className="lg:mb-6 cursor-pointer tracking-widest hover:text-seaFoam-400">
                    {link.text}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="my-6 mt-12 lg:mt-4">
          <button onClick={() => router.push("/")}>
            <Image
              className="max-h-16 cursor-pointer"
              src="/images/AsburyLogoFull.png"
              alt="Asbury Logo"
              height={64}
              width={153}
            />
          </button>
        </div>
        <div className="pb-10">
          <p className="text-center text-gray-400 text-xs">
            &copy; Asbury Methodist Church 2022
          </p>
          <p className="text-center mt-5 text-gray-400 text-xs">
            505-299-0643
          </p>
          <p className="text-center mt-5 text-gray-400 text-xs">
            10000 Candelaria Rd NE, Albuquerque, NM 87112
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
