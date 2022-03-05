import React from 'react'
import Layout from '../../components/layout/layout';
import TransactionHistorySection from '../../components/user-profile/transaction-history/transaction-history-section';
const TransactionHistoryHome = () => {
  return (
    <Layout title="Transaction History">
        <TransactionHistorySection/>
    </Layout>
  )
}

export default TransactionHistoryHome