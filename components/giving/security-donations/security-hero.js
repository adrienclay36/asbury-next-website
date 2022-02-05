import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { RiStockLine } from "react-icons/ri";
import { GiPocketWatch } from "react-icons/gi";
import InfoCardDirectional from "./info-card-directional";
const SecurityHero = () => {
  return (
    <div className="container">
      <div className="flex justify-center items-center">
        <AiOutlineStock className="text-seaFoam-700" size={150} />
      </div>

      <InfoCardDirectional
        title={"Advantages"}
        content="If you have securities (stocks, bonds, or mutual funds) that have
          accumulated long-term capital gains, you may want to consider donating
          some of them to Asbury instead of writing a check. There are two tax
          advantages in doing so. First, assuming you itemize deductions on your
          Form 1040, you may deduct the full market value on the date of the
          donation, and, second, you avoid paying any tax on the long-term
          capital gain. These advantages do not apply to U.S. savings bonds or
          to short-term (less than one year) gains."
        icon={<RiStockLine className="text-seaFoam-700" size={200} />}
      />

      <p className="text-lg text-center mt-16 leading-loose w-11/12 mx-auto">
        There is an IRS deduction ceiling of 30% of adjusted gross income for
        donated long-term securities in any one tax year (you can carry any
        excess over for next year’s return). Also, if your total non-cash
        donations exceed $500 for the year, you must fill out and file Section A
        of IRS Form 8283 with your tax return. Asbury cannot offer individual
        tax and legal advice, so you should consult your tax or legal advisor
        before making any decision regarding these items.
      </p>
      <div>
        <h1 className="text-center text-2xl mt-16">
          If you decide to make such a donation, you will fall into one of the
          following categories:
        </h1>
      </div>

      <div className="grid gap-20 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-20 text-center font-semibold">
        <div>
          <h1 className="text-6xl mb-4 text-seaFoam-600">1</h1>
          <p className="text-lg">
            You are currently a client of Morgan Stanley Smith Barney, as is
            Asbury. Sign a journal form to authorize your broker to move your
            shares to the Asbury account.
          </p>
        </div>
        <div>
          <h1 className="text-6xl mb-4 text-seaFoam-600">2</h1>
          <p className="text-lg">
            You have shares held at another brokerage firm. Contact your broker
            there to sign the appropriate forms. Some firms may require you to
            take possession of the stock certificate; if so, go to 3.
          </p>
        </div>
        <div>
          <h1 className="text-6xl mb-4 text-seaFoam-600">3</h1>
          <p className="text-lg">
            You have possession of the stock certificate or bond. Take it to
            Morgan Stanley Smith Barney and sign a security waiver to deposit it
            into Asbury’s account.
          </p>
        </div>
      </div>
      <div className="mt-12">
        <InfoCardDirectional
          title="Our Financial Advisor"
          content="Asbury’s Financial Advisor at Morgan Stanley Smith Barney is Don Friedman, telephone 505-889-2885 or 1-800-776-5973, and fax 505-889-2858. They  are located just south of Coronado at 6701 Uptown Blvd, Albuquerque, 87110.
        You also need to contact Asbury to get the security sold from Asbury’s account, designate the use of the proceeds, and obtain the proper IRS documentation from the church."
          icon={<FaRegBuilding className="text-seaFoam-700" size={175} />}
        />
      </div>
      <div className="mt-12">
        <InfoCardDirectional
          title="IRA Charitable Rollover"
          content="The budget legislation passed and signed into law in December 2015 resurrected permanently the IRA Charitable Rollover that was in effect 2006-2011 and 2013.

This provision allows taxpayers who are 70 1/2 or older to directly transfer any amount up to as much as $100,000 directly from an IRA (Traditional or Roth) to a qualified charity (like Asbury) each year without having any of the transferred amount counted as part of their adjusted gross income.

The transfer also can count toward the taxpayer’s annual Required Minimum Distribution (RMD). If you do this, the transferred amount will not be taxed, whereas if you simply take your RMD for yourself, it will be taxed along with all your other income. By lowering your adjusted gross income, you may even pay less tax on Social Security income. You don’t have to itemize deductions to get the tax savings; in fact, you cannot deduct the donated amount because it does not count as income. All it takes is a request to your IRA custodian to make a transfer directly to Asbury. Why not donate your annual MRD (or more if you can afford it) to Asbury under this provision and avoid paying income tax on it?"
          icon={<GiPocketWatch className="text-seaFoam-700" size={175} />}
        />
      </div>
    </div>
  );
};

export default SecurityHero;
