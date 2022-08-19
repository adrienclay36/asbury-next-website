import React from 'react';

const SectionHeading = ({ title, subheading, children, reactRef = null }) => {
  return (
    <section ref={reactRef} id={title} className="bg-gray-100 py-12">
      {title && (
        <div className="text-center flex flex-1 justify-center">
          <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
          <h1 className="uppercase text-lg lg:text-3xl md:text-2xl mt-2 lg:mt-0 md:mt-1">
            {title}
          </h1>
          <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        </div>
      )}

      <div className="text-center text-seaFoam-500">
        <h1 className="text-md lg:text-4xl md:text-2xl mt-12 uppercase tracking-widest">
          {subheading || null}
        </h1>
      </div>
      {children}
    </section>
  );
};

export default SectionHeading;
