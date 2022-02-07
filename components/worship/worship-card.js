import React from 'react';
const WorshipCard = () => {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center mx-auto shadow-lg border-2 rounded-lg m-12 w-11/12 lg:w-2/6 md:w-11/12 p-10">
      <h1 className="mx-10 text-3xl uppercase text-seaFoam-700">Traditional</h1>
      <p className="text-xl uppercase text-seaFoam-400 font-semibold my-4">
        Sundays
      </p>
      <div className="h-0.5 w-64 rounded-lg bg-gray-200 mx-10 my-5"></div>
      <div className="flex flex-1 justify-between items-center">
        <p className="py-2 text-lg uppercase">8:30am</p>
        <p className="py-2 text-2xl uppercase mx-12 mb-1 text-seaFoam-400">&</p>
        <p className="py-2 text-lg uppercase">11:00am</p>
      </div>
      <div>
        <p className="py-4 text-center leading-loose">
          Holy Communion is held the first Sunday of each month. The Christian
          sacrament of Holy Communion is an opportunity for Christians to renew
          their commitment to Christ and receive inspiration for their walk with
          the Lord. Special worship services are held periodically in relation
          to Christian holidays. There is a children’s worship time with the
          pastor.
        </p>
      </div>
    </div>
  );
};

export default WorshipCard;
