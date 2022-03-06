import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../store/user-context';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/layout';
import TransactionHistorySection from '../../components/user-profile/transaction-history/transaction-history-section';
const TransactionHistoryHome = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();


  useEffect(() => {
    if(!userContext.user) {
      router.push("/");
    }
  }, [userContext.user, router])


  
  return (
    <Layout title="Transaction History">
        <TransactionHistorySection/>
    </Layout>
  )
}

export default TransactionHistoryHome