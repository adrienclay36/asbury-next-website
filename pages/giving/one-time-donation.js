import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import DonationSection from "../../components/giving/one-time-donation/donation-section";
import SkeletonPost from '../../components/ui/skeleton-post';
const DonationPlanHome = () => {
  const [publishableKey, setPublishableKey] = useState();

  const getKeys = async () => {
    const response = await axios.get("/api/keys");
    setPublishableKey(response.data.publishableKey);
  };

  useEffect(() => {
    getKeys();
  }, []);

  if (!publishableKey) {
    return (
      <Layout title="One Time Donation">
        <SkeletonPost/>
      </Layout>
    );
  }

  const stripe = loadStripe(publishableKey);

  return (
    <Elements stripe={stripe}>
      <Layout title="One Time Donation">
        <DonationSection/>
      </Layout>
    </Elements>
  );
};

export default DonationPlanHome;
