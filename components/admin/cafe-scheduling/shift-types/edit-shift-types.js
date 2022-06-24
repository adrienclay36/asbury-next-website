import React, { useState, useContext } from "react";
import { Modal } from "@mantine/core";
import { formatTime } from "../../../../utils/dates";
import AsburyButton from "../../../ui/AsburyButton";
import ShiftForm from "./shift-form";
import { supabase } from "../../../../supabase-client";
import { ScheduleContext } from "../../../../store/scheduling-store";
const EditShiftTypes = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const scheduleContext = useContext(ScheduleContext);



  const addEntry = async (shiftName) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("shift_type")
      .insert({ name: shiftName });
    await scheduleContext.getShiftTypes();
    setLoading(false);
    setOpenAddForm(false);
  };

  const pClass = "text-xs lg:text-lg md:text-md";
  const thClass =
    "px-6 py-3 text-center text-xs lg:text-md md:text-md font-medium text-gray-500 uppercase tracking-wider";
  return (
    <>
      <Modal
        opened={openAddForm}
        onClose={() => setOpenAddForm(false)}
        centered
      >
        <ShiftForm editing={false} addEntry={addEntry} loading={loading} />
      </Modal>
      <div className="container flex flex-1 justify-center items-center mt-4">
        <AsburyButton
          text="Add Shift Type"
          onClick={() => setOpenAddForm(true)}
        />
      </div>
      <div className="flex flex-col mx-auto mt-12 w-11/12 lg:w-5/6 md:11/12">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className={thClass}>
                      Shift Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scheduleContext.shiftTypes.map((shift) => (
                    <ShiftTypeItem
                      key={shift?.id}
                      shift={shift}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ShiftTypeItem = ({ shift }) => {
    const scheduleContext = useContext(ScheduleContext);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const formatStart = formatTime(shift?.start_time);
  const formatEnd = formatTime(shift?.end_time);
  const pClass = "text-center text-xs lg:text-lg md:text-md";
  const tableDataClass = "py-2 px-1";

  const updateShiftEntry = async (id, shiftName) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("shift_type")
      .update({
        name: shiftName,
      })
      .match({ id: id });
    scheduleContext.getShiftTypes();
    setLoading(false);
    setOpenEditForm(false);
  };

  const deleteRecord = async (id) => {
    setLoading(true);
    const confirmation = confirm(
      "Are you sure you want to delete this shift? This action cannot be undone."
    );
    if (confirmation) {
      const { data, error } = await supabase
        .from("shift_type")
        .delete()
        .match({ id: id });
      setOpenEditForm(false);
      scheduleContext.getShiftTypes();
    }
  };

  return (
    <>
      <Modal
        centered
        opened={openEditForm}
        onClose={() => setOpenEditForm(false)}
      >
        <ShiftForm
          editing={true}
          name={shift?.name}
          id={shift?.id}
          loading={loading}
          updateShiftEntry={updateShiftEntry}
          deleteRecord={deleteRecord}
        />
      </Modal>
      <tr
        onClick={() => setOpenEditForm(true)}
        className="hover:bg-gray-100 cursor-pointer"
      >
        <td className={tableDataClass}>
          <p className={pClass}>{shift?.name}</p>
        </td>
        
      </tr>
    </>
  );
};

export default EditShiftTypes;
