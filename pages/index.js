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
export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(props.posts);
  const [userWelcome, setUserWelcome] = useState(false);
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

  return (
    <div className="font-primaryFont">
      {/* Priority load hero image for home page */}
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
        <img alt="priority load" src="/images/hero.jpg" />
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
