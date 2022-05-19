import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { supabase } from '../../supabase-client';
import styles from './admin-form.module.css';

import { UserContext } from '../../store/user-context';
import { Lock } from 'tabler-icons-react';
import Link from 'next/link';
import UIModal from '../ui/modal/UIModal';
import AsburyButton from '../ui/AsburyButton';
const AdminForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [emailSignIn, setEmailSignIn] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);
    const [modalError, setModalError] = useState(false);
    const userContext = useContext(UserContext);





    const adminLoginHandler = async (e) => {
        e.preventDefault();
        setLoggingIn(true);
        if(email && password) {
          const { data, error } = await supabase.auth.signIn({email, password});
          userContext.checkUser();
          if(data){
            // Immediate redirect causes the SSR authentication on /admin/admin-dashboard to miss the cookie, and hangs the redirect.
            setTimeout(() => {
              router.push("/admin/admin-dashboard");
            }, 500);
          } else {
            setError(true);
            setModalError(true);
            setLoggingIn(false);
          }

        }
        
    }
    const passwordChangeHandler = (e) => {
      if(error) {
        setError(false);
      }
      setPassword(e.target.value);
    }
    const emailChangeHandler = (e) => {
      if(error) {
        setError(false);
      }
      setEmail(e.target.value);
    }

    


  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <UIModal
      opened={modalError}
      onClose={() => setModalError(false)}
        type="error"
        message="Please check your credentials and try again. If the issue persists,
            try resetting your password."
        actionText="Reset Now"
        href="/admin/forgot-password"
      />
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center items-center">
          <Image
            width={154}
            height={64}
            className="h-12 w-auto"
            src="/images/UMCLeft.png"
            alt="Workflow"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <form className="mt-8 space-y-6" onSubmit={adminLoginHandler}>
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
                className={error ? styles.emailError : styles.email}
                placeholder="Email address"
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
                className={error ? styles.passError : styles.password}
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={() => router.push("/admin/forgot-password")}
                href="#"
                className="font-medium text-seaFoam-600 hover:text-seaFoam-500"
              >
                {" "}
                Forgot your password?{" "}
              </button>
            </div>
          </div>

          <div>
           <AsburyButton leftIcon={<Lock size={20} color="white" />} margin="w-full mx-auto" text="Sign In" loading={loggingIn} />
          </div>
          <Link href="/" passHref>
            <p className="text-center font-semibold text-gray-400 hover:underline cursor-pointer">
              Back To Main Website
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
