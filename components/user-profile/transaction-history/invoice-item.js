import React from "react";
import { FaFileDownload } from "react-icons/fa";
import Link from "next/link";
const InvoiceItem = ({
  id,
  accountName,
  amountPaid,
  created,
  pdfLink,
  status,
  periodStart,
  periodEnd,
  billingReason,
}) => {
  const chargeDate = new Date(created * 1000).toDateString();
  const chargeTime = new Date(created * 1000).toLocaleTimeString("en-US");
  const periodStartFormat = new Date(periodStart * 1000).toDateString();
  const periodEndFormat = new Date(periodEnd * 1000).toDateString();
  const headerClasses = "font-semibold text-lg mr-2 text-seaFoam-600";

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }
  const titleStatus = titleCase(status);

  let description;
  if (billingReason === "subscription_create") {
    description = `Automatic payment for subscription beginning ${periodStartFormat}`;
  } else {
    description = `One Time Charge made on ${periodStartFormat}`;
  }
  return (
    <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-between items-center border-2 p-4 rounded-lg shadow-md mb-6 text-center lg:text-left md:text-left">
      <div className="">
        <p className="mb-4">
          <span className={headerClasses}>Account Name:</span> {accountName}
        </p>
        <p className="mb-4">
          <span className={headerClasses}>Amount Paid:</span> $
          {amountPaid / 100}
        </p>
        <p className="mb-4">
          <span className={headerClasses}>Charge Date:</span> {chargeDate} at{" "}
          {chargeTime}
        </p>
        <p className="mb-4">
          <span className={headerClasses}>Status:</span> {titleStatus}
        </p>
        <p className="mb-4">
          <span className={headerClasses}>Description:</span>
          {description}
        </p>
      </div>
      <div className="p-4">
        <Link href={pdfLink} passHref>
          <FaFileDownload
            className="text-slate-500 cursor-pointer"
            size={100}
          />
        </Link>
      </div>
    </div>
  );
};

export default InvoiceItem;
