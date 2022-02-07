import React from 'react';
import SectionHeading from '../../ui/section-heading';
import { useRouter } from 'next/router';
import HRThin from '../../ui/HRThin';
const SinglePostSection = ({ post }) => {
    const router = useRouter();
  return (
    <SectionHeading title="Blog">
      <div className="container lg:w-3/6 lg:w-4/6 mx-auto w-full my-12">
        <img className="object-cover w-full h-96" src={post.image} />
      </div>

      <div className="w-5/6 lg:w-3/6 mx-auto flex flex-1 justify-between items-center">
        <div>
          <h1 className="font-semibold uppercase text-xl my-4">{post.title}</h1>
          <h1 className="font-semibold uppercase text-lg text-seaFoam-700">
            {post.author}
          </h1>
        </div>
        <div>
          <h1 className="font-semibold uppercase text-seaFoam-600">
            {post.date}
          </h1>
        </div>
      </div>
      
      <div className="flex justify-center items-center">

      <HRThin/>
      </div>

      <div className="container mt-12 leading-loose w-11/12 lg:w-4/6 text-lg">
        <p className="whitespace-pre-line">{post.content}</p>
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
