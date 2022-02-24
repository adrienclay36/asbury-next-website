import React, { useState, useEffect, useRef } from "react";
import styles from "./add-admin-form.module.css";
import { supabase } from "../../../supabase-client";
import DualRingLoader from "../../dual-ring-loader/DualRingLoader";
import { Checkbox } from "@mantine/core";
import { Switch } from "@mantine/core";
import { Modal } from "@mantine/core";
import { AiOutlineCheckCircle } from 'react-icons/ai';

const AddAdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tooManyRequests, setTooManyRequests] = useState(false);
  const [masterChecked, setMasterChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const libraryRef = useRef();
  const blogRef = useRef();
  const inviteRef = useRef();
  const masterRef = useRef();
  const socialRef = useRef();

  useEffect(() => {
    if (tooManyRequests) {
      const timeout = setTimeout(() => {
        setTooManyRequests(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [tooManyRequests]);

  const addAdmin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      if (error.status === 422) {
        setInvalid(true);
        setSubmitting(false);
        setSuccess(false);
        return;
      }
      if (error.status === 429) {
        setSubmitting(false);
        setTooManyRequests(true);
        setSuccess(false);
        return;
      }
    }
    let permissions = [];

    if (socialRef.current.checked) {
      permissions.push("social");
    }
    if (blogRef.current.checked) {
      permissions.push("blog");
    }
    if (libraryRef.current.checked) {
      permissions.push("library");
    }
    if (inviteRef.current.checked) {
      permissions.push("invite");
    }
    if (masterRef.current.checked) {
      permissions.push("master");
    }

    const { data } = await supabase
      .from("users")
      .select()
      .match({ email: email });

    if (data) {
      const userInfo = data[0];
      const { data: success, error: submitError } = await supabase
        .from("users")
        .update({
          permissions: permissions,
          role: "admin",
          first_name: firstName,
          last_name: lastName,
          title: title,
        })
        .match({ id: userInfo.id });
      console.log(submitError);
    }

    setSubmitting(false);
    setSuccess(true);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    inviteRef.current.checked = false;
    blogRef.current.checked = false;
    libraryRef.current.checked = false;
    masterRef.current.checked = false;
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    if (invalid || tooManyRequests) {
      setInvalid(false);
      setTooManyRequests(false);
    }
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    if (invalid || tooManyRequests) {
      setInvalid(false);
      setTooManyRequests(false);
    }
  };

  const toggleMaster = (e) => {
    setMasterChecked(e.target.checked);
  };

  return (
    <>
      <Modal centered opened={success} onClose={() => setSuccess(false)}>
        <div className="flex flex-1 flex-col justify-center items-center text-center">
          <AiOutlineCheckCircle size={75} className="text-emerald-700 mb-12" />
          <p className="font-semibold text-lg">
            An e-mail with a confirmation link has been sent to this person. Be sure to let them know their temporary password, which they will
            be able to change later! 
          </p>
        </div>
      </Modal>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Administrator
          </h2>
          <form className="mt-8 space-y-6" onSubmit={addAdmin}>
            <input type="hidden" name="remember" value="true" />
            <div className="p-4 border-2 rounded-md bg-white">
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
                  <label htmlFor="firstName" className="sr-only">
                    First Name
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="New Admin First Name"
                    required
                    className={
                      "appearance-none mb-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-seaFoam-500 focus:border-seaFoam-500 focus:z-10 sm:text-sm"
                    }
                  />
                  <label htmlFor="lastName" className="sr-only">
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="New Admin Last Name"
                    required
                    className={
                      "appearance-none mb-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-seaFoam-500 focus:border-seaFoam-500 focus:z-10 sm:text-sm"
                    }
                  />
                </div>

                <div>
                  <label htmlFor="title" className="sr-only">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title (eg. Webmaster, Librarian)"
                    required
                    className={
                      "appearance-none mb-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-seaFoam-500 focus:border-seaFoam-500 focus:z-10 sm:text-sm"
                    }
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={emailChangeHandler}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    className={
                      invalid || tooManyRequests
                        ? styles.emailError
                        : styles.email
                    }
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={passwordChangeHandler}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Temporary Password"
                    required
                    className={
                      invalid || tooManyRequests
                        ? styles.passError
                        : styles.password
                    }
                  />
                </div>
              </div>
              <div className="my-12">
                <p className="text-center mt-4">
                  I want this user to be able to:
                </p>
                <div className="checkboxes mt-4">
                  <Switch
                    className="mb-2"
                    onChange={toggleMaster}
                    id="masterRef"
                    ref={masterRef}
                    label="Have full admin privilges"
                  />
                  <Switch
                    disabled={masterChecked}
                    className="mb-2"
                    id="blogRef"
                    ref={blogRef}
                    label="Edit The Blog"
                  />
                  <Switch
                    disabled={masterChecked}
                    className="mb-2"
                    id="libraryRef"
                    ref={libraryRef}
                    label="Make Library Changes"
                  />
                  <Switch
                    disabled={masterChecked}
                    className="mb-2"
                    id="inviteRef"
                    ref={inviteRef}
                    label="Invite Other Admins"
                  />
                  <Switch
                    disabled={masterChecked}
                    className="mb-2"
                    id="socialRef"
                    ref={socialRef}
                    label="Moderate Joys & Concerns Posts"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                disabled={submitting || invalid ? true : false}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-800 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seaFoam-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-emerald-600 group-hover:text-emerald-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {submitting ? <DualRingLoader /> : "Invite Admin"}
              </button>
            </div>
            {invalid && (
              <div>
                <p className="text-center text-red-800">
                  Password Should Be More than Six Characters
                </p>
              </div>
            )}

            {invalid && (
              <div>
                <p className="text-center text-red-800">
                  Password Should Be More than Six Characters
                </p>
              </div>
            )}

            {tooManyRequests && (
              <div>
                <p className="text-center text-red-800">
                  Too many sign-up attempts - Please wait a few minutes before
                  trying again.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdminForm;
