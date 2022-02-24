import React from 'react'
import InfoCardVerticle from '../../ui/info-card-vertical';
import { GiPieSlice } from 'react-icons/gi';
const AboutView = () => {
  return (
    <div>
      <InfoCardVerticle
        icon={<GiPieSlice size={100} className="text-teal-900 mb-12" />}
        sizeProps={"text-lg lg:text-2xl md:text-2xl"}
        title="A UNIQUE TRADITION AT THE NEW MEXICO STATE FAIR"
        content="The Asbury Cafe began in the Goat Barn on the Fairgrounds in 1960 as an
                outreach of Asbury United Methodist Church. The founding church had only a
                few facilities, and its location at the eastern edge of Albuquerque, 10,000
                Candelaria NE was barren. The cafe began as an idea to benefit Asbury United
                Methodist Church's building fund. The specialty of homemade pie was the first
                menu item, and the church facilities took shape as the cafe prospered. In 1971
                the decision was made to donate 100% of all profit to local charities."
      />
      <div className="my-12">
          <h1></h1>
      </div>
    </div>
  );
}

export default AboutView