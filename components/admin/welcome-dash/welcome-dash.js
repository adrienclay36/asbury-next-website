import React, { useContext } from "react";
import WelcomeItem from "./welcome-item";
import { UserContext } from "../../../store/user-context";
import styles from './welcome-dash.module.css';
import Link from "next/link";
const WelcomeDash = ({ firstName }) => {
  const userContext = useContext(UserContext);
  return (
    <div className={`${styles.fade} container`}>
      <div>
        <h1 className="mt-12 text-2xl lg:text-4xl font-extrabold text-center">
          Hi there, {firstName}
        </h1>
        <h1 className="mt-12 text-xl lg:text-2xl font-extrabold text-center">
          Welcome To Your Asbury Admin Dashboard
        </h1>
        <Link href="/" passHref>
          <p className="mt-10 text-lg lg:text-xl font-extrabold text-center cursor-pointer hover:underline">Visit The Main Website</p>
        </Link>
      </div>
  

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-12">
        <WelcomeItem
          title="Bulletins"
          description="Create, update, and delete posts on the bulletins board."
          href="/admin/bulletins-dashboard"
          buttonText="Go to Bulletins Dashboard"
        />
        <WelcomeItem
          title="Librarian"
          description="Create, update, and delete book records for the library."
          href="/admin/library-dashboard"
          buttonText="Go to Librarian Dashboard"
        />
        <WelcomeItem
          title="Worship Services"
          description="Upload the weekly programs for visitors and add livestream links for the forwarded live stream."
          href="/admin/worship-service-dashboard"
          buttonText="Go to Service Dashboard"
        />
        {userContext.invitePermissions && (
          <WelcomeItem
            title="Add An Administrator"
            description="Add an administrator via email by giving them an email and a temporary password."
            href="/admin/add-admin"
            buttonText="Add Administrator"
          />
        )}
      </div>
    </div>
  );
};

export default WelcomeDash;
