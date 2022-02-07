import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/admin-layout/admin-layout';
import WelcomeDash from '../../components/admin/welcome-dash/welcome-dash';
const AdminDashboard = () => {
    const router = useRouter();
    const [user, setUser] = useState();

    const logoutHandler = async () => {
        await signOut(auth);
        router.replace("/admin");
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser) {
                router.push("/admin");
                return;
            }

            setUser(currentUser);
        })
        return unsubscribe;
    },[user])

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
