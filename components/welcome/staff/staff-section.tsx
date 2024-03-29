import React from "react";
import StaffCard from "./staff-card";
const StaffSection = () => {
  return (
    <section id="staff" className="bg-gray-100 py-12">
      <div className="text-center text-seaFoam-500">
        <h1 className="text-4xl mt-8 uppercase tracking-widest">STAFF</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-12">
        {staffInfo.map((member) => (
          <StaffCard
            key={member.name}
            name={member.name}
            jobTitle={member.jobTitle}
            description={member.description}
            image={member.image}
            email={member.email}
          />
        ))}
      </div>
    </section>
  );
};

export default StaffSection;

export const staffInfo = [
  {
    name: "Rev. Joe Whitley",
    jobTitle: "Senior Pastor",
    description:
      "Joe is a native of Las Cruces and “cradle to grave” Methodist, who graduated from Pepperdine University, then Pepperdine School of Law. For 19 years, he was a civil trial attorney and also extensively involved in New Mexico and national politics. After clearly hearing God’s voice calling him into ministry, Joe graduated from Claremont School of Theology and began serving a United Methodist church in Los Angeles.",
    image: "/images/headshots/Joe-One.png",
    email: undefined,
  },

  {
    name: "Linda Brady",
    jobTitle: "Office Administrator",
    description:
      "Linda Brady acts as our office administrator, and is available to answer your questions via the contact form in the top right.",
    image: "/images/headshots/Linda-One.png",
    email: "officeadmin@asburyabq.org",
  },
  {
    name: "Richard Ramsay",
    jobTitle: "Building Manager",
    description:
      "Our building manager Richard has provided care and assistance at Asbury for years, and is responsible for the maintenance and care of our facilities. ",
    image: "/images/headshots/Richard-One.png",
    email: undefined,
  },
  {
    name: "Michele Walton",
    jobTitle: "Family Life Coordinator",
    description: "",
    email: "FamilyLife@asburyabq.org",
    image: "/images/headshots/Michele-One.jpg",
  },
];
