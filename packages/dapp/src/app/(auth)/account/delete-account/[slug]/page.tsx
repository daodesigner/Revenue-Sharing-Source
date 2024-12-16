'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';

function Page({ params }: { params: { slug: string } }) {
   const router = useRouter();
   const [verificationStatus, setVerificationStatus] = useState<number | null>(
      null
   );
   const [verificationMessage, setVerificationMessage] = useState<string>('');
   const hasFetched = useRef(false);
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

            setVerificationMessage(message);
            setVerificationStatus(status);

            // If successful, sign out and redirect after 3 seconds
            if (status === 200) {
               setTimeout(() => {
                  signOut();
                  router.push('/');
               }, 3000);
            }
         } catch (error) {
            console.error('Verification request failed:', error);
            setVerificationMessage('An error occurred. Please try again.');
         } finally {
            setLoading(false);
         }
      };

      verifyEmail();
   }, [params.slug, host, router]);

   return (
      <div className="flex flex-col items-center justify-center gap-[35%] px-6 py-10 bg-white h-screen md:w-[50%] lg:w-[30%] md:float-right">
         {/* Navigation */}
         <nav className="absolute top-5 right-5">
            <Link href="/">Exit</Link>
         </nav>

         {/* Content */}
         <div className="text-center space-y-2">
            {loading ? (
               <p>Loading...</p>
            ) : (
               <>
                  <h1 className="text-2xl font-bold">
                     {verificationStatus === 200 ? 'Success' : 'Whoops!'}
                  </h1>
                  <p>{verificationMessage}</p>
               </>
            )}
         </div>
      </div>
   );
}

export default Page;
