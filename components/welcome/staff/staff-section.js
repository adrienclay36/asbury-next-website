import React from "react";
import StaffCard from "./staff-card";
const StaffSection = () => {
  return (
    <section id="staff" className="bg-gray-100 py-12">
      <div className="text-center text-seaFoam-500">
        <h1 className="text-4xl mt-8 uppercase tracking-widest">STAFF</h1>
      </div>
      <div>
          {staffInfo.map(member => (
              <StaffCard key={member.name} name={member.name} jobTitle={member.jobTitle} description={member.description} image={member.image}/>
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
    image: "/images/headshots/headshot.png",
  },
  {
    name: "Kevin Chavez",
    jobTitle: "Traditional Music Director",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero adipisci commodi minima quidem dignissimos ad optio, quae obcaecati odit voluptates corrupti deserunt in, unde aspernatur. Alias in voluptatum amet repudiandae!",
    image: "/images/headshots/headshot2.jpg",
  },
];