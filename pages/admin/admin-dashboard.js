import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/admin-layout/admin-layout';
import WelcomeDash from '../../components/admin/welcome-dash/welcome-dash';
import { useAuth } from '../../hooks/useAuth';
const AdminDashboard = () => {
    const router = useRouter();
    

    const logoutHandler = async () => {
        await signOut(auth);
        router.replace("/admin");
    }

    const user = useAuth(auth);
    

    if(!user) {
        return null;
    }

  return (
     <AdminLayout>
         <WelcomeDash/>
     </AdminLayout>
  );
};

export default AdminDashboard;
