'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Inputs from '@/app/components/inputs/Inputs';
import Buttons from '@/app/components/button/Butons';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

function ResetPassword({ params }: { params: { token: string } }) {
   const router = useRouter();
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [passwordError, setPasswordError] = useState(false);
   const [confirmPasswordError, setConfirmPasswordError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const resetPassword = async () => {
      // Validate passwords
      if (password !== confirmPassword) {
         setPasswordError(true);
         setConfirmPasswordError(true);
         setErrorMessage('Passwords do not match');
         return;
      }

      if (password.length < 8) {
         setPasswordError(true);
         setErrorMessage('Password must be at least 8 characters');
         return;
      }

      const host = process.env.NEXT_PUBLIC_HOST;
      const url = `${host}/api/v1/user/password/verifyToken?token=${params.token}`;

      try {
         const response = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               token: params.token,
               password: password,
            }),
         });

         if (response.ok) {
            // Redirect to sign in or show success message
            router.push('/auth-sign-in');
         } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Failed to reset password');
         }
      } catch (error) {
         console.error('Password reset failed:', error);
         setErrorMessage('Please try again.');
      }
   };

   return (
      <main className="h-screen flex flex-col justify-end items-center bg-[url('https://images.unsplash.com/photo-1621419203897-20b66b98d495?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center md:flex-row">
         <div className="bg-gray-950/35 fixed inset-0"></div>

         <div className="flex flex-col justify-between px-6 py-10 bg-white h-screen md:w-[50%] lg:w-[30%] md:float-right z-10">
            <nav className="w-full flex flex-row justify-between items-center">
               <p className="text-p2-m">Reset Password</p>
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

                  <h2>Create New Password</h2>
                  <p>Enter a strong, unique password</p>
               </header>

               <form action="">
                  <section className="space-y-4">
                     <Inputs
                        type="input"
                        label="New Password"
                        state={passwordError ? 'failure' : 'success'}
                        isPassword={true}
                        value={password}
                        onChange={(value) => {
                           setPassword(value);
                           setPasswordError(false);
                           setErrorMessage('');
                        }}
                     />
                     <Inputs
                        type="input"
                        label="Confirm Password"
                        state={confirmPasswordError ? 'failure' : 'success'}
                        isPassword={true}
                        value={confirmPassword}
                        onChange={(value) => {
                           setConfirmPassword(value);
                           setConfirmPasswordError(false);
                           setErrorMessage('');
                        }}
                     />
                  </section>
               </form>
               
               {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
               )}
            </section>
            
            <section className="text-center space-y-6">
               <Buttons
                  type="primary"
                  size="large"
                  onClick={resetPassword}
               >
                  Reset Password
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

export default ResetPassword;