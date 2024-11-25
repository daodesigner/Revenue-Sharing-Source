'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


function Page({ params }: { params: { token: string } }) {
   const { data: session } = useSession();
   const userEmail = session?.user?.email
   const user_name = session?.user?.username || '';

   return (
      <div className=" flex flex-col items-center gap-[35%] px-6 py-10 bg-white h-screen md:w-[50%] lg:w-[30%] md:float-right ">
         <nav className="w-full flex flex-row justify-end">
            <Link href="/">Exit</Link>
         </nav>
         <div className="text-center space-y-2">
            <h1>Verify delete acction</h1>
            <p>An email has been sent to <span className='text-blue-700 underline'>{userEmail}</span>  to confirm that the action was performed by {user_name} </p>
         </div>
      </div>
   );
}

export default Page;
