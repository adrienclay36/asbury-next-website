import React, { useEffect, useState } from 'react';
import EventItem from './event-item';
import axios from 'axios';
import Link from 'next/link';
import PageLoading from '../../PageLoading/PageLoading';
const EventsHomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchICS = async () => {
    setLoading(true);
    const response = await axios.get(
      "/api/events"
    );
    setEvents(response.data.events.slice(0, 6));
    setLoading(false);

  }

  useEffect(() => {
    fetchICS();
  }, [])

  return (
    <section>
      <div className="border-r-4 w-full h-full shadow-lg rounded-lg p-2">
        <Link href="/events" passHref>
        <h1 className="uppercase text-3xl text-center mb-2 border-b-2 py-2 pb-4 cursor-pointer">
          Events
        </h1>
        </Link>
        {!loading && <ul>
          {events.map((event) => (
            <EventItem
              key={event.id}
              date={event.date}
              start={event.start}
              end={event.end}
              title={event.summary}
              timeframe={"1:00PM - 6:00PM"}
            />
          ))}
        </ul>}
        {
          loading && <PageLoading/>
        }
      </div>
    </section>
  );
};

export default EventsHomePage;
