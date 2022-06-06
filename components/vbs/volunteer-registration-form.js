import React, { useState, useEffect } from "react";
import styles from "./child-registration-form.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Select, TextInput, Switch } from "@mantine/core";
import { states } from "../../states";
import AsburyButton from "../ui/AsburyButton";
import { supabase } from "../../supabase-client";
import UIModal from "../ui/modal/UIModal";
import { useRouter } from "next/router";
import AllSwitches from "./AllSwitches";
import { updateItemInTable } from "../../supabase-util";
import { sendMail } from "../../utils/send-email-functions";

const volunteerFormSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name Is Required"),
  last_name: Yup.string().required("Last Name Is Required"),
  email: Yup.string().required("Email Is Required"),
  phone: Yup.string()
    .required("Phone Is Required")
    .min(10, "Please enter a 10 digit phone number")
    .max(10, "Please enter a 10 digit phone number"),
  address: Yup.string().optional(),
  city: Yup.string().optional(),
  state: Yup.string().optional(),
  zipcode: Yup.string().optional(),
  age: Yup.string().optional(),
  gender: Yup.string().optional(),
});

const VolunteerRegistrationForm = ({ editValues = null, editing = false }) => {
  const [booleanValues, setBooleanValues] = useState({
    prefer_prek: editValues?.prefer_prek || false,
    prefer_kindergarten: false,
    prefer_first: false,
    prefer_second: false,
    prefer_third: false,
    prefer_fourth: editValues?.prefer_fourth || false,
    prefer_fifth: false,
    help_preparing_craft_materials: false,
    help_preparing_vbs_env: false,
    help_distributing_materials: false,
    help_wherever: false,
    help_advance_calls: false,
    help_preparing_lesson_sites: false,
    during_teaching: false,
    during_assembly: false,
    during_crew_leader: false,
    during_assisting_in_classroom: false,
    during_crafts: false,
    during_missions: false,
    during_transportation: false,
    during_cleanup: false,
    during_wherever: false,
    during_site_leader: false,
    during_registration: false,
    during_music: false,
    during_recreation: false,
    during_science: false,
    during_refreshments: false,
    during_child_care: false,
    after_mailing: false,
    after_wherever: false,
    after_calling_families: false,
    after_tear_down: false,
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const initialValues = {
    first_name: editValues?.first_name || "",
    last_name: editValues?.last_name || "",
    email: editValues?.email || "",
    phone: editValues?.phone || "",
    address: editValues?.address || "",
    city: editValues?.city || "",
    state: editValues?.state || "",
    zipcode: editValues?.zipcode || "",
    age: editValues?.age || "",
    gender: editValues?.gender || "",
  };

  const addVolunteer = async (values, resetForm) => {
    setLoading(true);
    let databaseObject = {};
    if (editing) {
      databaseObject = {
        ...values,
        age: parseInt(values?.age),
      };
      const response = await updateItemInTable(
        "vbs_volunteer",
        editValues?.id,
        databaseObject
      );
      if (response.status === "ok") {
        router.push("/admin/vbs");
        return;
      } else {
        setErrorMessage(response.error);
        setError(true);
        return;
      }
    }
    databaseObject = {
      ...values,
      ...booleanValues,
      age: parseInt(values.age),
    };
    console.log(databaseObject);

    const { data, error } = await supabase
      .from("vbs_volunteer")
      .insert(databaseObject);
    if (error) {
      console.log("Error adding volunteer", error.message);
      setLoading(false);
      return;
    }
    const newRegistrantString = `<p>Hey there! It looks like a new volunteer has registered for VBS!</p>
    <p><strong>Volunteer Name:</strong> ${values?.first_name} ${values?.last_name}</p>
    <p><strong>Volunteer Contact Info:</strong></p>
    <p><strong>Phone:</strong> ${values?.phone}</p>
    <p><strong>Email:</strong> ${values?.email}</p>
    <p>You can view the full details of this registrant by visiting <strong><a href="https://www.asburyabq.org/admin/vbs" target="_blank">asburyabq.org/admin/vbs<a></strong></p>
    `;
    const response = await sendMail(
      "familylife@asburyabq.org, asbury-webmaster@asburyabq.org",
      "New Volunteer - VBS",
      newRegistrantString
    );
    window.scrollTo({ top, behavior: "smooth" });
    setLoading(false);
    setSuccess(true);
    resetForm();
  };
  const closeAndPush = () => {
    setSuccess(false);
    router.push("/vbs");
  };

  return (
    <div className="container w-11/12 lg:w-2/6 md:w-2/6 bg-white shadow-lg rounded-lg p-6">
      <UIModal
        centerModal={true}
        type="success"
        opened={success}
        onClose={() => closeAndPush()}
        message="Thank you! A team member will contact you with further information regarding VBS!"
      />
      <UIModal
        centerModal={true}
        type="error"
        opened={error}
        onClose={() => setError(false)}
        message={errorMessage}
      />
      <Formik
        validationSchema={volunteerFormSchema}
        initialValues={initialValues}
        validateOnMount={false}
        onSubmit={(values, actions) => {
          addVolunteer(values, actions.resetForm);
        }}
        validateOnChange={false}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          errors,
          isValid,
        }) => (
          <>
            <TextInput
              className={styles.textInput}
              value={values.first_name}
              label="First Name"
              required
              onChange={handleChange("first_name")}
              error={errors?.first_name}
            />
            <TextInput
              className={styles.textInput}
              value={values.last_name}
              label="Last Name"
              required
              onChange={handleChange("last_name")}
              error={errors?.last_name}
            />
            <TextInput
              className={styles.textInput}
              value={values.email}
              label="Email"
              required
              onChange={handleChange("email")}
              error={errors?.email}
            />
            <TextInput
              className={styles.textInput}
              value={values.phone}
              description="10-Digit phone number, no spaces or dashes. (eg. 5051234567)"
              label="Phone Number"
              required
              onChange={handleChange("phone")}
              error={errors?.phone}
            />
            <TextInput
              className={styles.textInput}
              value={values.address}
              label="Address"
              onChange={handleChange("address")}
              error={errors?.address}
            />
            <TextInput
              className={styles.textInput}
              value={values.city}
              label="City"
              onChange={handleChange("city")}
              error={errors?.city}
            />
            <Select
              data={states}
              label="State"
              searchable
              onChange={handleChange("state")}
              value={values.state}
            />
            <TextInput
              className={styles.textInput}
              value={values.zipcode}
              description="5-Digit Zip Code (eg. 87123)"
              label="Zip Code"
              onChange={handleChange("zipcode")}
              error={errors?.zipcode}
            />
            <TextInput
              className={styles.textInput}
              value={values.age}
              label="Age"
              onChange={handleChange("age")}
              error={errors?.age}
            />
            <Select
              searchable
              data={[
                { value: "M", label: "M" },
                { value: "F", label: "F" },
              ]}
              label="Gender"
              value={values.gender}
              onChange={handleChange("gender")}
            />

            {!editing && (
              <AllSwitches
                booleanValues={booleanValues}
                setBooleanValues={setBooleanValues}
              />
            )}

            <div className="flex flex-1 justify-center items-center w-full">
              <AsburyButton
                margin={'mt-6'}
                onClick={handleSubmit}
                styles="w-full"
                text="Submit"
                loading={loading}
              />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default VolunteerRegistrationForm;
