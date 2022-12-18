import { GetServerSideProps, NextPage } from 'next';
import React from 'react'
import ResetPasswordForm from '../../components/admin/reset-pass-form'
interface Props {
  token: string;
}
const PasswordRecovery: NextPage<Props> = ({ token }) => {
  return (
    <>
        <ResetPasswordForm token={token}/>
    </>
  )
}

export default PasswordRecovery

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const token = query.token;
    if (!token) {
      return {
        props: {},
        redirect: { destination: "/admin" },
      };
    }
    return {
        props: {
            token,
        }
    }
}