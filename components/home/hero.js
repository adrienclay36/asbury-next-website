import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../navbar/navbar";
import styles from "./hero.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiChevronDoubleDown } from "react-icons/hi";
import Lottie from "lottie-react";
import celebration from "../../animations/pop.json";
import MainButton from "../ui/main-button";

const Hero = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(!open);
    console.log("toggling open");
  };

  return (
    <section className={styles.fadeIn}>
      <div className={`${styles.heroImage}`}>
        <div className="pt-4">
          <Navbar
            textColor="text-white"
            invertImage={true}
            home={true}
            onOpen={onOpen}
          />
        </div>
        <div className={`text-center mt-4`}>
          <h1 className="text-white font-light tracking-widest opacity-80 uppercase text-4xl lg:text-7xl">
            {/* romans 15:7 */}
            65 Years!
          </h1>
          {/* <p className="text-white font-light tracking-wide opacity-70 uppercase text-2xl lg:text-4xl lg:w-100 mx-auto mt-12">
            Therefore welcome one another as Christ has welcomed you, for the
            glory of God.
            
          </p> */}
          <div className="flex flex-1 justify-center items-center -mb-12">
            <div style={{ height: 200, width: 200 }}>
              <Lottie animationData={celebration} autoplay loop />
            </div>
          </div>
          <p className="text-white font-light tracking-wide opacity-70 uppercase text-2xl lg:text-4xl lg:w-100 mx-auto mt-12 w-10/12 mx-auto">
            Join us on Sunday, Sept. 25, where we will celebrate the 65
            <sup>th </sup>
            anniversary of Asbury’s building dedication
          </p>
          {/* <div id="action-buttons" className="mt-12">
            <MainButton
              onClick={() => router.push("/welcome")}
              margin={"mx-4 mb-6 lg:mb-0 md:mb-0"}
            >
              About
            </MainButton>
            <MainButton onClick={() => router.push("/worship")} margin={"mx-4"}>
              Worship
            </MainButton>
          </div> */}
          <div id="action-buttons" className="mt-12">
            <MainButton
              onClick={() => router.push("/celebration-sixty-five")}
              margin={"mx-4 mb-6 lg:mb-0 md:mb-0"}
            >
              Celebration Information
            </MainButton>
            <MainButton onClick={() => router.push("/welcome")} margin={"mx-4"}>
              Our History
            </MainButton>
          </div>
        </div>
        <div className="flex flex-1 justify-center mt-12">
          <button
            onClick={() => {
              document
                .getElementById("features")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <HiChevronDoubleDown
              className={`text-white opacity-70 cursor-pointer hover:text-seaFoam-300 ${styles.chevron}`}
              size={50}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
