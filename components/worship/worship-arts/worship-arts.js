import React from 'react';
import ArtsCard from './arts-card';
const WorshipArts = () => {
  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center text-seaFoam-500">
        <h1 className="text-4xl mt-2 uppercase tracking-widest">
          Worship Arts
        </h1>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {arts.map(art => (
            <ArtsCard key={art.title} title={art.title} timeframe={art.timeframe} description={art.description} day={art.day} />
        ))}
      </div>
    </section>
  );
};

export default WorshipArts;

export const arts = [
    {
        title: "Chancel Choir",
        timeframe: "7:30PM - 9:00PM",
        day: 'Wednesday',
        description: "Chancel Choir is open to all adults college age and up. This choir sings a variety of choral music and presents their musical offering during the 8:30AM and/or 11:00AM services. The choir is always in need of members."
    },
    {
        title: "Bells Of Praise",
        timeframe: "12:00PM - 1:00PM",
        day: 'Sunday',
        description: "Bells of Praise is Asbury's handbell choir. This handbell choir plays a large variety of music with as many players as are available, ultimately performing beautiful musical selections during the 8:30AM and/or 11:00AM services."
    }
]
