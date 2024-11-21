'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Inputs from '@/app/components/inputs/Inputs';
import Buttons from '@/app/components/button/Butons';
import Image from 'next/image';

function ForgotPasswordRequest() {
   const router = useRouter();
   const [email, setEmail] = useState('');
   const [emailError, setEmailError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [successMessage, setSuccessMessage] = useState('');

   const sendPasswordResetRequest = async (email: string) => {
      const host = process.env.NEXT_PUBLIC_HOST;
      const url = `${host}/api/v1/user/password/requestToken`;

      try {
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
         });

         if (response.status === 404) {
            setEmailError(true);
            setErrorMessage('No account associated with this email');
            return false;
         }

         if (response.ok) {
            setSuccessMessage('Password reset link sent to your email');
            return true;
         }

         setErrorMessage('An error occurred. Please try again.');
         return false;
      } catch (error) {
         console.error('Failed to send password reset request:', error);
         setErrorMessage('Network error. Please try again.');
         return false;
      }
   };

   const handleSubmit = async () => {
      if (!email) {
         setEmailError(true);
         setErrorMessage('Please enter your email');
         return;
      }

      const success = await sendPasswordResetRequest(email);
      if (success) {
         // Optional: Auto-redirect or show success state
         setTimeout(() => {
            router.push('/verification/forgot-password');
         }, 2000);
      }
   };

   return (
      <main className="h-screen flex flex-col justify-end items-center bg-[url('https://images.unsplash.com/photo-1621419203897-20b66b98d495?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center md:flex-row">
         <div className="bg-gray-950/35 fixed inset-0"></div>

         <div className="flex flex-col justify-between px-6 py-10 bg-white h-screen md:w-[50%] lg:w-[30%] md:float-right z-10">
            <nav className="w-full flex flex-row justify-between items-center">
               <p className="text-p2-m">Forgot Password</p>
               <Link href="/">Exit</Link>
            </nav>

            <section className="space-y-4">
               <header className="text-center space-y-2">
                  <div className="relative mx-auto h-12 w-12">
                     <Image
                        src="https://summitshare3.s3.eu-north-1.amazonaws.com/IMG_3157.PNG"
                        alt="Logo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'contain' }}
                     />
                  </div>

                  <h2>Reset Password</h2>
                  <p>Enter the email associated with your account</p>
               </header>

               <form action="">
                  <section className="space-y-4">
                     <Inputs
                        type="input"
                        state={emailError ? 'failure' : 'success'}
                        label="Email"
                        value={email}
                        onChange={(value) => {
                           setEmail(value);
                           setEmailError(false);
                           setErrorMessage('');
                        }}
                     />
                  </section>
               </form>
               
               {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
               )}
               
               {successMessage && (
                  <p className="text-green-500 text-sm mt-2">{successMessage}</p>
               )}
            </section>
            
            <section className="text-center space-y-6">
               <Buttons
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
               >
                  Send Reset Link
               </Buttons>
               
               <p>
                  Remember your password?{' '}
                  <a className="underline" href="/auth-sign-in">
                     Sign in
                  </a>
               </p>
            </section>
         </div>
      </main>
   );
}

export default ForgotPasswordRequest;