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
import { showNotification } from '@mantine/notifications';
import { PostItem } from "../types/post-item";
import { GetStaticProps, NextPage } from "next";

interface HomeProps {
  posts: PostItem[]
}
const Home: NextPage<HomeProps> = (props) => {
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

    if (userContext.firstName && !disableNotifications) {
      const timeout = setTimeout(() => {
        setUserWelcome(true);
        showNotification({
          title: `Welcome, ${userContext?.firstName}`,
          message: 'Good To See You Again!',
          color: 'green',
          autoClose: 10000,
          
        })
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [userContext.firstName, disableNotifications]);

  useEffect(() => {
    if (userWelcome) {
      const closeWelcome = setTimeout(() => {
        setUserWelcome(false);
      }, 10000);

      return () => clearTimeout(closeWelcome);
    }
  }, [userWelcome]);



  return (
    <div className="font-primaryFont">
      
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

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
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
