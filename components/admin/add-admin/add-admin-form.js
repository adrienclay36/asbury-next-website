import React, { useState, useEffect } from "react";
import styles from "./add-admin-form.module.css";
import { supabase } from "../../../supabase-client";
import DualRingLoader from "../../dual-ring-loader/DualRingLoader";
const AddAdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tooManyRequests, setTooManyRequests] = useState(false);

  useEffect(() => {
      if(tooManyRequests) {
          const timeout = setTimeout(() => {
              setTooManyRequests(false);
          }, 3000)

          return () => {
              clearTimeout(timeout);
          }
      }
  },[tooManyRequests])

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
      if(error.status === 429) {
          setSubmitting(false);
          setTooManyRequests(true);
          setSuccess(false);
          return;
      }
    } 

    setSubmitting(false);
    setSuccess(true);
    setEmail('');
    setPassword('');
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
    if(invalid || tooManyRequests){

        setInvalid(false);
        setTooManyRequests(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add Administrator
        </h2>
        <form className="mt-8 space-y-6" onSubmit={addAdmin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                  invalid || tooManyRequests ? styles.emailError : styles.email
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
                placeholder="Password"
                required
                className={
                  invalid || tooManyRequests
                    ? styles.passError
                    : styles.password
                }
              />
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

          {success && (
            <div>
              <p className="text-center text-green-800">
                An email has been sent to this user with further instructions.
                Be sure to let them know their password.
              </p>
              <p className="text-center text-green-800">
                They will be able to change it later.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAdminForm;