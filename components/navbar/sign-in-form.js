import React, { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { AiOutlineLogin } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from 'next/link';
const SignInForm = ({ signInHandler, error, resetError }) => {
  const [authenticating, setAuthenticating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const callSignIn = async (e) => {
    e.preventDefault();
    setAuthenticating(true);
    await signInHandler(email, password);
    setAuthenticating(false);
  };

  const passwordChangeHandler = (e) => {
    if (error) {
      resetError();
    }
    setPassword(e.target.value);
  };
  const emailChangeHandler = (e) => {
    if (error) {
      resetError();
    }
    setEmail(e.target.value);
  };

  return (
    <div>
      <h1 className="text-center font-bold mb-4 text-lg lg:text-3xl md:text-2xl">
        Sign In
      </h1>
      <form onSubmit={callSignIn}>
        <TextInput
          className="mb-8"
          label="Email"
          description="Enter The Email You Used to Sign Up"
          required
          value={email}
          type="email"
          onChange={emailChangeHandler}
          autoComplete
          error={error}
        />
        <PasswordInput
          label="Password"
          required
          onChange={passwordChangeHandler}
          value={password}
          error={error ? error : ""}
        />
        <div className="text-center mt-6">
          <Button
            type="submit"
            loading={authenticating}
            variant="filled"
            leftIcon={<AiOutlineLogin size={20} />}
            className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
          >
            Sign In
          </Button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p>Don&apos;t Have An Account?</p>
        <Link href="/sign-up" passHref>
        <p className="text-gray-600 hover:underline cursor-pointer font-semibold mt-4">Sign Up Now</p>
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
