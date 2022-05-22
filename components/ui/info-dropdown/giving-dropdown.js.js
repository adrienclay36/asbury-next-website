import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from '@mantine/core';
import styles from "./info-dropdown.module.css";
import { useRouter } from 'next/router';
import Link from "next/link";
import { BsPaypal } from "react-icons/bs";
import { FaStripeS } from 'react-icons/fa';
const GivingDropdown = ({ title, content, buttonText, external, href }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const router = useRouter();
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsInitial(false);
  };

  return (
    <>
      <div className="container mt-8 p-6 w-11/12 lg:w-5/6 md:w-5/6 rounded-lg shadow-lg">
        <div className="flex flex-1 justify-between items-center">
          <h1 className="uppercase m-1 font-semibold text-xl">Online Giving</h1>
          <button onClick={toggleOpen}>
            <AiOutlinePlusCircle
              size={40}
              className={`text-seaFoam-500 hover:text-seaFoam-700 ${
                isOpen && styles["rotate-open"]
              } ${!isOpen && !isInitial && styles["rotate-close"]}`}
            />
          </button>
        </div>

        {isOpen && (
          <div
            className={`pt-8 leading-loose ${
              isOpen ? styles.open : styles.closed
            }`}
          >
            <p className="text-lg text-gray-500 text-center">
              Make a secure, online donation in any amount directly from our website. You will receive an automated email containing a transaction receipt. 
            </p>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <Link href="https://www.paypal.com" passHref>
                <a target="_blank" rel="noreferrer">
                  
                </a>
              </Link>
              <Button
                type="submit"
                variant="filled"
                disabled={true}
                onClick={() => router.push("/giving/one-time-donation")}
                leftIcon={<FaStripeS />}
                className="text-white bg-emerald-900 hover:bg-emerald-800 w-full uppercase tracking-wide"
                style={{
                  fontFamily: "Red Hat Display",
                  backgroundColor: "#635BFF",
                }}
              >
                Online Giving Coming Soon
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GivingDropdown;
