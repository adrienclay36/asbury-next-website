import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import { useRouter } from "next/router";
import {
  downloadImage,
  getPublicUrl,
  getSignedUrl,
  updateItemInTable,
} from "../supabase-util";
import axios from "axios";
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
  googleUser: false,
  recurringSubscription: false,
  subscriptionAmount: null,
  subscriptionID: "",
  customerID: "",
  setCustomerID: () => {},
  sendPushNotification: (userID, title, body, postID, type) => {},
});

const REDIRECT_URL = "http://localhost:3000";
// const REDIRECT_URL = "https://asbury-next-website.vercel.app/";

const UserContextProvider = (props) => {
  const [userValue, setUserValue] = useState();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [libraryPermissions, setLibraryPermissions] = useState(false);
  const [blogPermissions, setBlogPermissions] = useState(false);
  const [invitePermissions, setInvitePermissions] = useState(false);
  const [socialPermissions, setSocialPermissions] = useState(false);
  const [schedulePermission, setSchedulePermissions] = useState(false);
  const [externalAdmin, setExternalAdmin] = useState(false);
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [avatarPath, setAvatarPath] = useState("");
  const [googleUser, setGoogleUser] = useState(false);
  const [recurringSubscription, setRecurringSubscription] = useState(false);
  const [subscriptionAmount, setSubscriptionAmount] = useState(null);
  const [subscriptionID, setSubscriptionID] = useState("");
  const [customerID, setCustomerID] = useState("");

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
      setAvatarPath(userInfo.avatar_path);
      setAvatarURL(userInfo?.avatar_url);
      if (user.app_metadata.provider === "google") {
        const googleArray = user.user_metadata.full_name.split(" ");
        setFirstName(googleArray[0]);
        setLastName(googleArray[1]);
        if (
          googleArray[0] !== userInfo.first_name ||
          googleArray[1] !== userInfo.last_name
        ) {
          const { data, error } = await updateItemInTable(TABLE_NAME, user.id, {
            first_name: googleArray[0],
            last_name: googleArray[1],
          });
        }
      } else {
        setFirstName(userInfo.first_name);
        setLastName(userInfo.last_name);
        
      }
      if(!userInfo.customer_id) {
        await establishCustomer(userInfo);
      } else {
        
        setCustomerID(userInfo.customer_id);
      }

      if(userInfo.customer_id) {
        await getSubscriptionStatus(userInfo.customer_id);
      }

      if (permissions) {
        setPermissions(userInfo.permissions);
      } else {
        setPermissions(null);
      }
      setRole(userInfo.role);
      setTitle(userInfo.title);

  
      

      setLoading(false);
    }
  };
  const checkUser = async () => {
    const user = supabase.auth.user();
    if (user) {
      setUserValue(user);
      if (user.app_metadata.provider === "google") {
        setGoogleUser(true);
      }
      getPermissions(user);
    }
  };

  const logOutHandler = async () => {
    const { data, error } = await supabase.auth.signOut();
    router.reload();
  };


  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  };


  const establishCustomer = async (userInfo) => {
    const formatName = `${userInfo.first_name} ${userInfo.last_name}`
    const customerObject = {
      name: formatName,
      email: userInfo.email,
      userID: userInfo.id,
    }
    const response = await axios.post('/api/establish-new-customer', customerObject);
    console.log(response);
    setCustomerID(response.data.customerID);
  }



  const getSubscriptionStatus = async (id) => {
    const response = await axios.post("/api/get-user-subscriptions", {customerID: id});
    setRecurringSubscription(response.data.subscribed);
  }

 

  const signUpHandler = async (
    email,
    password,
    inputFirstName,
    inputLastName
  ) => {
    const { data: existingUser, error: noUser } = await supabase
      .from("users")
      .select()
      .match({ email });
    if (existingUser.length > 0) {
      return { status: "duplicate" };
    }
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { status: "error", error };
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
        await checkUser();
        return { status: "ok" };
      }
    }
  };

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

      const schedule = permissions.some((userRole) => ['scheduling', 'master'].includes(userRole));
      setSchedulePermissions(schedule);

      const external = permissions.some((userRole) => ['external'].includes(userRole));
      setExternalAdmin(external);
    }
  }, [permissions]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          checkUser();
          return;
        }
        if (event === "SIGNED_OUT") {
          checkUser();
          return;
        }
        if (event === "USER_DELETED") {
          checkUser();
          router.reload();
          return;
        }
        if (event === "PASSWORD_RECOVERY") {
          const hash = window.location.hash.substring(1);
          const query = new URLSearchParams(hash);
          const token = query.get("access_token");

          router.push(`/admin/password-recovery?token=${token}`);
        }
      }
    );

    checkUser();

    return () => {
      authListener.unsubscribe();
    };
  }, []);







  const sendPushNotification = async (userID, notificationTitle, body, postID, type) => {
    if (userValue.id !== userID) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .match({ id: userID });
      const token = data[0]?.push_token;
      

      if (token) {
        const response = await axios.post(
          "https://exp.host/--/api/v2/push/send",
          { title: notificationTitle, body, to: token, data: { postID, type: type } },
          {
            headers: {
              'Accept': "application/json",
              "Accept-Encoding": "gzip deflate",
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        return;
      }
    }
  };




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
    googleUser,
    recurringSubscription,
    subscriptionAmount,
    subscriptionID,
    customerID,
    sendPushNotification,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
