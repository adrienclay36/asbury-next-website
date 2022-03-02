import React, { useEffect, useContext } from 'react'
import Layout from '../../../components/layout/layout'
import { useRouter } from 'next/router'
import { UserContext } from '../../../store/user-context';
const ManageDonations = () => {
    const router = useRouter();
    const userContext = useContext(UserContext);



    useEffect(() => {
        if(!userContext.user) {
            router.replace("/");
        }
    }, [userContext.user])
    
  return (
      <Layout title="Manage Recurring Donations">

    <div>{userContext.firstName}</div>
      </Layout>
  )
}

export default ManageDonations