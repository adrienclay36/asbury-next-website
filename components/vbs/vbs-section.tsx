import React from "react";
import SectionHeading from "../ui/section-heading";
import InfoDropdown from "../ui/info-dropdown/info-dropdown";
import Image from "next/image";
import SquareCard from "../ui/square-card/square-card";
import AsburyButton from '../ui/AsburyButton';
import { supabase } from "../../supabase-client";
import { useRouter } from "next/router";
const VBSSection = () => {
  const router = useRouter();

  const downloadPDF = async () => {
    const { data, error } = await supabase.storage.from('vbs-files/2023').download('vbs.pdf');
    const url = URL.createObjectURL(data!);
    const a = document.createElement('a');
    a.href = url;
    a.rel = 'noreferrer';
    a.target = '_blank';
    a.download = 'VBS-2023.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  return (
    <SectionHeading title="VBS Registration">
      <div className="container flex flex-1 flex-col justify-center items-center">
  
        <img src="/images/VBS-2023.png" className="w-2/6 mb-4"/>
        <AsburyButton onClick={downloadPDF} text="PDF Download"/>
        </div>
      <SquareCard
        title="VBS Registration Open Now"
        subtitle="July 24th - July 28th"
        content1="9:00 AM - 12:00 PM"
      />
      {/* <SquareCard
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
        /> */}
    </SectionHeading>
  );
};

export default VBSSection;
