import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import { useRouter } from "next/router";
import { downloadImage, getPublicUrl, getSignedUrl, updateItemInTable } from "../supabase-util";
const TABLE_NAME = "users";
export const UserContext = createContext({
  user: null,
  permissions: [],
  loading: false,
  libraryPermissions: false,
  blogPermissions: false,
  invitePermissions: false,
  socialPermissions: false,
  role: "",
  checkUser: () => {},
  logOutHandler: () => {},
  signInWithGoogle: () => {},
  signUpHandler: (email, password, inputFirstName, inputLastName) => {},
  firstName: "",
  lastName: "",
  title: "",
  avatarURL: "",
  avatarPath: "",
});

const UserContextProvider = (props) => {
  const [userValue, setUserValue] = useState();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [libraryPermissions, setLibraryPermissions] = useState(false);
  const [blogPermissions, setBlogPermissions] = useState(false);
  const [invitePermissions, setInvitePermissions] = useState(false);
  const [socialPermissions, setSocialPermissions] = useState(false);
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [avatarPath, setAvatarPath] = useState('');

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
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select()
      .match({ id: user.id });
    if (data) {
      const userInfo = data[0];
      if(permissions){
        setPermissions(userInfo.permissions);
      } else {
        setPermissions(null);
      }
      setRole(userInfo.role);
      setFirstName(userInfo.first_name);
      setLastName(userInfo.last_name);
      setTitle(userInfo.title);

      const url = await downloadImage("avatars", userInfo.avatar_url);
      setAvatarPath(userInfo.avatar_url);
      setAvatarURL(url);

      setLoading(false);
    }
  };
  const checkUser = async () => {
    const user = await supabase.auth.user();
    if (user) {
      setUserValue(user);
      getPermissions(user);
    }
  };

  const logOutHandler = async () => {
    const { data, error } = await supabase.auth.signOut();
    console.log(data, error);
    await checkUser();
    router.reload();
  };

  const signInHandler = async (email, password) => {
    const { data, error } = await supabase.auth.signIn({ email, password })
    await checkUser();
  }

  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    }, { redirectTo: "http://localhost:3000"});

  }

  const signUpHandler = async (email, password, inputFirstName, inputLastName) => {
    const { data: existingUser, error:noUser } = await supabase.from('users').select().match({email});
    if(existingUser.length > 0){
      return { status: "duplicate" };
    }
    const { user, session, error } = await supabase.auth.signUp({ email, password });

    if(error) {
      return { status: "error", error};
    }

      const { data } = await supabase
        .from("users")
        .select()
        .match({ email: email });

      if (data) {
        const userInfo = data[0];
        const { data: successData, error: submitError } = await supabase
          .from("users")
          .update({
            first_name: inputFirstName,
            last_name: inputLastName,
          })
          .match({ id: userInfo.id });
        if (submitError) {
          return { status: "error", submitError };
        } else {
          return { status: "ok" };
        }
      }



    
}

  useEffect(() => {
    if (permissions) {
      const librarian = permissions.some((userRole) =>
        ["library", "master"].includes(userRole)
      );
      setLibraryPermissions(librarian);

      const blog = permissions.some((userRole) =>
        ["blog", "master"].includes(userRole)
      );
      setBlogPermissions(blog);

      const invite = permissions.some((userRole) =>
        ["invite", "master"].includes(userRole)
      );
      setInvitePermissions(invite);

      const social = permissions.some((userRole) =>
        ["social", "master"].includes(userRole)
      );
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
        if(event === "USER_DELETED") {
          logOutHandler();
        }
        if (event === "PASSWORD_RECOVERY") {
          const hash = window.location.hash.substring(1);
          const query = new URLSearchParams(hash);
          const token = query.get("access_token");

          router.push(`/admin/password-recovery?token=${token}`);
          return;
        }
        if (event === "USER_DELETED") {
          logOutHandler();
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
    signInWithGoogle,
    signUpHandler,
    role,
    firstName,
    lastName,
    title,
    avatarURL,
    avatarPath,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
