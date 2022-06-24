import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import AsburyButton from "../../../ui/AsburyButton";

const NewOrganizationForm = ({
  institution,
  editing = false,
  addOrganization = null,
  loading = false,
  updateOrganization = false,
  deleteOrganization = false,
}) => {
  const [name, setName] = useState(institution?.name || "");
  const [contactPerson, setContactPerson] = useState(
    institution?.contact_person || ""
  );
  const [contactEmail, setContactEmail] = useState(institution?.contact_email);

  
  return (
    <>
      <form
        onSubmit={
          editing
            ? (e) =>
                updateOrganization(
                  e,
                  institution?.id,
                  name,
                  contactPerson,
                  contactEmail
                )
            : (e) => addOrganization(e, name, contactPerson, contactEmail)
        }
      >
        <p className="text-center text-lg">Add Organization</p>
        <TextInput
          className="my-4"
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          className="my-4"
          label="Contact Person"
          required
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
        />
        <TextInput
          type="email"
          className="my-4"
          label="Contact Email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <div className="text-center">
          <AsburyButton loading={loading} text="Submit" />
        </div>
      </form>
      {editing && <div className="text-center mt-6">
        <AsburyButton onClick={() => deleteOrganization(institution?.id)} color="bg-red-600" hoverColor="hover:bg-red-700" text="Delete" loading={loading}/>
        </div>}
    </>
  );
};

export default NewOrganizationForm;
