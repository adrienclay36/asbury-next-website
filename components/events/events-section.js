import React from 'react'
import SectionHeader from '../ui/section-heading';
import Link from 'next/link';
const EventsSection = () => {

  return (
    <SectionHeader title="Events">
      <div className="flex flex-1 justify-center items-center bg-white w-11/12 p-0 lg:w-11/12 md:w-11/12 lg:p-10 md:p-10 mx-auto rounded-lg shadow-lg">

        <iframe
          src="https://calendar.google.com/calendar/embed?src=4ljcopth0tueaa6nt426kbb99ksvaqmv%40import.calendar.google.com&ctz=America%2FDenver"
          width="2000"
          height="600"

          scrolling="no"
        ></iframe>
      </div>
    </SectionHeader>
  );
}

export default EventsSection