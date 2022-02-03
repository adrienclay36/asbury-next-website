import React from 'react';
import EventItem from './event-item';

const EventsHomePage = () => {
  return (
    <section>
      <div className="border-r-4 w-full h-full shadow-lg rounded-lg p-2">
        <h1 className="uppercase text-3xl text-center mb-2 border-b-2 py-2 pb-4">
          Events
        </h1>
        <ul>
          <EventItem
            date={"2/3/2022"}
            title={"A cool event"}
            timeframe={"1:00PM - 6:00PM"}
          />
          <EventItem
            date={"3/20/2022"}
            title={"another cool event"}
            timeframe={"4:00PM - 5:30PM"}
          />
          <EventItem
            date={"4/15/2022"}
            title={"another cool event"}
            timeframe={"4:00PM - 5:30PM"}
          />
        </ul>
      </div>
    </section>
  );
};

export default EventsHomePage;
