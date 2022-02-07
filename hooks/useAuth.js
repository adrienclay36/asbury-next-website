import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
export const useAuth = (authToken) => {
    const router = useRouter();
    const [user, setUser] = useState()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(authToken, (currentUser) => {
        if (!currentUser) {
          router.push("/admin");
          return;
        }

        setUser(currentUser);
      });
      return unsubscribe;
    }, [user]);

    return user;


};


