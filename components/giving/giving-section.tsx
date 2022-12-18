import React from "react";
import SectionHeading from "../ui/section-heading";

import InfoDropdown from "../ui/info-dropdown/info-dropdown";
import SquareCard from "../ui/square-card/square-card";
import GivingDropdown from "../ui/info-dropdown/giving-dropdown";

const GivingSection = () => {
  return (
    <SectionHeading title="Giving">
      <SquareCard
        title="Thank You"
        subtitle="From Asbury"
        content1="Thank you for considering a gift to Asbury United Methodist Church –
          Albuquerque. Your tithes, offerings and donations enable our church to
          fulfill its mission to love God and one another in Jesus Christ as we
          raise up a new generation of Christians."
        content2="In addition to donating in person during our Sunday worship services,
          you can also give in the following ways:"
      />

      <div className="sm:container grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 items-start mt-12">
        <GivingDropdown />

        {givingItems.map((item) => (
          <InfoDropdown
            key={item.title}
            title={item.title}
            content={item.content}
            buttonText={item.buttonText!}
            external={item.external}
            href={item.href!}
          />
        ))}
      </div>
    </SectionHeading>
  );
};

export default GivingSection;

export const givingItems = [
  {
    title: "Automated Giving",
    content:
      "Set up and manage recurring donations right from asburyabq.org! By creating an account, you will be able to set up recurring donations as well as view your transaction history.",
    buttonText: null,
    href: null,
    external: false,
  },
  {
    title: "By Check",
    content:
      "Write a check payable to Asbury UMC and mail to: 10000 Candelaria Road NE Albuquerque, New Mexico 87112",
    buttonText: null,
    href: null,
    external: false,
  },
  {
    title: "STOCK OR MUTUAL FUNDS",
    content:
      "If you have securities (stocks, bonds, or mutual funds) that have accumulated long-term capital gains, you may want to consider donating some of them to Asbury instead of writing a check.",
    buttonText: "Learn More",
    href: "/giving/security-donations",
    external: false,
  },
];
