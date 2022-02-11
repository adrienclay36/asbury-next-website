import React from 'react'
import ResetPasswordForm from '../../components/admin/reset-pass-form'
const PasswordRecovery = ({ token }) => {
  return (
    <>
        <ResetPasswordForm token={token}/>
    </>
  )
}

export default PasswordRecovery

export const getServerSideProps = async ({ query }) => {
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