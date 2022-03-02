import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { getUser } from "../../supabase-util";
import { supabase } from "../../supabase-client";
import UserProfileCard from "../../components/user-profile/user-profile-card";
import { useRouter } from "next/router";
import { UserContext } from "../../store/user-context";
import useGetUser from "../../hooks/useGetUser";
import ManageDonationsSection from "../../components/user-profile/manage-donations-section";
import SkeletonProfile from "../../components/ui/skeleton-profile";
const UserProfilePage = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);


  useEffect(() => {
    if (!userContext.user) {
      router.push("/");
    }
  }, [userContext.user, router]);

  if (userContext.loading) {
    return (
      <Layout title="Loading Profile">
        <SkeletonProfile />
      </Layout>
    );
  }

  return (
    <Layout title={`${userContext.firstName} ${userContext.lastName}`}>
      <UserProfileCard />
      <ManageDonationsSection/>
    </Layout>
  );
};

export default UserProfilePage;
