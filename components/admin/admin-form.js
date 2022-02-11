import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { supabase } from '../../supabase-client';
import styles from './admin-form.module.css';
import PageLoading from '../PageLoading/PageLoading';
import DualRingLoader from '../dual-ring-loader/DualRingLoader';

const AdminForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [emailSignIn, setEmailSignIn] = useState(false);
    const [loggingIn, setLoggingIn] = useState(false);





    const adminLoginHandler = async (e) => {
        e.preventDefault();
        setLoggingIn(true);
        if(email && password) {
          const {error, data } = await supabase.auth.signIn({email, password});
          

          if(!error){
            router.replace("/admin/admin-dashboard");
            
            return;
          } else {
            setError(true);
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
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center items-center">
          <Image
            width={154}
            height={64}
            className="h-12 w-auto"
            src="/images/AsburyLogoFull.png"
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
            <button
              disabled={emailSignIn || loggingIn}
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
              {loggingIn ? <DualRingLoader /> : "Sign In"}
            </button>
          </div>
          {emailSignIn && (
            <div className="text-center">
              <p className="text-semibold text-green-700 mt-10">
                Check your email to sign in - you will receive a login link!
              </p>
            </div>
          )}

          {error && (
            <div className="text-center">
              <p className="text-semibold text-red-700 mt-10">
                Please check your credentials and try again. If the issue
                persists, try resetting your password
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
