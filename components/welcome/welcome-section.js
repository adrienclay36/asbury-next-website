import React from 'react';
import InfoSection from './info-section';
import Image from 'next/image';
const WelcomeSection = () => {
  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center flex flex-1 justify-center">
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        <h1 className="uppercase text-3xl">Welcome</h1>
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      </div>

        <div className="text-center text-seaFoam-500">

        <h1 className="text-4xl mt-12 uppercase tracking-widest">Who We Are</h1>
        </div>

        <div className="sm:container grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 items-start mt-12">

      {info.map((item) => {
          return <InfoSection key={item.title} title={item.title} content={item.content}/>
        })}
        </div>

    </section>
  );
};

export default WelcomeSection;



export const info = [
  {
    title: "Our History",
    content:
      "On Easter Sunday, 1954, Leonard and Bernice Nichol began a new church in their small home on Salem NE. On July 21, 1957, the distinctive A-frame structure was dedicated to the praise of God. Many renovations and additions have led to the current facility for worship, fellowship and service. In 2015 Asbury celebrated 60 years of ministry in Albuquerque.",
  },
  {
    title: "Our Community",
    content:
      "Asbury has long served the community by providing meeting space to organizations such AA, Alanon, the Sewing and Embroiderer’s Guilds, Radio Control Club, and various music groups. Mother’s Day Out has been in continuous service to the children of Albuquerque since 1972. Asbury in best known for mission activities and the Asbury Cafe that opened its doors at the New Mexico State Fair in 1960. Proceeds from the cafe are distributed to local charities.",
  },
  {
    title: "Accessibility",
    content:
      "Asbury seeks to ensure inclusion of persons with disabilities in our church and worship activities. We have ADA Compliant wheelchair ramps into the building and maintain reserved areas in the main sanctuary for wheelchairs. Hearing assistance devices and large print bulletins are available from the ushers for worship services.",
  },
  {
    title: "Safe Sanctuaries",
    content:
      "At Asbury, we believe that the spiritual, emotional and physical well-being of children/youth is vital. Our Safe from Harm Policy is intended to ensure that church activities involving children, youth and vulnerable adults are consistent with the teaching and example of our Lord Jesus Christ, and with the Christian tradition of nurturing children, youth and vulnerable adults.",
  },
];
