import React, { useState } from 'react'
import styles from './user-operations.module.css';
import { supabase } from '../../../supabase-client';
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
const UserOperations = ({ user }) => {
    const [password, setPassword] = useState('');
    const [tooShort, setTooShort] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
        if(password.length < 6) {
            setTooShort(true);
        } else {
            setTooShort(false);
        }
        
    }

    const changePassword = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(password.length > 6) {

            const { user, error } = await supabase.auth.update({password});
            setSubmitting(false);
            setSuccess(true);
            setPassword('');
        } else {
            setTooShort(true);
            setSubmitting(false);
        }

        
    }
  return (
    <div>
      <p className="text-lg font-semibold text-center">
        Current User: {user.email}
      </p>
      <div className="container w-11/12 lg:w-1/6 md:w-1/6">
        <form className="mt-8 space-y-6" onSubmit={changePassword}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                value={password}
                onChange={passwordChangeHandler}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="New Password"
                required
                className={tooShort ? styles.passError : styles.password}
              />
            </div>
          </div>

          <button
            disabled={submitting ? true : false}
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
            {submitting ? <DualRingLoader /> : "Change Password"}
          </button>
          {tooShort && (
            <p className="text-center text-red-800">
              Password Must Be More than Six Characters
            </p>
          )}
          {success && <p className="text-center text-green-800">
              Password Changed</p>}
        </form>
      </div>
    </div>
  );
}

export default UserOperations