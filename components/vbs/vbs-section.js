import React from "react";
import SectionHeading from "../ui/section-heading";
import InfoDropdown from "../ui/info-dropdown/info-dropdown";
import Image from "next/image";
import SquareCard from "../../components/ui/square-card/square-card";
const VBSSection = () => {
  return (
    <SectionHeading title="VBS Registration">
      <div className="flex flex-1 justify-center items-center">
        <Image
          className="self-center"
          src="/images/CokesburySurfShack.png"
          height={400}
          width={400}
          alt="VBS Registration"
        />
      </div>
      <SquareCard
        title="July 25th - July 29th"
        subtitle="8:30 AM - 11:30 AM"
        content1="8:30 AM Breakfast (Optional)"
        content2="11:30 AM Lunch (Optional)"
      />
      <div className="sm:container grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 items-start mt-12">
        <InfoDropdown
          title="Child Registration"
          content="Sign up a child participant for VBS!"
          buttonText="Child Registration Form"
          href="/vbs/child-registration"
        />
        <InfoDropdown
          title="Volunteer Registration"
          content="Help us out with VBS activities and more! Sign up to assists with day to day activities."
          buttonText="Volunteer Form"
          href="/vbs/volunteer-registration"
        />
      </div>
      <div className='container w-11/12 lg:w-2/6 md:w-2/6 mx-auto'>
        <InfoDropdown
          title="Downloads"
          content="Download and get involved with VBS related materials!"
          buttonText="View Downloads"
          href="/vbs/downloads"
        />
      </div>
    </SectionHeading>
  );
};

export default VBSSection;
