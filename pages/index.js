import Hero from "../components/home/hero";
import Features from "../components/home/features/features";
import ImageDiv from "../components/home/image-hero/image-div";
import BlogEvents from "../components/home/blog-events-home/blog-event";
import Footer from "../components/footer/footer";
import styles from '../components/home/hero.module.css';
import { useState, useEffect } from "react";
import { supabase } from "../supabase-client";
import axios from "axios";
export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(props.posts);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, []);

  return (
    <div className="font-primaryFont">
      {/* Priority load hero image for home page */}
      <div className={styles.heroImage} style={{display: 'none'}}><img alt="priority load" src="/images/hero.jpg"/></div>
      <Hero />
      <Features />
      {!loading && <ImageDiv />}
      <BlogEvents posts={props.posts}/>
      <Footer />
    </div>
  );
}


export const getStaticProps = async (context) => {
  const { data } = await supabase
    .from('posts')
    .select()
    .order('postdate', { ascending: false }).order('id', { ascending: false}).limit(3);


  return {
    props: {
      posts: data,
    },
    revalidate: 10,
  }
}
