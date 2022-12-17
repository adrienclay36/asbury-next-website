import React, { useState, useContext } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { AiOutlineLogin } from "react-icons/ai";
import { UserContext } from "../../store/user-context";
import GoogleButton from 'react-google-button';


interface Props {
  signInHandler: (email: string, password: string) => void;
  error: string;
  resetError: () => void;
  toggleSignUp: () => void;
  toggleForgotPassword: () => void;
}
const SignInForm: React.FC<Props> = ({ signInHandler, error, resetError, toggleSignUp, toggleForgotPassword }) => {
  const [authenticating, setAuthenticating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);

  const callSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthenticating(true);
    if(email && password) {
      await signInHandler(email, password);
    }
    setAuthenticating(false);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      resetError();
    }
    
    setPassword(e.target.value);
  };
  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => callSignIn(e)}>
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
        <PasswordInput
          label="Password"
          required
          onChange={passwordChangeHandler}
          value={password}
          error={error ? error : ""}
        />
        <div className="text-center mt-6 mb-6">
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
        <div className="flex flex-1 justify-center items-center">

          <GoogleButton onClick={() => userContext.signInWithGoogle()}/>

        </div>
      </form>
      <div className="text-center mt-4">
        <p>Don&apos;t Have An Account?</p>
        
        <button onClick={() => toggleSignUp()} className="text-gray-600 hover:underline cursor-pointer font-semibold mt-4">Sign Up Now</button>
        
      </div>
      <div className="text-center">
        <button onClick={toggleForgotPassword} className="text-gray-600 hover:underline cursor-pointer font-semibol mt-4">Forgot Password</button>
      </div>
    </div>
  );
};

export default SignInForm;
