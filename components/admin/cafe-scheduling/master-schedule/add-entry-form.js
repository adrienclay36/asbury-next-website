import React, { useContext, useState } from "react";
import { TextInput, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ScheduleContext } from "../../../../store/scheduling-store";
import { timeSlots } from "../../../../utils/time-slots";
import AsburyButton from "../../../ui/AsburyButton";
import { supabase } from "../../../../supabase-client";
const AddEntryForm = ({ setOpenAddEntry }) => {
  const scheduleContext = useContext(ScheduleContext);
  const [shiftTypeData, setShiftTypeData] = useState(
    scheduleContext.shiftTypeData
  );
  const defaultSeptember = new Date();
  defaultSeptember.setMonth(8);
  defaultSeptember.setDate(8);
  const [selectedDate, setSelectedDate] = useState(defaultSeptember);
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedShiftType, setSelectedShiftType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [loading, setLoading] = useState(false);

  const addMasterScheduleEntry = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(selectedDate && selectedOrganization && selectedShiftType && timeSlot) {
      const { data, error } = await supabase.from('master_schedule').insert({
        date: selectedDate,
        institution: selectedOrganization,
        shift_type: selectedShiftType,
        time_slot: timeSlot,
      })
      if(error) {
        console.log("Error adding master schedule entry:: ", error.message);
      }
      setLoading(false);
      setOpenAddEntry(false);
      scheduleContext.getMasterSchedule();
    }
    
  }


  

  return (
    <form onSubmit={addMasterScheduleEntry}>
      <DatePicker
      className="my-6"
        value={selectedDate}
        onChange={(value) => setSelectedDate(value)}
        label="Date"
        required
        description="The date the work will need to be performed"
      />
      <Select
      className="my-6"
        value={selectedOrganization}
        onChange={(value) => setSelectedOrganization(value)}
        label="Participating Organization"
        required
        data={scheduleContext.institutionData}
      />
      <Select
      className="my-6"
        data={shiftTypeData}
        value={selectedShiftType}
        onChange={(value) => setSelectedShiftType(value)}
        label="Shift Type"
        required
      />
      <Select
      className="my-6"
        data={timeSlots}
        value={timeSlot}
        onChange={(value) => setTimeSlot(value)}
        label="Time Slot"
        required
      />
      <div className="text-center">
        <AsburyButton loading={loading} text="Submit" />
      </div>
    </form>
  );
};

export default AddEntryForm;
