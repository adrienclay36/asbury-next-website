import React from 'react'
import SectionHeader from '../ui/section-heading';
import Link from 'next/link';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
const EventsSection = () => {

  return (
    <SectionHeader title="Events">
      <div className="w-5/6 mx-auto">

      <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} selectable />
      </div>
    </SectionHeader>
  );
}

export default EventsSection