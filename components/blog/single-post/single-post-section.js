import React from 'react';
import SectionHeading from '../../ui/section-heading';
import { useRouter } from 'next/router';
import HRThin from '../../ui/HRThin';
const SinglePostSection = ({ post }) => {
  const { title, image, author, postcontent, postdate } = post;
  const formatDate = new Date(
    postdate.replace(/-/g, "/").replace(/T.+/, "")
  ).toLocaleDateString("en-US");
    const router = useRouter();
  return (
    <SectionHeading title="Blog">
      <div className="container lg:w-3/6 lg:w-4/6 mx-auto w-full my-12">
        <img className="object-cover w-full h-96" src={image} />
      </div>

      <div className="w-5/6 lg:w-3/6 mx-auto flex flex-1 flex-col lg:flex-row md:flex-row justify-between items-center text-center lg:text-left md:text-left">
        <div>
          <h1 className="font-semibold uppercase text-xl my-4">{title}</h1>
          <h1 className="font-semibold uppercase text-lg text-seaFoam-700">
            {author}
          </h1>
        </div>
        <div>
          <h1 className="font-semibold uppercase text-seaFoam-600">
            {formatDate}
          </h1>
        </div>
      </div>
      
      <div className="flex justify-center items-center">

      <HRThin/>
      </div>

      <div className="container mt-12 leading-loose w-11/12 lg:w-4/6 text-lg text-center lg:text-left md:text-left">
        <p className="whitespace-pre-line">{postcontent}</p>
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => router.push("/blog")}
          className="px-7 py-2 uppercase text-white bg-seaFoam-500 rounded-lg"
        >
          Back To All Posts
        </button>
      </div>
    </SectionHeading>
  );
};

export default SinglePostSection;
