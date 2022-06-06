import Hero from "../components/home/hero";
import Features from "../components/home/features/features";
import ImageDiv from "../components/home/image-hero/image-div";
import BlogEvents from "../components/home/blog-events-home/blog-event";
import Footer from "../components/footer/footer";
import styles from "../components/home/hero.module.css";
import { useState, useEffect, useContext } from "react";
import HeroInfo from "../components/home/info-section-two/hero-info";
import { supabase } from "../supabase-client";
import { UserContext } from "../store/user-context";
import { Dialog } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { FaChild } from 'react-icons/fa';
import ModalWithButton from "../components/ui/modal/ModalWithButton";
export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(props.posts);
  const [userWelcome, setUserWelcome] = useState(false);
  const [VBSOpen, setVBSOpen] = useState(false);
  const userContext = useContext(UserContext);
  const disableNotifications = useMediaQuery("(max-width: 900px)");
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 750);

    if (userContext.user && !disableNotifications) {
      const timeout = setTimeout(() => {
        setUserWelcome(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [userContext.user, disableNotifications]);

  useEffect(() => {
    if (userWelcome) {
      const closeWelcome = setTimeout(() => {
        setUserWelcome(false);
      }, 10000);

      return () => clearTimeout(closeWelcome);
    }
  }, [userWelcome]);

  // // TEMP VBS MODAL CONTROLS

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setVBSOpen(true);
  //   }, 1500);
  //   return () => clearTimeout(timeout);
  // }, []);

  // useEffect(() => {
  //   if (VBSOpen) {
  //     const timeout = setTimeout(() => {
  //       setVBSOpen(false);
  //     }, 10000);
  //   }
  //   return () => clearTimeout(timeout);
  // }, [VBSOpen]);

  return (
    <div className="font-primaryFont">
      {/* TEMP VBS MODAL */}
      {/* <ModalWithButton
        opened={VBSOpen}
        onClose={() => setVBSOpen(false)}
        text={
          "VBS registration is now open for both children and volunteers! VBS will take place from July 25th - July 29th. Click the button below to check out the details!"
        }
        icon={<FaChild size={50} className="text-seaFoam-600 my-8" />}
        title="VBS Registration"
        buttonText={"View The Details"}
        onClick={() => router.push("/vbs")}
        bold
      /> */}
      <Dialog
        withCloseButton
        opened={userWelcome}
        onClose={() => setUserWelcome(false)}
      >
        {userContext.avatarPath === "default-2.png" ? (
          <>
            <p className="text-center my-2">
              We noticed you haven&apos;t added a profile picture..
            </p>
            <div className="text-center">
              <button
                onClick={() =>
                  router.push(
                    `/profile/${
                      userContext.user.id
                    }/${userContext.firstName.toLowerCase()}-${userContext.lastName.toLowerCase()}`
                  )
                }
                className="text-gray-500 font-semibold hover:underline text-center"
              >
                Add One Now
              </button>
            </div>
          </>
        ) : (
          <p className="text-seaFoam-600 text-xl text-center">
            Welcome, {userContext.firstName}
          </p>
        )}
      </Dialog>
      <div className={styles.heroImage} style={{ display: "none" }}>
        <img alt="Asbury Background" src="/images/hero.jpg" />
      </div>
      <Hero />
      <Features />
      {!loading && <ImageDiv />}
      <BlogEvents posts={props.posts} />
      <HeroInfo />
      <Footer />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { data } = await supabase
    .from("posts")
    .select()
    .order("postdate", { ascending: false })
    .order("id", { ascending: false })
    .limit(3);

  return {
    props: {
      posts: data,
    },
    revalidate: 10,
  };
};
