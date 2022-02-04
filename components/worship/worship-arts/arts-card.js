import React from 'react';

const ArtsCard = ({ title, timeframe, description, day }) => {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center mx-auto shadow-lg border-2 rounded-lg mt-20 sm:mt-24 mb-12 sm:w-5/6 p-10">
      <h1 className="mx-10 text-3xl uppercase text-seaFoam-700">{title}</h1>
      <p className="text-xl uppercase text-seaFoam-400 font-semibold my-4">
        {day} Rehearsals
      </p>
      <div className="h-0.5 w-64 rounded-lg bg-gray-200 mx-10 my-5"></div>
      <div className="flex flex-1 justify-between">
        <p className="py-2 text-lg uppercase">{timeframe}</p>
      </div>
      <div>
        <p className="py-4 text-center leading-loose">
          {description}
        </p>
        <p className="text-center py-2 text-seaFoam-500">
            Directed by Kevin Chavez
        </p>
      </div>
    </div>
  );
};

export default ArtsCard;
