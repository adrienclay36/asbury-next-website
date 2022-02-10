import React from 'react';

const InfoCardDirectional = ({title, content, icon }) => {
  return (
    <div className="rounded-lg shadow-lg border-2">
      <h1 className="text-center mt-12 uppercase text-xl lg:text-3xl md:text-3xl text-seaFoam-600">
        {title}
      </h1>
      <div className="flex flex-1 w-full flex-col-reverse md:flex-row lg-flex-row justify-center items-center py-12 px-4 lg:px-12 md:px-12 mx-auto">
        <p className="text-lg text-center w-full mb-5 lg:w-6/12 lg:text-left: md:text-left mt-0 lg:mt-12 md:mt-12 lg:pl-12 leading-loose mx-auto">
          {content}
        </p>
        <div className="w-full lg:w-4/12 p-12 mx-auto lg:mb-5 md:mb-5 flex justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InfoCardDirectional;
