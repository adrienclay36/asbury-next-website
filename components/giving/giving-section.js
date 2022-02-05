import React from "react";
import SectionHeading from "../ui/section-heading";
import GivingCard from "./giving-card";
import OnlineDropdown from './online-giving-dropdown/online-dropdown';
import GivingDropdown from "./giving-dropdown";
import StockDropdown from "./stock-dropdown/stock-dropdown";

const GivingSection = () => {
  return (
    <SectionHeading title="Giving">
      <GivingCard />
      <div className="sm:container grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 items-start mt-12">
        <OnlineDropdown
          title="Online Giving"
          content="Make an online donation, or set up recurring donations,
                via our secure PayPal merchant account by clicking below."
        />
        <GivingDropdown
          title="Automated Giving"
          content="Set up a recurring donation from a bank account, credit/debit card, or online bill pay.
                  Giving from bank accounts and card charges are drafted on the 2nd and 16th
                  of each month and conclude in December of each year.
                  Contact the church office for more information or to set up automatic giving."
        />
        <GivingDropdown
          title="By Check"
          content="Write a check payable to Asbury UMC and mail to:
                  10000 Candelaria Road NE
                  Albuquerque, New Mexico 87112"
        />
        <StockDropdown
          title="Stock or Mutual Funds"
          content="If you have securities (stocks, bonds, or mutual funds) that have accumulated long-term capital gains, you may want to consider donating   some of them to Asbury instead of writing a check. Click below to learn more."
        />
      </div>
    </SectionHeading>
  );
};

export default GivingSection;
