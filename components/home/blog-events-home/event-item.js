import React from 'react';
import { getDateInfo } from "../../../utils/dates";
import Link from 'next/link';
const EventItem = ({ date, title, timeframe}) => {
    const { day, monthText } = getDateInfo(date);
  return (
    <Link href="/eventID" passHref>
    <div className=" cursor-pointer border-b-2 mb-3 flex flex-1 py-2 pb-3 px-1">
      {/* Date */}
      <div className=" h-24 w-24 flex justify-start text-center flex-col border-2 p-4 rounded-full">
        <h1 className="text-2xl uppercase">{day}</h1>
        <p className="uppercase">{monthText}</p>
      </div>
      <div className="ml-8 mt-2">
        <h1 className="uppercase font-semibold text-seaFoam-800 text-xl">
          {title}
        </h1>
        <h1 className="uppercase font-semibold text-seaFoam-600 text-md mt-4">
          {timeframe}
        </h1>
      </div>
    </div>
    </Link>
  );
};

export default EventItem;
