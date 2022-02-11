import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { auth } from '../../firebase-config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import { supabase } from '../../supabase-client';
import PageLoading from '../PageLoading/PageLoading';
import DualRingLoader from '../dual-ring-loader/DualRingLoader';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(error) {
            const timeout = setTimeout(() => {
                setError(false);
            }, 5000)

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [error])


    const resetHandler = async (e) => {
      setSending(true);
        e.preventDefault();
        if(email) {
            try {
                const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
                setSuccess(true);
                setSending(false);
                setTimeout(() => {
                  router.push("/admin");
                }, 3000)
                return;
            } catch(err) {
                setError(true);
            }
        }
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
          Reset Password
        </h2>
        <form className="mt-8 space-y-6" onSubmit={resetHandler}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-seaFoam-500 focus:border-seaFoam-500 focus:z-10 sm:text-sm"
                placeholder="Enter Your Email"
              />
            </div>
          </div>
          {error && (
            <div className="text-center">
              <p className="text-semibold text-lg text-red-600">
                Sorry, that email doesn&apos;t exist in our records...
              </p>
            </div>
          )}

          {success && (
            <div className="text-center">
              <p className="text-semibold text-lg text-green-700">
                An e-mail was sent containing instructions for resetting your password.
              </p>
            </div>
          )}
          
          {!success && <div>
            <button
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
              {sending ? <DualRingLoader/> : "Reset Password"}
            </button>
          </div>}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                href="#"
                className="font-medium text-seaFoam-600 hover:text-seaFoam-500"
              >
                {" "}
                &larr; Back To Log In{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
    
};

export default ForgotPasswordForm;
