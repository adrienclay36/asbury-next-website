import React from "react";
import { BsReceiptCutoff } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";
import { HiCheckCircle } from "react-icons/hi";
import { RiCloseCircleFill } from 'react-icons/ri';
import Link from 'next/link';
const PaymentItem = ({
  amount,
  status,
  receiptEmail,
  receiptURL,
  descriptor,
  description,
  date,
  refund,
}) => {
  const formatDate = new Date(date * 1000).toDateString();
  console.log(refund);
  let formatAmount;
  let formatDescription;
  if(refund) {
    formatAmount = `+$${amount/100}`;
    formatDescription = "Refund";
  } else {
    formatAmount = `$${amount / 100}`;
    formatDescription = descriptor === "ASBURY_METHODIST" ? "One Time Donation" : description;
    
  }

 

  const makeIconSmaller = useMediaQuery("(max-width: 900px)");
  return (
    <Link href={receiptURL} passHref>
      <a rel="noreferrer" target="_blank">

    <div className="flex flex-1 flex-col lg:flex-row md:flex-row hover:bg-gray-100 cursor-pointer text-center text-sm lg:text-lg md:text-md lg:text-left md:text-left justify-between items-center border-2 shadow-md rounded-md bg-white p-4 lg:p-10 md:p-10 mb-6">
      <div className="flex flex-1 flex-col lg:flex-row md:flex-row justify-center lg:justify-start md:justify-start items-center">
        {!refund ? <HiCheckCircle className="text-green-700 mb-4 lg:mb-0 md:mb-0" size={makeIconSmaller ? 30 : 50} /> : <RiCloseCircleFill size={makeIconSmaller ? 30 : 50} className="text-red-700"/>}
        
        <div className="ml-4">
          <p className="font-semibold text-seaFoam-600">{formatDate}</p>
          <p className="font-semibold">{descriptor}</p>
          <p className="font-semibold text-seaFoam-600">{formatDescription}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold">{formatAmount}</p>
      </div>
    </div>
      </a>
    </Link>
  );
};

export default PaymentItem;
