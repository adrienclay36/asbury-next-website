import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import styles from "./hero.module.css";
import { useRouter } from "next/router";
import { HiChevronDoubleDown } from "react-icons/hi";
import MainButton from "../ui/main-button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mantine/core";

interface VOTD {
  bookname: string;
  chapter: string;
  text: string;
  verse: string;
}

const Hero = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const getVOTD = async () => {
    const response = await axios.get(
      "https://labs.bible.org/api/?passage=votd&type=json"
    );
    if (response.data) {
      if (response.data.length > 0) {
        return response.data[0] as VOTD;
      }
    }
  };

  const { data, isLoading } = useQuery<VOTD | undefined>(["votd"], getVOTD);

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
        <div className={`text-center mt-4 lg:mt-12 md:mt-8`}>
          <h1 className="text-white font-light tracking-widest opacity-80 uppercase text-4xl lg:text-7xl">
            {/* romans 15:7 */}
            {!isLoading && `${data.bookname} ${data.chapter}:${data.verse}`}
            
          </h1>
          {isLoading && (
              <div className="w-11/12 lg:w-2/6 md:w-2/6 mx-auto">
                <Skeleton height={10} />
              </div>
            )}

          <p className="text-white font-light tracking-wide opacity-70 uppercase text-2xl lg:text-4xl lg:w-100 mx-auto mt-12">
            {/* Therefore welcome one another as Christ has welcomed you, for the
            glory of God.            */}
            {!isLoading && `${data.text}`}
            
          </p>
          {isLoading && (
              <div className="w-11/12 lg:w-3/6 md:w-3/6 mx-auto">
                <Skeleton height={10} width={"100%"} animate className="mb-2" />
                <Skeleton height={10} animate className="mb-2" />
                <Skeleton height={10} animate className="mb-2" />
                <Skeleton height={10} animate className="mb-2" />
              </div>
            )}
          <div id="action-buttons" className="mt-12">
            <MainButton
              onClick={() => router.push("/welcome")}
              margin={"mx-4 mb-6 lg:mb-0 md:mb-0"}
            >
              About
            </MainButton>
            <MainButton onClick={() => router.push("/worship")} margin={"mx-4"}>
              Worship
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
