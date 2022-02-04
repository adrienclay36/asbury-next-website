import Hero from "../components/home/hero";
import Features from "../components/home/features/features";
import ImageDiv from "../components/home/image-hero/image-div";
import BlogEvents from "../components/home/blog-events-home/blog-event";
import Footer from "../components/footer/footer";
import PageLoading from "../components/PageLoading/PageLoading";
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
      <Hero />
      <Features />
      {!loading && <ImageDiv />}
      <BlogEvents />
      <Footer />
    </div>
  );
}
