import React from "react";
import { BsReceiptCutoff } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
const PaymentItem = ({
  amount,
  status,
  receiptEmail,
  receiptURL,
  descriptor,
  description,
  date,
}) => {
  const formatDate = new Date(date * 1000).toUTCString();

  
  const makeIconSmaller = useMediaQuery('(max-width: 900px)')
  return (
    <div className="flex flex-1 flex-col lg:flex-row md:flex-row text-center text-sm lg:text-lg md:text-md lg:text-left md:text-left justify-between items-center border-2 shadow-md rounded-md bg-white p-4 lg:p-10 md:p-10 mb-6">
      <div>
        <p className="mb-3">
          <span className="font-bold text-seaFoam-900 mr-3">Amount Paid:</span>{" "}
          ${amount / 100}
        </p>
        <p className="mb-3">
          <span className="font-bold text-seaFoam-900 mr-3">Status:</span>{" "}
          {status}
        </p>
        <p className="mb-3">
          <span className="font-bold text-seaFoam-900 mr-3">
            Receipt Email:
          </span>{" "}
          {receiptEmail}
        </p>
        <p className="mb-3">
          <span className="font-bold text-seaFoam-900 mr-3">Description:</span>{" "}
          {description ? description : "One Time Donation - Guest"}
        </p>
        <p className="mb-3">
          <span className="font-bold text-seaFoam-900 mr-3">Date:</span>{" "}
          {formatDate}
        </p>
        <p className="mb-3">
          <span className="font-bold text-seaFoam-900 mr-3">
            Statement Descriptor:
          </span>{" "}
          {descriptor}
        </p>
      </div>
      {!makeIconSmaller && <div>
        <Link href={receiptURL} passHref>
          <a rel="noreferrer" target="_blank">
            <BsReceiptCutoff
              className="text-seaFoam-600 text-center cursor-pointer"
              size={makeIconSmaller ? 45 : 75}
            />
          </a>
        </Link>
      </div>}
      {makeIconSmaller && <div>
        <Link href={receiptURL} passHref>
          <a className="hover:underline font-semibold text-gray-500" rel="noreferrer" target="_blank">
            Download Receipt
          </a>
        </Link>
      </div>}
    </div>
  );
};

export default PaymentItem;
