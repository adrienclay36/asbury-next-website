import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '../supabase-client';
import { useRouter } from 'next/router';
import { getSignedUrl } from '../supabase-util';
const TABLE_NAME = 'users';
export const UserContext = createContext({
    user: null,
    permissions: [],
    loading: false,
    libraryPermissions: false,
    blogPermissions: false,
    invitePermissions: false,
    socialPermissions: false,
    role: '',
    checkUser: () => {},
    logOutHandler: () => {},
    firstName: '',
    lastName: '',
    title: '',
    avatarURL: '',
})

const UserContextProvider = (props) => {
    const [userValue, setUserValue] = useState();
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [libraryPermissions, setLibraryPermissions] = useState(false);
    const [blogPermissions, setBlogPermissions] = useState(false);
    const [invitePermissions, setInvitePermissions] = useState(false);
    const [socialPermissions, setSocialPermissions] = useState(false);
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [avatarURL, setAvatarURL] = useState('');

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
        setRole(userInfo.role);
        setFirstName(userInfo.first_name);
        setLastName(userInfo.last_name);
        setTitle(userInfo.title);
        const userImage = await getSignedUrl('avatars', `${userInfo.id}/${userInfo.id}_avatar.jpg`)
        setAvatarURL(userImage ? userImage : '/images/default-2.png');
        
        setLoading(false);
      }
    }
    const checkUser = async () => {
      const user = await supabase.auth.user();
      if (user) {
        setUserValue(user);
        getPermissions(user);
      }
    };

    const logOutHandler = async () => {
      const { data, error} = await supabase.auth.signOut();
      console.log(data, error);
      await checkUser();
      router.reload();
    }


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

        const social = permissions.some((role) => ['social', 'master'].includes(role));
        setSocialPermissions(social);
      }
    }, [permissions]);

    useEffect(() => {
      
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
      
      return () => {
        authListener.unsubscribe();
      };
    }, []);


    const contextValue = {
        user: userValue,
        permissions,
        loading,
        libraryPermissions,
        blogPermissions,
        invitePermissions,
        socialPermissions,
        checkUser: checkUser,
        logOutHandler: logOutHandler,
        role,
        firstName,
        lastName,
        title,
        avatarURL,
    }

  return (
    <UserContext.Provider value={contextValue}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider