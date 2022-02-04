import React, { useState, useEffect } from 'react';
import styles from './blog-section.module.css';
const BlogSection = () => {
    const [all, setAll] = useState(false);
    const [featured, setFeatured] = useState(true);


    useEffect(() => {
        document.getElementById("featured").focus();
    }, [])


    const viewAllHandler = () => {
        if(!all) {
            setAll(true);
            setFeatured(false);
            console.log('viewing all');
        }
        
    }
    const viewFeaturedHandler = () => {
        if(!featured){
            setAll(false);
            setFeatured(true);
            console.log("viewing featured");
            

        }
        
    }

  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center flex flex-1 justify-center">
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        <h1 className="uppercase text-3xl">Blog</h1>
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      </div>

      <div className="container grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-2/6">
        <button
          onClick={viewAllHandler}
          className={`${all ? "active focus" : ""} ${
            styles.btn
          } text-xl uppercase rounded-l-lg text-seaFoam-600 border-2 px-4 py-2 mt-12`}
        >
          All Posts
        </button>
        <button
        id="featured"
          onClick={viewFeaturedHandler}
          className={`${featured ? "active focus" : ""} ${
            styles.btn
          } text-xl uppercase rounded-r-lg text-seaFoam-600 border-2 px-4 py-2 mt-12`}
        >
          Featured Posts
        </button>
      </div>



    </section>
  );
};

export default BlogSection;
