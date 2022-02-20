import React, { useState, useEffect } from 'react'
import styles from './user-operations.module.css';
import { supabase } from '../../../supabase-client';
import DualRingLoader from '../../dual-ring-loader/DualRingLoader';
import { Popover } from '@mantine/core';
import AlertButton from '../../ui/alert-button/alert-button';
const UserOperations = ({ user, userInfo }) => {
    const [password, setPassword] = useState('');
    const [tooShort, setTooShort] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
      if(success) {
        const timeout = setTimeout(() => {
          setSuccess(false);
        }, 3000)

        return () => clearTimeout(timeout);
      }
    }, [success])

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
      <p className="text-lg font-semibold text-center my-6">
        Current User: {userInfo.first_name} {userInfo.last_name}
      </p>
      <p className="text-lg font-semibold text-center my-6">
        Email: {user.email}
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
          <div className="text-center">

          <AlertButton type="success" onClick={changePassword} buttonText={"Change Password"} open={success} loadingAction={submitting} popoverText={"Successfully Changed Password!"}/>
          </div>

          {tooShort && (
            <p className="text-center text-red-800">
              Password Must Be More than Six Characters
            </p>
          )}
          {/* {success && (
            <p className="text-center text-green-800">Password Changed</p>
          )} */}
        </form>
      </div>
    </div>
  );
}

export default UserOperations