import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '../supabase-client';
import { useRouter } from 'next/router';
const TABLE_NAME = 'users';
export const UserContext = createContext({
    user: null,
    permissions: [],
    loading: false,
    libraryPermissions: false,
    blogPermissions: false,
    invitePermissions: false,
})

const UserContextProvider = (props) => {
    const [userValue, setUserValue] = useState();
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [libraryPermissions, setLibraryPermissions] = useState(false);
    const [blogPermissions, setBlogPermissions] = useState(false);
    const [invitePermissions, setInvitePermissions] = useState(false);

    const router = useRouter();

    const handleAuthChange = async (event, session) => {
      await fetch("/api/auth", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      });
    };
    
    const getPermissions = async (user) => {
      const {data,  error} = await supabase.from(TABLE_NAME).select().match({id: user.id});
      if(data) {
        const userInfo = data[0];
        setPermissions(userInfo.permissions);
        

      }
    }
    const checkUser = async () => {
      const user = await supabase.auth.user();
      if (user) {
        setUserValue(user);
        getPermissions(user);
      }
    };


    useEffect(() => {
      if (permissions.length > 0) {
        const librarian = permissions.some((role) =>
          ["library", "master"].includes(role)
        );
        setLibraryPermissions(librarian);
        
        const blog = permissions.some((role) => ['blog', 'master'].includes(role));
        setBlogPermissions(blog);

        const invite = permissions.some((role) => ['invite', 'master'].includes(role));
        setInvitePermissions(invite);
      }
    }, [permissions]);

    useEffect(() => {
      setLoading(true);
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          handleAuthChange(event, session);
          if (event === "SIGNED_IN") {
            
            return;
          }
          if (event === "SIGNED_OUT") {
            
            return;
          }
          if (event === "PASSWORD_RECOVERY") {
            const hash = window.location.hash.substring(1);
            const query = new URLSearchParams(hash);
            const token = query.get("access_token");
            
            router.push(`/admin/password-recovery?token=${token}`);
            return;
          }
          if (event === "USER_DELETED") {
            
            router.push("/admin");
          }
        }
      );

      checkUser();
      setLoading(false);
      return () => {
        authListener.unsubscribe();
      };
    }, []);


    const contextValue = {
        user: userValue,
        permissions: permissions,
        loading: loading,
        libraryPermissions: libraryPermissions,
        blogPermissions,
        invitePermissions,
    }

  return (
    <UserContext.Provider value={contextValue}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider