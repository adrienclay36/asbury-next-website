import { React, createContext, useState, useEffect } from "react";
import { supabase } from "../supabase-client";
import { formatTime } from "../utils/dates";

export const ScheduleContext = createContext({
  institutions: [],
  shiftSlots: [],
  shiftTypes: [],
  shifts: [],
  masterSchedule: [],
  getShiftTypes: () => {},
  getInstitutions: () => {},
  loading: false,
  institutionData: [],
  shiftTypeData: [],
  getMasterSchedule: () => {},
  masterDates: [],
  eventObjects: [],
});

const ScheduleContextProvider = (props) => {
  const [institutions, setInstitutions] = useState([]);
  const [shiftSlots, setShiftSlots] = useState([]);
  const [shiftTypes, setShiftTypes] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [masterSchedule, setMasterSchedule] = useState([]);
  const [masterDates, setMasterDates] = useState(false);
  const [institutionData, setInstitutionData] = useState([]);
  const [shiftTypeData, setShiftTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [eventObjects, setEventObjects] = useState([]);

  function groupBy(arr, prop) {
    const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
    arr.forEach((obj) => map.get(obj[prop]).push(obj));
    return Array.from(map.values());
  }

  const getMasterSchedule = async () => {
    const { data, error } = await supabase.rpc("get_master_schedule");
    if (!error) {
      setMasterSchedule(data);
    }
    const masterDateArray = [];
    data.forEach((entry) => {
      if (!masterDateArray.includes(entry?.date)) {
        masterDateArray.push(entry?.date);
      }
    });
    const sorted = masterDateArray.sort((a, b) => {
      return new Date(a) - new Date(b);
    });
    setMasterDates(sorted);

    const events = [];
    data.forEach(entry => {
      events.push({
        id: entry?.id,
        title: `${entry?.shift_name}: ${formatTime(entry?.start_time)} - ${formatTime(entry?.end_time)}`,
        date: entry?.date,
        org_name: entry?.org_name,
        color: 'red',
      })
    });
    setEventObjects(events);
    
  };

  const getShiftTypes = async () => {
    const { data, error } = await supabase.from("shift_type").select();
    if (!error) {
      setShiftTypes(data);
    }
    const shiftLabelValue = [];
    data.forEach((shiftType) => {
      shiftLabelValue.push({
        value: shiftType?.id,
        label: shiftType?.name,
      });
    });
    setShiftTypeData(shiftLabelValue);
  };

  const filterShiftTypes = (filter) => {
    const filterShifts = shiftTypes.filter(
      (shiftType) => shiftType.time_slot_name === filter
    );
    const filterLabelValues = [];
    filterShifts.forEach((shift) => {
      filterLabelValues.push({
        value: shift?.shift_id,
        label: shift?.shift_name,
      });
    });
    setFilteredShifts(filterLabelValues);
    console.log(filterLabelValues);
  };

  const getShiftSlots = async () => {
    const { data, error } = await supabase.from("shift_slots").select();
    if (!error) {
      setShiftSlots(data);
    }
  };

  const getInstitutions = async () => {
    const { data, error } = await supabase.from("institutions").select();
    if (!error) {
      setInstitutions(data);
    }
    const valueLabel = [];
    data.forEach((inst) => {
      valueLabel.push({
        value: inst.id,
        label: inst.name,
      });
    });
    setInstitutionData(valueLabel);
  };
  const getShifts = async () => {
    const { data, error } = await supabase.from("shifts").select();
    if (!error) {
      setShifts(data);
    }
  };

  useEffect(() => {
    getMasterSchedule();
    getShiftTypes();
    getShiftSlots();
    getInstitutions();
  }, []);

  const contextValue = {
    institutions,
    shiftSlots,
    shiftTypes,
    shifts,
    masterSchedule,
    getShiftTypes,
    getInstitutions,
    loading,
    institutionData,
    shiftTypeData,
    getMasterSchedule,
    masterDates,
    eventObjects
  };
  return (
    <ScheduleContext.Provider value={contextValue}>
      {props.children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContextProvider;
