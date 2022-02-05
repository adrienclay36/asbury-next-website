import React from "react";
import SectionHeading from "../ui/section-heading";
import GivingCard from "./giving-card";
import InfoDropdown from "../ui/info-dropdown/info-dropdown";
import SquareCard from "../ui/square-card/square-card";

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
        {givingItems.map((item) => (
          <InfoDropdown
            key={item.title}
            title={item.title}
            content={item.content}
            buttonText={item.buttonText}
            external={item.external}
            href={item.href}
          />
        ))}
      </div>
    </SectionHeading>
  );
};

export default GivingSection;


export const givingItems = [
  {
    title: "Online Giving",
    content:
      "Make an online donation, or set up recurring donations, via our secure PayPal merchant account by clicking below.",
    buttonText: "Paypal",
    href: "https://www.paypal.com",
    external: true,
  },
  {
    title: "Automated Giving",
    content:
      "Set up a recurring donation from a bank account, credit/debit card, or online bill pay. Giving from bank accounts and card charges are drafted on the 2nd and 16th of each month and conclude in December of each year. Contact the church office for more information or to set up automatic giving.",
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
    title: "Online Giving",
    content:
      "Make an online donation, or set up recurring donations, via our secure PayPal merchant account by clicking below.",
    buttonText: "Learn More",
    href: "/giving/security-donations",
    external: false,
  },
];
