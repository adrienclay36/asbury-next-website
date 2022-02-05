import React from 'react';
import InfoSection from './info-section';
import Image from 'next/image';
import SectionHeading from '../ui/section-heading';
const WelcomeSection = () => {
  return (
    <SectionHeading title="Welcome" subheading="Who We Are">
        <div className="sm:container grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 items-start mt-12">

      {info.map((item) => {
        return <InfoSection key={item.title} title={item.title} content={item.content}/>
      })}
        </div>
      </SectionHeading>

  )};

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
