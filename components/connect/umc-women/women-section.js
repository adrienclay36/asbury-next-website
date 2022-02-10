import React from "react";
import SectionHeading from "../../ui/section-heading";
import Image from "next/image";
import InfoCardDirectional from "../../giving/security-donations/info-card-directional";
import { RiWomenLine } from 'react-icons/ri';
import HRThin from "../../ui/HRThin";
const WomenSection = () => {
  return (
    <SectionHeading title="UMC Women">
      <div className="container">
        <div className="flex flex-1 justify-center items-center mb-24">
          <Image
            src="/images/umw.png"
            alt="UMW Logo"
            height={300}
            width={540}
          />
        </div>
        <div className="my-12">
          <InfoCardDirectional
            title="UMW Purpose"
            content="The organized unit of United Methodist Women shall be a community of women whose PURPOSE is to know God and to experience freedom as whole persons through Jesus Christ; to develop a creative, supportive fellowship; and to expand concepts of mission through participation in the global ministries of the church."
            icon={<RiWomenLine size={150} className="text-seaFoam-700" />}
          />
        </div>

        <h1 className="text-4xl text-center uppercase text-seaFoam-600 mt-20 mb-12">
          Asbury UMW Meetings
        </h1>
        <p className="text-lg text-center mt-16 leading-loose w-11/12 mx-auto">
          Asbury´s UMW unit meets monthly, alternating between the first
          Thursday at 9:00 AM and the first Sunday at 12:30 PM. A light luncheon
          is provided at Sunday meetings. Meetings include social time and
          programs on various topics.
        </p>
        <p className="text-lg text-center mt-16 leading-loose w-11/12 mx-auto">
          Besides being part of the at-large group, members can join circles
          that meet in members&apos; homes or at the church.
        </p>
        <p className="text-xl font-semibold text-seaFoam-500 mx-auto text-center mt-12 mb-20 uppercase">
          There are three current Asbury UMW circles:
        </p>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mb-14 text-center font-semibold mt-14">
          <div>
            <h1 className="text-2xl lg:text-3xl md:text-3xl text-seaFoam-600 mb-4">
              Elizabeth Circle
            </h1>
            <hr className="w-3/6 mx-auto" />
            <p className="text-lg p-6">
              Meets the third Tuesday of each month at 9:30 AM.
            </p>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl md:text-3xl text-seaFoam-600 mb-4">
              Hannah Circle
            </h1>
            <hr className="w-3/6 mx-auto" />
            <p className="text-lg p-6">
              Meets the third Tuesday of each month at 7:15 PM.
            </p>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl md:text-3xl text-seaFoam-600 mb-4">
              Ruth Circle
            </h1>
            <hr className="w-3/6 mx-auto" />
            <p className="text-lg p-6">
              Meets the third Thursday of the month at 9:30 AM.
            </p>
          </div>
        </div>
      </div>
    </SectionHeading>
  );
};

export default WomenSection;
