import React, { useState } from "react";
import { useRouter } from "next/router";
import AsburyButton from "../../ui/AsburyButton";
const WelcomeItem = ({ title, description, buttonText, href}) => {
  const [pushing, setPushing] = useState(false);
    const router = useRouter();

    const navigateAdmin = () => {
      setPushing(true);
      router.push(href);
    }
  return (
    <>
      <div className="container border-2 p-8 shadow-lg rounded-lg mt-12 lg:mt-0 w-11/12 mx-auto mb-12">
        <h1 className="font-semibold text-seaFoam-700 mb-4">{title}</h1>
        <hr className="mb-5"/>
        <p className="font-semibold mb-2">{description}</p>
        <AsburyButton margin="w-full mx-auto mt-4" text={buttonText} onClick={navigateAdmin} loading={pushing}/>
      </div>
    </>
  );
};

export default WelcomeItem;
