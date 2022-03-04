import React, { useEffect, useState, useContext } from "react";
import Layout from '../../../components/layout/layout';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import NewSubscription from "../../../components/user-profile/subscriptions/new-subscription";
import SkeletonPost from "../../../components/ui/skeleton-post";
import { UserContext } from "../../../store/user-context";
import { useRouter } from "next/router";
const ManageDonationsHome = () => {
  const userContext = useContext(UserContext);
  const [publishableKey, setPublishableKey] = useState();
  const router = useRouter();

  const getKeys = async () => {
    const response = await axios.get("/api/keys");
    setPublishableKey(response.data.publishableKey);
  };

  useEffect(() => {
    if(!userContext.user) {
      router.replace("/");
    } else {

      getKeys();

    }
  }, [userContext.user, router]);

  if (!publishableKey) {
    return (
      <Layout title="One Time Donation">
        <SkeletonPost />
      </Layout>
    );
  }

  const stripe = loadStripe(publishableKey);

  return (
    <Elements stripe={stripe}>
      <Layout title="New Recurring Donation">
        <NewSubscription />
      </Layout>
    </Elements>
  );
};

export default ManageDonationsHome;
