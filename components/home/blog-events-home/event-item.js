import React from 'react';
import { getDateInfo } from "../../../utils/dates";
import Link from 'next/link';
const EventItem = ({ date, title, timeframe, start, end}) => {
    const { day, monthText } = getDateInfo(date);
    const startTime = new Date(start).toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', timeZone: "America/Denver"});
    const endTime = new Date(end).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Denver"
    });
    console.log(startTime);
  return (
    <Link href="/events" passHref>
    <div className=" cursor-pointer border-b-2 mb-3 flex flex-1 py-2 pb-3 px-1">
      {/* Date */}
      <div className="h-24 flex justify-start text-center flex-col border-2 p-4 rounded-full">
        <h1 className="text-2xl uppercase">{day}</h1>
        <p className="uppercase">{monthText}</p>
      </div>
      <div className="ml-8 mt-2 max-h-24">
        <h1 className="uppercase font-semibold text-seaFoam-800 text-lg">
          {title}
        </h1>
        <h1 className="uppercase font-semibold text-seaFoam-600 text-md mt-4">
          {startTime} - {endTime}
        </h1>
      </div>
    </div>
    </Link>
  );
};

export default EventItem;
