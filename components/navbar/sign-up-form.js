import React, { useState, useContext } from 'react'
import { UserContext } from '../../store/user-context'
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { AiOutlineLogin } from 'react-icons/ai';
import UIModal from '../ui/modal/UIModal';
const SignUpForm = ({ setShowSignUp }) => {
    const userContext = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passError, setPassError] = useState(''); 
    const [existingUser, setExistingUser] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);



    
    const closeAll = () => {
      setSuccess(false);
      setShowSignUp(false);
    }

    const signUpHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(password !== confirmPassword) {
          setPassError("Passwords Do Not Match");
          setSubmitting(false);
          return;
        }
        const response = await userContext.signUpHandler(email, password, firstName, lastName);
        if(response.status === "ok") {
            setSubmitting(false);
            setSuccess(true);
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');

        }
        if(response.status === "duplicate") {
          setExistingUser('This User Already Exists');
          setSubmitting(false);
          setSuccess(false);
          

        }

    }
  return (
    <div className="container w-11/12 lg:w-2/6 md:w-2/6">
      <UIModal
        centerModal={true}
        type="success"
        message="A confirmation link has been sent to your email. Following this link will complete your sign up!"
        opened={success}
        onClose={() => closeAll()}
      />
      <form onSubmit={signUpHandler}>
        <TextInput
          id="firstName"
          label="First Name"
          type="text"
          description="Making yourself known to other congregation members helps us stay connected"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextInput
          id="lastName"
          label="Last Name"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          required
          error={existingUser}
          
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          id="password"
          className="mb-2"
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          error={passError}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="text-center mt-6 mb-24">
          <Button
            type="submit"
            loading={submitting}
            variant="filled"
            leftIcon={<AiOutlineLogin size={20} />}
            className="text-white bg-emerald-900 hover:bg-emerald-800 w-full"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm