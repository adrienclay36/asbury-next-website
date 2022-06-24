import { Modal } from "@mantine/core";
import React, { useContext, useState } from "react";
import { ScheduleContext } from "../../../../store/scheduling-store";
import AsburyButton from "../../../ui/AsburyButton";
import AddEntryForm from "./add-entry-form";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
const MasterSchedule = () => {
  const [openAddEntry, setOpenAddEntry] = useState(false);
  const scheduleContext = useContext(ScheduleContext);
  const defaultSeptember = new Date();
  defaultSeptember.setMonth(8);
  defaultSeptember.setDate(8);

  const eventClickFunction = (eventInfo) => {
    const id = eventInfo.event._def.publicId;
    console.log(id);
  }
  return (
    <>
      <Modal opened={openAddEntry} onClose={() => setOpenAddEntry(false)}>
        <AddEntryForm setOpenAddEntry={setOpenAddEntry} />
      </Modal>
      <div className="text-center">
        <AsburyButton onClick={() => setOpenAddEntry(true)} text="Add Entry" />
      </div>
      <div className="container">
        <FullCalendar
          firstDay={1}
          initialDate={defaultSeptember}
          plugins={[dayGridPlugin]}
          initialView="dayGridWeek"
          events={scheduleContext?.eventObjects}
          eventClick={(info) => eventClickFunction(info) }
       
        />
      </div>
    </>
  );
};

export default MasterSchedule;
