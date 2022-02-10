import React from 'react';

const ArtsCard = ({ title, timeframe, description, day }) => {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center mx-auto shadow-lg border-2 rounded-lg mt-20 sm:mt-24 mb-12 w-11/12 md:w-5/6 lg:w-5/6 py-10 px-4 lg:px-10 md:px-10">
      <h1 className="mx-10 text-xl lg:text-3xl md:text-3xl uppercase text-seaFoam-700 text-center">{title}</h1>
      <p className="text-md lg:text-2xl md:text-2xl uppercase text-seaFoam-400 font-semibold my-4 text-center">
        {day} Rehearsals
      </p>
      <div className="h-0.5 w-3/6 rounded-lg bg-gray-200 mx-10 my-5"></div>
      <hr/>
      <div>
        <p className="py-2 text-md lg:text-lg md:text-lg uppercase">{timeframe}</p>
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
