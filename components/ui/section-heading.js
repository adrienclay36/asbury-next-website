import React from 'react';

const SectionHeading = (props) => {
  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center flex flex-1 justify-center">
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        <h1 className="uppercase text-3xl">{props.title}</h1>
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      </div>

      <div className="text-center text-seaFoam-500">
        <h1 className="text-4xl mt-12 uppercase tracking-widest">{props.subheading || null}</h1>
      </div>
      {props.children}
    </section>
  );
};

export default SectionHeading;
