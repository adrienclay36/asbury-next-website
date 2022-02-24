import React from "react";
import SectionHeading from "../../ui/section-heading";
import InfoCardDirectional from "../../giving/security-donations/info-card-directional";
import { BiBlanket } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import InfoCardVertical from "../../ui/info-card-vertical";
const PrayerQuiltSection = () => {
  return (
    <SectionHeading title="Prayer Quilt Ministry">
      <div className="container">
        <InfoCardDirectional
          title="Here's the idea"
          content="A prayer quilt is constructed and commissioned for an individual by a member of the congregation. Then the quilt is displayed on the kneeling rails for the traditional service, or in the Acts 2 contemporary service for the congregation to pray for the individual, then untie a bow and tie a knot. Each knot in the quilt represents a prayer said for that individual or family. The quilt is then given to the individual to be with them during treatments or difficult times, reminding them that many prayers are being said on their behalf."
          icon={<BiBlanket size={150} className="text-seaFoam-700" />}
        />
      </div>
      <h1 className="lg:text-4xl md:text-2xl text-xl text-center uppercase text-seaFoam-600 mt-20 mb-12">
        How To Request a Prayer Quilt
      </h1>
      <p className="text-lg text-center mt-16 leading-loose w-11/12 lg:w-3/6 md:w-5/6 mx-auto">
        Church members may request a quilt for friends or family. To request a
        prayer quilt contact the church office, who can be reached at{" "}
        <span className="text-seaFoam-600">(505) 299-0643</span> or by email at{" "}
        <a
          className="text-seaFoam-600"
          href="mailto:church@asburyabq.org"
          target="_blank"
          rel="noreferrer"
        >
          church@asburyabq.org
        </a>{" "}
        The church office is open Monday Thursday 9:00 am 4:30 pm. The requester
        is responsible for delivery to the recipient. We do not deliver quilts.
      </p>
      
      <InfoCardVertical
        icon={
          <AiOutlineCalendar className="my-12 text-seaFoam-700" size={150} />
        }
        title={"Prayer Quilt Meetings"}
        content={"The prayer quilt ministry meets Tuesday mornings at 9:30 AM in the Hospitality room for fellowship and group quilting activities. Check the Church Calendar for notes."}
      />
    </SectionHeading>
  );
};

export default PrayerQuiltSection;
