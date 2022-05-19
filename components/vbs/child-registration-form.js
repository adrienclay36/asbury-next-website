import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, Select } from "@mantine/core";
import AsburyButton from "../ui/AsburyButton";
import styles from "./child-registration-form.module.css";
import { DatePicker } from "@mantine/dates";
import { states } from "../../states";
import { supabase } from "../../supabase-client";
import { useRouter } from "next/router";
import UIModal from "../ui/modal/UIModal";
import { updateItemInTable } from "../../supabase-util";
const gradeValues = [
  {
    value: "Pre K",
    label: "Pre K",
  },
  {
    value: "Kindergarten",
    label: "Kindergarten",
  },
  {
    value: "1st",
    label: "1st",
  },
  {
    value: "2nd",
    label: "2nd",
  },
  {
    value: "3rd",
    label: "3rd",
  },
  {
    value: "4th",
    label: "4th",
  },
  {
    value: "5th",
    label: "5th",
  },
];

const genderData = [
  { label: "M", value: "M" },
  { label: "F", value: "F" },
];

const agreeToMedia = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const childRegistrationSchema = Yup.object().shape({
  child_first: Yup.string().min(1).required("Child's First Name Is Required"),
  child_last: Yup.string().min(1).required("Child's Last Name Is required"),
  grade_completed: Yup.string().required("Grade Completed Is Required"),
  gender: Yup.string().required("Gender Is Required"),
  parent_first: Yup.string().required("Guardian First Name Is Required"),
  parent_last: Yup.string().required("Guardian Last Name Is Required"),
  phone: Yup.string().required("Phone Is Required"),
  address: Yup.string().required("Address Is Required"),
  city: Yup.string().required("City Is Required"),
  state: Yup.string().required("State Is Required"),
  zipcode: Yup.string()
    .required("Zip Code Is Required")
    .matches(/^\d{5}(-\d{4})?$/, "Please Enter A Valid Zip Code"),
  mailing_address: Yup.string().optional(),
  email: Yup.string()
    .required("Please Enter A Valid Email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    ),
  emergency_first: Yup.string().required(
    "Emergency Contact First Name Is Required"
  ),
  emergency_last: Yup.string().required(
    "Emergency Contact Last Name Is Required"
  ),
  emergency_phone: Yup.string()
    .required("Emergency Contact Phone Number Is Required")
    .min(
      10,
      "Please Enter A Standard 10 Digit Phone Number With Area Code eg. 5051234567"
    )
    .max(
      10,
      "Please Enter A Standard 10 Digit Phone Number With Area Code eg. 5051234567"
    ),
  emergency_relationship: Yup.string().required(
    "Emergency Contact Relationship Is Required"
  ),
  special_needs_allergies: Yup.string().optional(),
  pickup_person: Yup.string().required("A Pickup contact is required"),
  pickup_person_phone: Yup.string()
    .required()
    .min(
      10,
      "Please Enter A Standard 10 Digit Phone Number With Area Code eg. 5051234567"
    )
    .max(
      10,
      "Please Enter A Standard 10 Digit Phone Number With Area Code eg. 5051234567"
    ),
  pickup_person_relationship: Yup.string().required(
    "Pickup Contact Relationship is Required"
  ),
  agree_to_media: Yup.string().required("You must select an option"),
});

const ChildRegistrationForm = ({ editValues = null, editing = false, containerStyles = '' }) => {
  const [childDOB, setChildDOB] = useState(
    editValues ? new Date(editValues?.child_dob) : new Date()
  );
  const [dobError, setDobError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!childDOB) {
      setDobError("Child DOB Is Required");
    } else {
      setDobError("");
    }
  }, [childDOB]);

  const addToRegistration = async (values, resetForm) => {
    
    setLoading(true);
    const formItem = {
      child_first: values.child_first,
      child_last: values.child_last,
      child_dob: childDOB,
      grade_completed: values.grade_completed,
      gender: values.gender,
      parent_first: values.parent_first,
      parent_last: values.parent_last,
      phone: values.phone,
      address: values.address,
      city: values.city,
      state: values.state,
      zipcode: values.zipcode,
      mailing_address: values.mailing_address,
      email: values.email,
      emergency_first: values.emergency_first,
      emergency_last: values.emergency_last,
      emergency_phone: values.emergency_phone,
      emergency_relationship: values.emergency_relationship,
      special_needs_allergies: values.special_needs_allergies,
      pickup_person: values.pickup_person,
      pickup_person_phone: values.pickup_person_phone,
      pickup_relationship: values.pickup_person_relationship,
      agree_to_media: values.agree_to_media === "Yes" ? true : false,
    };

    if(editing) {
      const response = await updateItemInTable('vbs_children', editValues?.id, formItem);
      if(response.status === 'ok') {
        setLoading(false);
        router.push("/admin/vbs");
        return;
      }
      
    }
    const { data, error } = await supabase
      .from("vbs_children")
      .insert(formItem);
    if (error) {
      console.log("Error adding registration item:: ", error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setSuccess(true);
    resetForm();
    setTimeout(() => {
      router.push("/vbs");
    }, 5000);
  };
  return (
    <div
      className={`container w-11/12 lg:w-2/6 md:w-2/6 bg-white shadow-lg rounded-lg p-6 ${containerStyles}`}
    >
      <UIModal
        opened={success}
        onClose={() => setSuccess(false)}
        centerModal
        type="success"
        message="Success! Your information has been received! If needed, a team member will reach out to you for further information!"
      />
      <Formik
        validationSchema={childRegistrationSchema}
        initialValues={{
          child_first: editValues?.child_first || "",
          child_last: editValues?.child_last || "",
          grade_completed: editValues?.grade_completed || "Pre K",
          gender: editValues?.gender || "M",
          parent_first: editValues?.parent_first || "",
          parent_last: editValues?.parent_last || "",
          phone: editValues?.phone || "",
          address: editValues?.address || "",
          city: editValues?.city || "",
          state: editValues?.state || "New Mexico",
          zipcode: editValues?.zipcode || "",
          mailing_address: editValues?.mailing_address || "",
          email: editValues?.email || "",
          emergency_first: editValues?.emergency_first || "",
          emergency_last: editValues?.emergency_last || "",
          emergency_phone: editValues?.emergency_phone || "",
          emergency_relationship: editValues?.emergency_relationship || "",
          special_needs_allergies: editValues?.special_needs_allergies || "",
          pickup_person: editValues?.pickup_person || "",
          pickup_person_phone: editValues?.pickup_person_phone || "",
          pickup_person_relationship: editValues?.pickup_relationship || "",
          agree_to_media: editValues?.agree_to_media
            ? editValues?.agree_to_media === true
              ? "Yes"
              : "No"
            : "Yes",
        }}
        validateOnMount={false}
        onSubmit={(values, actions) => {
          addToRegistration(values, actions.resetForm);
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
              value={values.child_first}
              onChange={handleChange("child_first")}
              label="Child First Name"
              error={errors.child_first}
              required
              className={styles.textInput}
            />
            <TextInput
              value={values.child_last}
              onChange={handleChange("child_last")}
              label="Child Last Name"
              required
              error={errors.child_last}
            />
            <DatePicker
              error={dobError}
              onChange={setChildDOB}
              label="Child Date Of Birth"
              required
              className={styles.textInput}
              value={childDOB}
            />
            <Select
              data={gradeValues}
              label="Grade Completed"
              className={styles.textInput}
              onChange={handleChange("grade_completed")}
              error={errors.grade_completed}
              value={values.grade_completed}
            />
            <Select
              data={genderData}
              label="Gender"
              className={styles.textInput}
              onChange={handleChange("gender")}
              error={errors.gender}
              value={values.gender}
            />
            <TextInput
              value={values.parent_first}
              onChange={handleChange("parent_first")}
              error={errors.parent_first}
              label="Parent/Guardian First Name"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.parent_last}
              onChange={handleChange("parent_last")}
              error={errors.parent_last}
              label="Parent/Guardian Last Name"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.phone}
              onChange={handleChange("phone")}
              error={errors.phone}
              label="Phone Number"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.address}
              onChange={handleChange("address")}
              error={errors.address}
              label="Address"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.city}
              onChange={handleChange("city")}
              error={errors.city}
              label="City"
              className={styles.textInput}
              required
            />
            <Select
              searchable
              value={values.state}
              onChange={handleChange("state")}
              error={errors.state}
              className={styles.textInput}
              required
              data={states}
              label="State"
            />
            <TextInput
              value={values.zipcode}
              onChange={handleChange("zipcode")}
              error={errors.zipcode}
              label="Zip Code"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.mailing_address}
              onChange={handleChange("mailing_address")}
              error={errors.mailing_address}
              label="Mailing Address (If Different)"
              className={styles.textInput}
            />
            <TextInput
              value={values.email}
              onChange={handleChange("email")}
              error={errors.email}
              label="Email"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.emergency_first}
              onChange={handleChange("emergency_first")}
              error={errors.emergency_first}
              label="Emergency Contact First Name"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.emergency_last}
              onChange={handleChange("emergency_last")}
              error={errors.emergency_last}
              label="Emergency Contact Last Name"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.emergency_relationship}
              onChange={handleChange("emergency_relationship")}
              error={errors.emergency_relationship}
              label="Emergency Contact Relationship"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.emergency_phone}
              onChange={handleChange("emergency_phone")}
              error={errors.emergency_phone}
              label="Emergency Contact Phone Number"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.special_needs_allergies}
              onChange={handleChange("special_needs_allergies")}
              error={errors.special_needs_allergies}
              label="Special Needs/Allergies"
              className={styles.textInput}
            />
            <TextInput
              value={values.pickup_person}
              onChange={handleChange("pickup_person")}
              error={errors.pickup_person}
              label="Person Responsible For Pickup After VBS"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.pickup_person_phone}
              onChange={handleChange("pickup_person_phone")}
              error={errors.pickup_person_phone}
              label="Pickup Contact Phone Number"
              className={styles.textInput}
              required
            />
            <TextInput
              value={values.pickup_person_relationship}
              onChange={handleChange("pickup_person_relationship")}
              error={errors.pickup_person_relationship}
              label="Pickup Contact Relationship To Child"
              className={styles.textInput}
              required
            />
            <Select
              data={agreeToMedia}
              value={values.agree_to_media}
              required
              onChange={handleChange("agree_to_media")}
              label="Do you agree to allow photos of your child to be used in church presentations or church promotional materials?"
            />
            <div className="justify-center items-center flex flex-1 w-full">
              <AsburyButton
                margin={"mt-6"}
                styles="w-full"
                loading={loading}
                text="Submit"
                onClick={handleSubmit}
              />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ChildRegistrationForm;
