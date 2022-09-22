import React from "react";
import Layout from "../components/layout/layout";
import SectionHeading from "../components/ui/section-heading";
import SquareCard from "../components/ui/square-card/square-card";
import { GiPartyPopper } from "react-icons/gi";

const CelebrationSixtyFive = () => {
  const content = (
    <>
      <ul className="list-disc list-inside">
        <li className="text-left mb-4 font-semibold">
          The celebration starts with an all-church service in the Main
          Sanctuary at 11 am on Sunday. (Please note: There will be no 8:30 am
          service on this day.){" "}
        </li>
        <li className="text-left mb-4 font-semibold">
          The party continues with an All-Church Potluck in the West Hall.
          Asbury will provide drinks, some meat and birthday cake. Please bring
          a main dish or salad to share.{" "}
        </li>
        <li className="text-left mb-4 font-semibold">
          Memorabilia from Asbury’s past, including UMW and youth activities,
          will be on display outside the sanctuary, and again in the West Hall.{" "}
        </li>
        <li className="text-left mb-4 font-semibold">
          Post-potluck, we’ll enjoy a short program including special guests,
          music, fun and highlights from Asbury’s history.{" "}
        </li>
      </ul>
      <p>
        If you arrive at church on the 25th and have forgotten to bring a dish,
        <i> come anyway!</i> You know how Methodist potlucks are. There
        is always enough food!
      </p>
    </>
  );
  const subtitle = (
    <>
      <p>
        Preparations continue for this milestone observance on Sunday, Sept. 25,
        where we will celebrate the 65th anniversary of Asbury&apos;s building
        dedication.
      </p>
      <br/>
      <p className="w-11/12 mx-auto">
        Bonus milestone: Asbury&apos;s Mothers Day Out is celebrating its 50th
        anniversary, too!
      </p>
    </>
  );
  return (
    <Layout
      title="65th Anniversary Celebration"
      description="Join us on Sunday, Sept. 25, where we will celebrate the 65th anniversary of Asbury’s building dedication"
    >
      <SectionHeading title="65th Anniversary Celebration">
        <SquareCard
          title="Join Us September 25th"
          content1={subtitle}
          content2={content}
        />
      </SectionHeading>
    </Layout>
  );
};

export default CelebrationSixtyFive;
