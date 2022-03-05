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
  const [invoices, setInvoices] = useState();
  const [noHistory, setNoHistory] = useState(false);

  const getInvoices = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      `/api/get-customer-invoices?customerID=${userContext.customerID}`
    );
    console.log(response);
    setInvoices(response.data.invoices);
    setLoading(false);
  }, [userContext.customerID]);

  useEffect(() => {
    if (userContext.customerID) {
      getInvoices();
    } else {
      setNoHistory(true);
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
  if(invoices){

    return (
      <SectionHeading title="Transaction History">
        <InvoiceList invoices={invoices} />
      </SectionHeading>
    );
  }

  return (
    <SectionHeading title="Transaction History">
      
    </SectionHeading>
  )
};

export default TransactionHistorySection;
