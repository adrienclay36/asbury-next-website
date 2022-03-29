import React, { useState } from 'react'
import { Button, TextInput } from '@mantine/core'
import { FiKey } from 'react-icons/fi';
const ForgotPasswordForm = ({ error, resetPasswordHandler, resetError, restartSequence}) => {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);


    const emailChangeHandler = (e) => {
      if (error) {
        resetError();
      }
      setEmail(e.target.value);
    };
    const callResetPass = async (e) => {
        e.preventDefault();
        if(email){
            setSubmitting(true);
            await resetPasswordHandler(email);
            setSubmitting(false);
        }
    }
  return (
    <div>
      <h1 className="text-center font-bold mb-4 text-lg lg:text-3xl md:text-2xl">
        Forgot Password
      </h1>
      <form onSubmit={callResetPass}>
        <TextInput
          className="mb-4"
          label="Email"
          description="Enter The Email You Used to Sign Up"
          required
          value={email}
          type="email"
          onChange={emailChangeHandler}
          autoComplete="true"
          error={error}
        />
      </form>
      <Button
        type="submit"
        loading={submitting}
        disbaled={submitting}
        variant="filled"
        leftIcon={<FiKey size={20} />}
        className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
      >
        Reset Password
      </Button>
      <button onClick={restartSequence} className="text-gray-500 hover:underline cursor-pointer font-semibold mt-4">&larr;Back To Login</button>
    </div>
  );
}

export default ForgotPasswordForm