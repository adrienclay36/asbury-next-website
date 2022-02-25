import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout/layout';
import { getUser } from '../../supabase-util';
import { supabase } from '../../supabase-client';
import UserProfileCard from '../../components/user-profile/user-profile-card';
import { useRouter } from 'next/router';
import { UserContext } from '../../store/user-context';
const UserProfilePage = ({ user }) => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  useEffect(() => {
    if(!userContext.user) {
      router.push("/");
    }
  },[userContext.user, router])
  return (
    <Layout title={`${userContext.firstName} ${userContext.lastName}`}>
        <UserProfileCard user={user}/>
    </Layout>
  )
}

export default UserProfilePage

export const getStaticPaths = async () => {
  const { data } = await supabase.from("users").select();

  const paths = data.map((item) => ({
    params: { slug: [item.id.toString(), `${item.firstName}-${item.lastName}`] },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};


export const getStaticProps = async (context) => {

    const userID = context.params.slug[0];
    const user = await getUser(userID);

    return {
        props: {
            user: user,
        },
        revalidate: 10,
    }
}