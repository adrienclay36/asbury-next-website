import React from "react";
import HRThin from '../../ui/HRThin';
import { useRouter } from "next/router";
const WelcomeItem = ({ title, description, buttonText, href}) => {
    const router = useRouter();
  return (
    <>
      <div className="container border-2 p-8 shadow-lg rounded-lg mt-12 lg:mt-0 w-11/12 mx-auto">
        <h1 className="font-semibold text-seaFoam-700 mb-4">{title}</h1>
        <hr className="mb-5"/>
        <p className="font-semibold mb-2">{description}</p>
        <button onClick={() => router.push(href)} className="mt-4 bg-emerald-900 text-white uppercase w-full py-2 rounded-lg shadow-md">{buttonText}</button>
      </div>
    </>
  );
};

export default WelcomeItem;
