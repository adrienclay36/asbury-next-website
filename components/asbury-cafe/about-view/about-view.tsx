import React from 'react'
import InfoCardVerticle from '../../ui/info-card-vertical';
import NewsArticleList from './news-article-list';
import styles from './about-view.module.css';
import { GiPieSlice, GiBarn } from "react-icons/gi";
import Image from 'next/image';
import SectionHeading from '../../ui/section-heading';
import { useRouter } from 'next/router';
const AboutView = () => {
  const router = useRouter();
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
        buttonText="Learn More"
        onClick={() =>
          router.push(
            "https://jmnsjblfovgbschcmyzc.supabase.co/storage/v1/object/public/other-files/Cafe%20history--short.pdf?t=2022-09-23T13%3A02%3A36.289Z"
          )
        }
      />
      <div className="my-12">
        <h1 className="text-center text-lg font-semibold text-seaFoam-600 w-full lg:w-3/6 md:w-4/6 mx-auto">
          The Asbury Cafe is a mission of Asbury UMC and several other local
          churches. We operate only during the NM State Fair in September. All
          proceeds go to local charities that feed people.
        </h1>
      </div>

      <div className="container rounded-lg shadow-lg border-2 w-11/12 lg:w-full md:w-11/12">
        <h1 className="text-center mt-12 uppercase text-xl lg:text-3xl md:text-3xl text-seaFoam-600">
          History
        </h1>

        <div className="flex flex-1 w-full flex-col-reverse md:flex-col-reverse lg:flex-row justify-center items-center py-12  mx-auto">
          <p className="text-lg text-center w-full mb-5 lg:w-6/12 lg:text-left: md:text-left mt-0 lg:mt-12 md:mt-12 lg:pl-12 leading-loose mx-auto">
            The Asbury Cafe&apos;s reputation for good food and community
            outreach grew to such an extent that it stretched the resources of
            the single church. In 1987 St. Stephen&apos;s United Methodist
            Church joined forces with Asbury to expand the volunteer forces and
            supplement the outreach of the Cafe. In 1993 we were joined by St.
            John&apos;s United Methodist Church. These churches shared in the
            work involved with the cafe: picking and processing fruit, preparing
            pies, planning, and operating the cafe. In 2001, three more churches
            joined and by 2003 there were 11 churches working together that
            included United Methodists, Presbyterian, and Baptist churches. In
            the 1970s and 80s there were several charity organizations with
            booths at the NM State Fair. However, at present the Asbury Café is
            the only organization at the Fair that gives all profits to charity.
            Every penny of the profit goes to helping charities that feed the
            needy, and none of the proceeds of the cafe support the member
            churches.
          </p>
          <div className="w-full lg:w-4/12 mx-auto flex justify-center rounded-full shadow-lg mb-8 lg:mb-0 md:mb-0">
            <Image
              src="/images/pie-cafe.jpg"
              className={`rounded-full object-top object-cover`}
              width={1500}
              height={1500}
              alt="Asbury Cafe"
            />
          </div>
        </div>
      </div>

      <SectionHeading title="News Articles">
        <NewsArticleList />
      </SectionHeading>

      <div>
        <InfoCardVerticle
          icon={<GiBarn size={200} className="mb-12 text-seaFoam-600" />}
          sizeProps={"text-lg lg:text-2xl md:text-2xl"}
          title="Small Beginnings"
          content="The cafe now serves a greater number of fairgoers than ever! The menu includes
hamburgers and sodas in addition to the homemade pies that made the Cafe
famous. Annual sales now exceed 2000 pies, each homemade and donated to
the Café by the member churches. From a basic beginning of serving pie by the slice from the goat barn in 1960,
the Asbury Cafe has become a tremendous community outreach. The Asbury
Cafe is run completely by volunteers who desire to share the love of Christ in
action throughout our community. In addition to the more than 600 workers from
the various churches, the cafe is also assisted by volunteers from the charities
that it supports."
        />
      </div>
    </div>
  );
}

export default AboutView