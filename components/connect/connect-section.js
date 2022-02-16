import React from 'react';
import SectionHeading from '../ui/section-heading';
import InfoDropdown from '../ui/info-dropdown/info-dropdown';
import SquareCard from '../ui/square-card/square-card';
const ConnectSection = () => {
  return (
    <SectionHeading title="Connect">
      <SquareCard
        title="Get Involved"
        subtitle="At Asbury"
        content1="We offer many ways to study the word of God, gearing classes towards all-ages. Please contact the office for specific schedule information."
      />
      <div className="container grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 items-start">
        <InfoDropdown
          title="United Methodist Women"
          content="The organized unit of United Methodist Women shall be a community of women whose PURPOSE is to know God and to experience freedom as whole persons through Jesus Christ; to develop a creative, supportive fellowship; and to expand concepts of mission through participation in the global ministries of the church."
          buttonText="Learn More"
          href={"/connect/umc-women"}
          external={false}
        />
        <InfoDropdown
          title="Prayer Quilt Ministry"
          content="Asbury’s Prayer Quilt Ministry began in 2003 when Sheri Crabtee’s husband, Rick, was diagnosed with cancer. Their home church, Maumee United Methodist in Maumee, OH, requested a prayer quilt be sent to them. It meant so much, Sheri started the prayer quilt ministry at Asbury in hopes of reaching out to those in need at our church."
          buttonText="Learn More"
          href={"/connect/prayer-quilt-ministry"}
          external={false}
        />
      </div>
    </SectionHeading>
  );
};

export default ConnectSection;
