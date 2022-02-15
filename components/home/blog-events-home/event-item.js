import React from 'react';
import { getDateInfo } from "../../../utils/dates";
import Link from 'next/link';
const EventItem = ({ date, title, start, end}) => {
  console.log(typeof(start));
    const { day, monthText } = getDateInfo(date);
    const startTime = new Date(start);
    const endTime = new Date(end);

    function formatDate(inputDate) {
      var hours = inputDate.getUTCHours();
      var minutes = inputDate.getUTCMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime
    }

    const formatStart = formatDate(startTime);
    const formatEnd = formatDate(endTime);
    
    


   
    
  return (
    <Link href="/events" passHref>
    <div className=" cursor-pointer border-b-2 mb-3 flex flex-1 py-2 pb-3 px-1">
      {/* Date */}
      <div className="h-24 w-24 flex justify-start text-center flex-col border-2 p-4 rounded-full">
        <h1 className="text-2xl uppercase">{day}</h1>
        <p className="uppercase">{monthText}</p>
      </div>
      <div className="ml-8 mt-2">
        <h1 className="uppercase font-semibold text-seaFoam-800 lg:text-lg md:text-lg">
          {title.length > 20 ? title.slice(0,28) + "..." : title}
        </h1>
        <h1 className="uppercase font-semibold text-seaFoam-600 text-md mt-4">
          {formatStart} - {formatEnd}
        </h1>
      </div>
    </div>
    </Link>
  );
};

export default EventItem;
