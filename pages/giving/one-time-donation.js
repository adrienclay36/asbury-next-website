import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import OneTimeStripeCheckout from "../../components/giving/one-time-donation/one-time-stripe-checkout";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
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
        <p>Loading...</p>
      </Layout>
    );
  }

  const stripe = loadStripe(publishableKey);

  return (
    <Elements stripe={stripe}>
      <Layout title="One Time Donation">
        <OneTimeStripeCheckout />
      </Layout>
    </Elements>
  );
};

export default DonationPlanHome;
