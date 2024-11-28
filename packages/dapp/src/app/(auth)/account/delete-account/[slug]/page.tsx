'use client';
import { Button } from '@/app/components/button/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LoadingDots from '@/app/(main)/exhibit/loadingDots';
import { Session } from 'inspector/promises';
import { signOut } from 'next-auth/react';

function Page({ params }: { params: { slug: string } }) {
   const router = useRouter();
   const [verificationStatus, setVerificationStatus] = useState<number>();
   const [verificationMessage, setVerificationMessage] = useState<number>();
   const hasFetched = useRef(false);
   const [resendConfirmation, setResendConfirmation] = useState<string | null>(
      null
   );
   const [loading, setLoading] = useState<boolean>(true);
   const host = process.env.NEXT_PUBLIC_HOST;

   useEffect(() => {
      const verifyEmail = async () => {
         if (!params.slug || hasFetched.current) return;
         hasFetched.current = true;

         try {
            setLoading(true);
            const response = await fetch(
               `${host}/api/v1/user/delete/verify-req?token=${params.slug}`,
               {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                  },
               }
            );
            const { status } = response;
            const { message } = await response.json();
            if (status === 200) {
               setTimeout(function () {
                  signOut();
                  router.push('/');
               }, 3000);
            }
            // ////console.log(`status ${status}`)
            // ////console.log(`message ${message}`)

            setVerificationMessage(message);
            setVerificationStatus(response?.status);

            //console.log("First slug received:", params.slug)
            //console.log("Second slug received:", response)
         } catch (error) {
            console.error('Verification request failed:', error);
         } finally {
            setLoading(false);
         }
      };

      verifyEmail();
   }, [params.slug, host]);

   return (
      <div className=" flex flex-col items-center justify-center gap-[35%] px-6 py-10 bg-white h-screen md:w-[50%] lg:w-[30%] md:float-right ">
         <nav className=" absolute top-5 right-5">
            <Link href="/">Exit</Link>
         </nav>
         <div className="text-center space-y-2">
            <h1>
               {verificationStatus && verificationStatus === 200
                  ? 'Sucsess'
                  : 'Whoops!'}
            </h1>
            <p>{verificationMessage}</p>
         </div>
      </div>
   );
}

export default Page;
