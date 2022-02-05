import React from "react";
import Layout from "../../components/layout/layout";
import SecuritySection from "../../components/giving/security-donations/security-sections";
import SecurityDiv from "../../components/giving/security-donations/security-fixed-image/security-div";
const SecurityDonations = () => {
  return <Layout title="Security Donations" description="A great way to give to Asbury is through security donations. This allows us to continue our mission and also provides you with a few tax benefits!">
      <SecuritySection/>
      <SecurityDiv/>
  </Layout>;
};

export default SecurityDonations;
