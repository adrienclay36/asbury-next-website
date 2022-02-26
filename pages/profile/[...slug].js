import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { getUser } from "../../supabase-util";
import { supabase } from "../../supabase-client";
import UserProfileCard from "../../components/user-profile/user-profile-card";
import { useRouter } from "next/router";
import { UserContext } from "../../store/user-context";
import useGetUser from "../../hooks/useGetUser";

import SkeletonProfile from "../../components/ui/skeleton-profile";
const UserProfilePage = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [ID, setID] = useState(null);

  const { user, avatarURL, loadingAvatar } = useGetUser(ID);

  useEffect(() => {
    if (router.query.slug) {
      setID(router.query.slug[0]);
    }
  }, [router.query.slug]);

  useEffect(() => {
    if (!userContext.user) {
      router.push("/");
    }
  }, [userContext.user, router]);

  if (!user || !ID || userContext.loading) {
    return (
      <Layout title="Loading Profile">
        <SkeletonProfile />
      </Layout>
    );
  }

  return (
    <Layout title={`${userContext.firstName} ${userContext.lastName}`}>
      <UserProfileCard user={user} />
    </Layout>
  );
};

export default UserProfilePage;
