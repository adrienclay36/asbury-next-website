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
          title="Weekly Programs"
          description="Upload the weekly programs for visitors to scan into on their phones"
          href="/admin/programs-dashboard"
          buttonText="Go to Programs Dashboard"
        />
      </div>
    </div>
  );
};

export default WelcomeDash;
