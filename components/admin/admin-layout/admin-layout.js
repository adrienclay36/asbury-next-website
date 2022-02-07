import React from 'react';
import AdminNavbar from '../admin-nav/navbar/admin-navbar';
import Head from 'next/head';
const AdminLayout = (props) => {
  return (<>
  <Head>
    <title>Asbury Admin</title>
  </Head>
  <div className="font-primaryFont">
      <AdminNavbar />
      {props.children}
  </div>
        </>
  );
};

export default AdminLayout;
