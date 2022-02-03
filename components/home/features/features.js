import React from "react";
import FeatureItem from "./feature-item";
const Features = () => {
  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center flex flex-1 justify-center">
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        <h1 className="uppercase text-3xl">Featured At Asbury</h1>
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 max-w-screen-lg mt-12">
        <FeatureItem
          href="/giving"
          title={"giving"}
          subtext={"For good"}
          image={
            "https://images.unsplash.com/photo-1628417099242-c702a666007d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
          }
        />
        <FeatureItem
          href="/about"
          title={"about"}
          subtext={"Asbury"}
          image={
            "https://images.unsplash.com/photo-1629146468381-e8947bc2dfec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
          }
        />
        <FeatureItem
          href="/mothers-day-out"
          title={"MDO"}
          subtext={"Mothers Day Out"}
          image={
            "https://images.unsplash.com/photo-1629146468506-8caf96ec069c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }
        />
      </div>
    </section>
  );
};

export default Features;
