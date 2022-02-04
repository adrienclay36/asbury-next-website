import React from 'react';
import WorshipCard from './worship-card';
const WorshipSection = () => {
  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center flex flex-1 justify-center">
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        <h1 className="uppercase text-3xl">Worship</h1>
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      </div>

      <div className="text-center text-seaFoam-500">
        <h1 className="text-4xl mt-12 uppercase tracking-widest">Services</h1>
      </div>
      <WorshipCard/>
    

    </section>
  );
};

export default WorshipSection;
