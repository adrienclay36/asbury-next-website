import React from 'react';
import styles from './footer.module.css';
import { navLinks } from '../navbar/navbar';
import Link from 'next/link';
import SocialIcons from '../navbar/social-icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import MainButton from '../ui/main-button';

const Footer = () => {
  const router = useRouter();
  const mobileScreen = useMediaQuery("(max-width: 520px)");
  return (
    <footer className="py-8 bg-gray-100">
      <div className='flex flex-1 justify-center items-center'>

      {!mobileScreen && <MainButton filled onClick={() => router.push("/vbs")}>
        VBS Registration
      </MainButton>}
      </div>
      <div className="container flex flex-col items-center">
        <div className="flex gap-10 mt-12 md:mt-0">
          <SocialIcons
            hideButton
            textColor="text-seaFoam-500"
            textHover={"text-seaFoam-800"}
          />
        </div>

        <div className="my-6 mt-12 lg:mt-4">
          <button onClick={() => router.push("/")}>
            <Image
              className="max-h-16 cursor-pointer"
              src="/images/UMCLeft.png"
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
          <p className="text-center mt-5 text-gray-400 text-xs">505-299-0643</p>
          <p className="text-center mt-5 text-gray-400 text-xs">
            10000 Candelaria Rd NE, Albuquerque, NM 87112
          </p>
          <Link href="/admin" passHref>
            <p className="text-center mt-5 text-gray-400 text-xs cursor-pointer underline">
              Admin
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
