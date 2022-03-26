import React, { useEffect, useContext, useState, useCallback } from "react";
import SectionHeading from "../../ui/section-heading";
import { UserContext } from "../../../store/user-context";
import { useRouter } from "next/router";
import SkeletonPost from "../../ui/skeleton-post";
import InvoiceList from "./invoice-list";
import axios from "axios";
const TransactionHistorySection = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState();


  const getInvoices = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      `/api/get-customer-invoices?customerID=${userContext.customerID}`
    );
    const filteredPayments = response.data.payments.filter(
      (payment) => payment.status === "succeeded"
    );
    setPayments(filteredPayments);
    setLoading(false);
  }, [userContext.customerID]);

  useEffect(() => {
    if (userContext.customerID) {
      getInvoices();
    }
  }, [userContext.customerID, router, getInvoices]);


  if (loading) {
    return (
      <SectionHeading title="Transaction History">
        <div className="w-11/12 mx-auto">
          <SkeletonPost />
        </div>
      </SectionHeading>
    );
  }


  if(!userContext.customerID) {
    return (
      <SectionHeading title="Transaction History" subheading="No Transactions To Show">

      </SectionHeading>
    )
  }
  if(payments){

    return (
      <SectionHeading title="Transaction History">
        <InvoiceList payments={payments} />
      </SectionHeading>
    );
  }

  return (
    <SectionHeading title="Transaction History">
      
    </SectionHeading>
  )
};

export default TransactionHistorySection;
