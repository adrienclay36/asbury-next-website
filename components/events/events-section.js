import React, { useEffect, useState } from "react";
import SectionHeader from "../ui/section-heading";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from "@fullcalendar/daygrid";
import PageLoading from '../PageLoading/PageLoading';
import axios from 'axios';

const EventsSection = () => {
  const [loading, setLoading] = useState(true);
  const eventObject = { googleCalendarId: process.env.NEXT_PUBLIC_CALENDAR_ID}

  // const fetchICS = async () => {
  //   const response = await axios.get(
  //     "/api/events"
  //   );

   

  //   console.log(response);
   
  // }

  // useEffect(() => {
  //   fetchICS();
  // }, [])
  
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200)

    return () => {
      clearTimeout(timeout);
    }
  }, [])

  

  const loadingDiv = (
    <div style={{height: "90vh"}} className="max-w-screen-lg mx-auto flex flex-1 items-center justify-center">
      <PageLoading/>
    </div>
  )

  const googleCal = (
    <FullCalendar
      plugins={[
        googleCalendarPlugin,
        listPlugin,
        dayGridPlugin,
        interactionPlugin,
      ]}
      googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
      initialView="listWeek"
      events={eventObject}
      selectable
      stickyHeaderDates={false}
      headerToolbar={{
        start: "title",
        end: "prev,next",
      }}
      eventClick={(event) => {
        window.open(event.url, "gcalevent", "width=700,height=600");
      }}
    />
  );


  return (
    <SectionHeader title="Events">
      <div className="w-full lg:w-5/6 md:w-5/6 mx-auto">
        {!loading  ? googleCal : loadingDiv}
      </div>
    </SectionHeader>
  );
};

export default EventsSection;
