import Hero from "../components/home/hero"
import Features from '../components/home/features/features';
import ImageDiv from "../components/home/image-hero/image-div";
import BlogEvents from "../components/home/blog-events-home/blog-event";
import Footer from "../components/footer/footer";
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ImageDiv />
      <BlogEvents/>
      <Footer/>
    </>
  );
}
