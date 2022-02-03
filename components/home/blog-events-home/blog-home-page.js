import React from "react";
import BlogItem from "./blog-item";
const BlogHomePage = () => {
  return (
    <section>
      <div className="border-r-4 w-full h-full shadow-md rounded-lg p-2">
        <h1 className="uppercase text-3xl text-center mb-2 border-b-2 py-2 pb-4">
          Blog
        </h1>
        <ul>
          <BlogItem
            title={"This is the title"}
            author={"John Doe"}
            content={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis"
            }
            date={"2/3/2022"}
          />
          <BlogItem
            title={"This is the title"}
            author={"John Doe"}
            content={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis"
            }
            date={"2/3/2022"}
          />
          <BlogItem
            title={"This is the title"}
            author={"John Doe"}
            content={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis"
            }
            date={"2/3/2022"}
          />
        </ul>
        
      </div>
    </section>
  );
};

export default BlogHomePage;
