import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../supabase-client';
export const useSupaBaseAuth = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const fetchProfile = async () => {
      const userData = await supabase.auth.user();

      if (!userData) {
        router.push("/admin");
      } else {
        setUser(userData);
      }
    };

    useEffect(() => {
      fetchProfile();
    }, [user]);

    return user;
    
}