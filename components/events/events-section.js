import React, { useEffect, useState } from "react";
import SectionHeader from "../ui/section-heading";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import PageLoading from '../PageLoading/PageLoading';
const EventsSection = () => {
  const [loading, setLoading] = useState(true);
  const eventObject = { googleCalendarId: process.env.NEXT_PUBLIC_CALENDAR_ID}
  
  
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
          plugins={[googleCalendarPlugin, dayGridPlugin, interactionPlugin]}
          googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_API}
          events={eventObject}
          selectable
        />
  )


  return (
    <SectionHeader title="Events">
      <div className="w-5/6 mx-auto">
        {!loading  ? googleCal : loadingDiv}
      </div>
    </SectionHeader>
  );
};

export default EventsSection;
