import Hero from "../components/home/hero";
import Features from "../components/home/features/features";
import ImageDiv from "../components/home/image-hero/image-div";
import BlogEvents from "../components/home/blog-events-home/blog-event";
import Footer from "../components/footer/footer";
import styles from '../components/home/hero.module.css';
import { useState, useEffect } from "react";
export default function Home() {
  const [loading, setLoading] = useState(true);

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
      <BlogEvents />
      <Footer />
    </div>
  );
}
