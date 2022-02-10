import React from "react";

const SquareCard = ({ title, subtitle, content1, content2}) => {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center mx-auto shadow-lg border-2 rounded-lg m-12 w-11/12 lg:w-2/6 md:11/12 py-10 px-8 lg:px-10 md:px-10">
      <h1 className="mx-10 text-2xl lg:text-3xl md:text-3xl uppercase text-seaFoam-700">{title}</h1>
      <p className="text-xl uppercase text-seaFoam-400 font-semibold my-4">
        {subtitle}
      </p>
      <div className="h-0.5 w-64 rounded-lg bg-gray-200 mx-10 my-5"></div>

      <div>
        <p className="py-4 text-center leading-loose">
          {content1}
        </p>
        {content2 && <p className="py-4 text-center leading-loose">
          {content2}
        </p>}
      </div>
    </div>
  );
};

export default SquareCard;
