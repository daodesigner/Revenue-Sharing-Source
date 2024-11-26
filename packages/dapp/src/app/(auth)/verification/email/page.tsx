'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function Page({ params }: { params: { token: string } }) {
   const router = useRouter();

   return (
      <div className=" relative flex flex-col items-center justify-center px-6 py-10 bg-white h-screen md:w-[50%] md:float-right ">
        <nav className="absolute top-5 w-full flex flex-row justify-between items-center px-5">
            <p className="text-p2-m">
               Step 1<span> of 2</span>
            </p>
            <Link href="/">Exit</Link>
         </nav>
         <div className="text-center space-y-2">
            <h1 className='text-orange-500'>Verify your email</h1>
            <p>Open your mail SummitShare has sent you a verification link</p>
         </div>
      </div>
   );
}

export default Page;
