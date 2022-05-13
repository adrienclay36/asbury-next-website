import React, { useState, useEffect } from "react";
import styles from "./child-registration-form.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Select, TextInput, Switch } from "@mantine/core";
import { states } from "../../states";
import CustomButton from "../ui/CustomButton";
import { supabase } from '../../supabase-client';
import UIModal from "../ui/modal/UIModal";
import { useRouter } from 'next/router';

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

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
  age: "",
  gender: "",
};
const VolunteerRegistrationForm = () => {
  const [booleanValues, setBooleanValues] = useState({
    prefer_prek: false,
    prefer_kindergarten: false,
    prefer_first: false,
    prefer_second: false,
    prefer_third: false,
    prefer_fourth: false,
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();


  const addVolunteer = async (values, resetForm) => {
    setLoading(true);
    const databaseObject = {...values, ...booleanValues, age: parseInt(values.age)};
    console.log(databaseObject);

    const { data, error } = await supabase.from('vbs_volunteer').insert(databaseObject);
    if(error) {
      console.log("Error adding volunteer", error.message);
      setLoading(false);
      return;
    }
    window.scrollTo({top, behavior: "smooth"})
    setLoading(false);
    setSuccess(true);
    resetForm();
    setTimeout(() => {
      router.push("/vbs");
    }, 5000)
  }

  
  return (
    <div className="container w-11/12 lg:w-2/6 md:w-2/6 bg-white shadow-lg rounded-lg p-6">
      <UIModal centerModal={true} type="success" opened={success} onClose={() => setSuccess(false)} message="Thank you! A team member will contact you with further information regarding VBS!" />
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
            <p className="text-lg font-semibold my-6">
              I prefer to work with the following ages
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 my-4 gap-y-4">
              <Switch
                value={booleanValues.prefer_prek}
                label="Pre-K"
                onChange={(value) =>
                  setBooleanValues({ ...booleanValues, prefer_prek: value.currentTarget.checked })
                }
              />
              <Switch
                value={booleanValues.prefer_kindergarten}
                label="Kindergarten"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    prefer_kindergarten: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.prefer_first}
                label="First Grade"
                onChange={(value) =>
                  setBooleanValues({ ...booleanValues, prefer_first: value.currentTarget.checked })
                }
              />
              <Switch
                value={booleanValues.prefer_second}
                label="Second Grade"
                onChange={(value) =>
                  setBooleanValues({ ...booleanValues, prefer_second: value.currentTarget.checked })
                }
              />
              <Switch
                value={booleanValues.prefer_third}
                label="Third Grade"
                onChange={(value) =>
                  setBooleanValues({ ...booleanValues, prefer_third: value.currentTarget.checked })
                }
              />
              <Switch
                value={booleanValues.prefer_fourth}
                label="Fourth Grade"
                onChange={(value) =>
                  setBooleanValues({ ...booleanValues, prefer_fourth: value.currentTarget.checked })
                }
              />
              <Switch
                value={booleanValues.prefer_fifth}
                label="Fifth Grade"
                onChange={(value) =>
                  setBooleanValues({ ...booleanValues, prefer_fifth: value.currentTarget.checked })
                }
              />
            </div>
            <p className="text-lg font-semibold my-6">
              Before, I would like to help by:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 my-4 gap-y-4">
              <Switch
                value={booleanValues.help_advance_calls}
                label="Making Advance Telephone Calls"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    help_advance_calls: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.help_distributing_materials}
                label="Distributing Publicity Materials"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    help_distributing_materials: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.help_preparing_lesson_sites}
                label="Preparing Lesson Sites"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    help_preparing_lesson_sites: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.help_preparing_craft_materials}
                label="Preparing Craft Materials"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    help_preparing_craft_materials: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.help_preparing_vbs_env}
                label="Creating The VBS Environment"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    help_preparing_vbs_env: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.help_wherever}
                label="Wherever I Am Needed"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    help_wherever: value.currentTarget.checked,
                  })
                }
              />
            </div>
            <p className="text-lg font-semibold my-6">
              During, I would like to help with:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 my-4 gap-y-6">
              <Switch
                value={booleanValues.during_teaching}
                label="Assembly"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_teaching: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_crafts}
                label="Crafts"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_crafts: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_transportation}
                label="Transportation"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_transportation: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_assembly}
                label="Assembly"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_assembly: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_registration}
                label="Registration"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_registration: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_refreshments}
                label="Refreshments"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_refreshments: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_assisting_in_classroom}
                label="Assisting In The Classroom"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_assisting_in_classroom: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_missions}
                label="Missions"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_missions: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_cleanup}
                label="Cleanup"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_cleanup: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_site_leader}
                label="Being A Site Leader"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_site_leader: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_music}
                label="Music"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_music: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_child_care}
                label="Child Care"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_child_care: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_crew_leader}
                label="Being A Crew Leader"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_crew_leader: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_recreation}
                label="Reacreation"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_recreation: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_science}
                label="Science"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_science: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.during_wherever}
                label="Wherever I Am Needed"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    during_wherever: value.currentTarget.checked,
                  })
                }
              />
            </div>
            <p className="text-lg font-semibold my-6">
              After, I would like to help with:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 my-4 gap-y-6">
              <Switch
                value={booleanValues.after_calling_families}
                label="Calling Families Of Attendees"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    after_calling_families: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.after_mailing}
                label="Helping With Follow Up Mailings"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    after_mailing: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.after_tear_down}
                label="Tearing Down"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    after_tear_down: value.currentTarget.checked,
                  })
                }
              />
              <Switch
                value={booleanValues.after_wherever}
                label="Wherever I Am Needed"
                onChange={(value) =>
                  setBooleanValues({
                    ...booleanValues,
                    after_wherever: value.currentTarget.checked,
                  })
                }
              />
            </div>
            <div className="flex flex-1 justify-center items-center w-full">
              <CustomButton onClick={handleSubmit} styles="w-full" text="Submit" loading={loading} />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default VolunteerRegistrationForm;
