import React, { useState, useContext } from "react";
import AsburyButton from "../../../ui/AsburyButton";
import { Modal } from "@mantine/core";
import NewOrganizationForm from "./new-organization-form";
import { supabase } from "../../../../supabase-client";

import { ScheduleContext } from "../../../../store/scheduling-store";
const ParticipatingOrganizations = () => {
  const [loading, setLoading] = useState(false);
  const [openNewForm, setOpenNewForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [orgToEdit, setOrgToEdit] = useState(null);
  const scheduleContext = useContext(ScheduleContext);

  const thClass =
    "px-6 py-3 text-center text-xs lg:text-md md:text-md font-medium text-gray-500 uppercase tracking-wider";

  const pClass = "text-center text-xs lg:text-lg md:text-md";
  const tableDataClass = "py-2 px-1";

  const addOrganization = async (e, name, contact_person, contact_email) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from("institutions").insert({
      name,
      contact_person,
      contact_email,
    });
    setLoading(false);
    setOpenNewForm(false);
    scheduleContext.getInstitutions();
  };

  const updateOrganization = async (
    e,
    id,
    name,
    contact_person,
    contact_email
  ) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("institutions")
      .update({
        name,
        contact_person,
        contact_email,
      })
      .match({ id });
    setLoading(false);
    setOpenEditForm(false);
    scheduleContext.getInstitutions();
  };

  const deleteOrganization = async (id) => {
    setLoading(true);
    const confirmation = confirm(
      "Are you sure you want to delete this organization? This action cannot be undone."
    );
    if (confirmation) {
      const { data, error } = await supabase
        .from("institutions")
        .delete()
        .match({ id });
    }
    setLoading(false);
    setOpenEditForm(false);
    scheduleContext.getInstitutions();
  };

  return (
    <>
      <Modal
        opened={openNewForm}
        onClose={() => setOpenNewForm(false)}
        centered
      >
        <NewOrganizationForm
          loading={loading}
          addOrganization={addOrganization}
        />
      </Modal>
      <Modal
        opened={openEditForm}
        onClose={() => setOpenEditForm(false)}
        centered
      >
        <NewOrganizationForm
          editing={true}
          updateOrganization={updateOrganization}
          deleteOrganization={deleteOrganization}
          loading={loading}
          institution={orgToEdit}
        />
      </Modal>
      <div className="text-center mt-6">
        <AsburyButton
          onClick={() => setOpenNewForm(true)}
          text="Add Organization"
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
                      Name
                    </th>
                    <th scope="col" className={thClass}>
                      Contact Person
                    </th>
                    <th scope="col" className={thClass}>
                      Contact Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scheduleContext?.institutions.map((inst) => {
                    return (
                      <tr
                        onClick={() => {
                          setOrgToEdit(inst);
                          setOpenEditForm(true);
                        }}
                        className="hover:bg-gray-100 cursor-pointer"
                        key={inst.id}
                      >
                        <td className={tableDataClass}>
                          <p className={pClass}>{inst?.name}</p>
                        </td>
                        <td className={tableDataClass}>
                          <p className={pClass}>{inst?.contact_person}</p>
                        </td>
                        <td className={tableDataClass}>
                          <p className={pClass}>{inst?.contact_email}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipatingOrganizations;
