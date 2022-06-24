import React, { useEffect, useState } from "react";
import { TextInput, Select } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { timeSlots } from "../../../../utils/time-slots";
import { convertTime, formatTime } from "../../../../utils/dates";
import moment from "moment";
import AsburyButton from "../../../ui/AsburyButton";
import { supabase } from "../../../../supabase-client";
const ShiftForm = ({
  id,
  name,
  time_slot,
  start_time,
  end_time,
  editing = false,
  shift_slots,
  getShiftTypes,
  updateShiftEntry = null,
  loading = false,
  addEntry = null,
  deleteRecord = null,
}) => {
  const [shiftName, setShiftName] = useState(editing ? name : "");

  const inputClass = "my-4";
  // useEffect(() => {
  //     console.log(startTime);
  // }, [startTime])

  

  return (
    <div>
      <TextInput
        className={inputClass}
        label="Shift Name"
        required
        value={shiftName}
        onChange={(e) => setShiftName(e.target.value)}
      />
      <div className="flex flex-1 justify-center items-center">
        <AsburyButton
          text={editing ? "Save" : "Submit"}
          onClick={editing ? () => updateShiftEntry(id, shiftName) : () => addEntry(shiftName)}
          loading={loading}
        />
      </div>
      {deleteRecord && <div className="text-center mt-3">

        <AsburyButton color="bg-red-600" hoverColor="hover:bg-red-700" text="Delete" onClick={() => deleteRecord(id)} loading={loading}/>
      </div>}
    </div>
  );
};

export default ShiftForm;
