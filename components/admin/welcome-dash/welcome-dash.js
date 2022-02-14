import React from 'react';
import WelcomeItem from './welcome-item';
const WelcomeDash = () => {
  return (
    <div className="container">
      <div className="flex flex-1 justify-center items-center">
        <h1 className="mt-12 text-2xl lg:text-4xl font-extrabold text-center">
          Welcome To Your Asbury Admin Dashboard
        </h1>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-12">
        <WelcomeItem
          title="Blog Operations"
          description="Create, update, and delete posts on the blog."
          href="/admin/blog-dashboard"
          buttonText="Go to Blog Dashboard"
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
        <WelcomeItem
          title="Add An Administrator"
          description="Add an administrator via email by giving them an email and a temporary password."
          href="/admin/add-admin"
          buttonText="Add Administrator"
        />
        <WelcomeItem
          title="Change Your Password"
          description="Change your admin login password"
          href="/admin/change-password"
          buttonText="Change Password"
        />
      </div>
    </div>
  );
};

export default WelcomeDash;
