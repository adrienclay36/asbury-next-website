import React from 'react';
import Image from 'next/image';
const StaffCard = ({ name, jobTitle, description, image }) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center shadow-lg rounded-lg my-16 sm:w-3/6 mx-auto p-10">
      <div>
        <Image
          className="rounded-full shadow-lg"
          src={image}
          alt="Headshot"
          width={300}
          height={300}
        />
      </div>
      <div>
        <h1 className="text-3xl mt-6 text-seaFoam-600 sm:w-5/6 mx-auto">
          {name}
        </h1>
        <h1 className="text-xl mt-4 text-seaFoam-500 sm:w-5/6 mx-auto">
          {jobTitle}
        </h1>
        <p className="mt-4 sm:w-5/6 mx-auto leading-loose">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StaffCard;
