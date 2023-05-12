import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { getUser } from "../../supabase-util";
import { supabase } from "../../supabase-client";
import UserProfileCard from "../../components/user-profile/user-profile-card";
import { useRouter } from "next/router";
import { UserContext } from "../../store/user-context";
import useGetUser from "../../hooks/useGetUser";
import FinancialManagementSection from '../../components/user-profile/financial-management-section';
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
      <Layout description="Loading Profile" title="Loading Profile">
        <SkeletonProfile />
      </Layout>
    );
  }

  return (
    <Layout description="Your profile on Asbury UMC" title={`${userContext.firstName} ${userContext.lastName}`}>
      <UserProfileCard />
      {/* <FinancialManagementSection/> */}
    </Layout>
  );
};

export default UserProfilePage;
