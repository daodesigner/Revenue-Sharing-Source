'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { validatePageAccess } from '@/utils/methods/ticketPurchase/ticketService';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingDots from './loadingDots';
import { Button } from '@/app/components/button/Button';

export default function Home() {
   const [open, setOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [loadingItem, setLoadingItem] = useState<string | null>(null);

   const { address } = useAccount();
   const userAddress = address;

   const router = useRouter();
   const session = useSession();

   useEffect(() => {
      const validateAccess = async () => {
         // Set loading to true when starting validation
         setIsLoading(true);

         // Check if wallet is connected
         if (!userAddress) {
            console.warn('No wallet connected. Redirecting to /connect-wallet');
            router.push('/connect-wallet');
            return; // Exit validation if no wallet is connected
         }

         // Validate access
         const { hasAccess } = await validatePageAccess(
            userAddress,
            router,
            session
         );

         // Once validation is complete, update loading state
         setIsLoading(false);

         // If the user does not have access, redirect is handled in `validatePageAccess`
         if (!hasAccess) {
            return;
         }
      };

      // Call the validation function
      if (session) {
         validateAccess();
      } else {
         setIsLoading(false);
      }
   }, [userAddress, router, session]);

   if (isLoading) {
      return <LoadingDots />;
   }

   const women = [
      {
         name: 'Julia Chikamoneka',
         img: '/women/julia.png',
         link: '/exhibit/julia-chikamoneka',
         artifact: 'Headrest',
      },

      {
         name: 'Mwenya',
         img: '/women/mwenya.png',
         link: '/exhibit/mwenya-mukulu',
         artifact: 'Double Sided Drum',
      },
      {
         name: 'Mwape',
         img: '/women/mwape.png',
         link: '/exhibit/mwape',
         artifact: 'Cowry Beads',
      },

      {
         name: 'lueji wa nkonde',
         img: '/women/lueji.png',
         link: '/exhibit/lueji-wa-nkonde',
         artifact: 'Snuff Cup',
      },

      {
         name: 'Mukwae',
         img: '/women/mukwae.png',
         link: '/exhibit/mukwae',
         artifact: 'Calabash',
      },

      {
         name: 'Loongo',
         img: '/women/loongo.png',
         link: '/exhibit/loongo',
         artifact: 'Luvale Mask',
      },
   ];

   return (
      <div className="space-y-10 mx-6 my-28 lg:mx-[15%]">
         <section className="bg-gradient-to-r from-orange-400 via-orange-600 to-orange-700 rounded-xl p-8 border-b md:border-b-0 border-primary-900-5 space-y-8 pb-10 md:flex md:flex-row md:gap-8">
            <div className="w-full md:w-1/2 h-[342px] rounded-lg overflow-hidden bg-[url('/all-women.png')] bg-cover bg-center bg-primary-50/25 "></div>
            <div className="space-y-6 md:w-1/2 flex flex-col justify-between">
               <div className="space-y-4">
                  <h1 className="text-primary-50  font-bold">
                     The Leading Ladies
                  </h1>
                  <p className="text-primary-50/80 leading-relaxed">
                     Those who walked before us and those to come. Those who wore
                     red clay masks and rested their heads on bended knees. Those
                     who washed the cowry bead and swung the snuff cup. Those who
                     weaved the baskets and wrapped the cloth. Those who fought
                     for peace and danced to the drum.
                  </p>
               </div>
               <div className="flex gap-2">
                  <Link href={'https://oncyber.io/spaces/89cp8FpYgF5hgrHk1i3N'}>
                     <Button>Enter Virtual Exhibit </Button>
                  </Link>
                  <Link href={'/distribution'}>
                     <Button variant="white">Learn more</Button>
                  </Link>
               </div>
            </div>
         </section>
         <section className="w-full space-y-6">
            <div className="space-y-2">
               <h2 className="font-bold">Artifacts</h2>
               <p>
                  Explore the lives of the leading ladies through their cherished
                  artifacts, digitally restored and viewable
                  <br /> in stunning detail from all angles.
               </p>
            </div>

            <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
               {women.map((item) => (
                  <div
                     key={item.name}
                     onClick={() => {
                        setLoadingItem(item.name); // Set the loading item
                        router.push(item.link); // Navigate to the dynamic page
                     }}
                     className="bg-gradient-to-b from-orange-100 to-orange-50 relative flex flex-col gap-6 justify-end h-[16rem] rounded-[0.5rem] px-4 py-6 overflow-hidden cursor-pointer"
                     style={{
                        transition: 'all 0.3s ease',
                        boxShadow:
                           '0 6px 8px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                     }}
                     onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                           '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                     }}
                     onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                     }}
                  >
                     {loadingItem === item.name ? (
                        <LoadingDots /> // Show the loading dots if this item is clicked
                     ) : (
                        <>
                           <div className="absolute inset-0 bg-primary-900/35 z-[4] rounded-[0.5rem]"></div>
                           <Image
                              className="absolute -bottom-10 inset-x-0 w-full h-full object-cover"
                              src={item.img}
                              alt={item.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                           />
                           <div className="z-[5] space-y-2">
                              <div className="sapce-y-1">
                                 <p className="text-white text-lg font-medium">
                                    {item.name}
                                 </p>
                                 <p className="text-white/80 text-sm ">
                                    {item.artifact}
                                 </p>
                              </div>

                              <div className="w-[66px]">
                                 <Button variant={'white'} size={'small'}>
                                    View
                                 </Button>
                              </div>
                           </div>
                        </>
                     )}
                  </div>
               ))}
            </section>
         </section>
         <section className="relative bg-gradient-to-br from-red-400 via-red-600 to-red-700  rounded-[0.5rem] w-full h-[21.375rem] flex flex-col items-center px-[2.813rem] justify-center space-y-12 overflow-hidden">
            {/* SVG Background */}
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 800 800"
               className="absolute inset-0 w-full h-full"
               preserveAspectRatio="xMidYMid slice"
            >
               <defs>
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="#F1F1F1" stopOpacity="0.2" />
                     <stop offset="50%" stopColor="#F1F1F1" stopOpacity="0.3" />
                     <stop offset="100%" stopColor="#F1F1F1" stopOpacity="0.2" />
                  </linearGradient>
               </defs>

               {/* Large Circles */}
               <circle cx="650" cy="150" r="300" fill="#F1F1F1" opacity="0.1" />
               <circle cx="150" cy="650" r="250" fill="#F1F1F1" opacity="0.1" />

               {/* Waves */}
               <path
                  d="M-100 300 C 100 250, 300 350, 500 300 S 700 250, 900 300"
                  stroke="url(#waveGradient)"
                  fill="none"
                  strokeWidth="3"
                  opacity="0.4"
               />
               <path
                  d="M-100 400 C 100 350, 300 450, 500 400 S 700 350, 900 400"
                  stroke="url(#waveGradient)"
                  fill="none"
                  strokeWidth="3"
                  opacity="0.3"
               />
               <path
                  d="M-100 500 C 100 450, 300 550, 500 500 S 700 450, 900 500"
                  stroke="url(#waveGradient)"
                  fill="none"
                  strokeWidth="3"
                  opacity="0.2"
               />

               {/* Small Accent Circles */}
               <circle cx="200" cy="200" r="20" fill="#F1F1F1" opacity="0.2" />
               <circle cx="600" cy="600" r="15" fill="#F1F1F1" opacity="0.2" />
               <circle cx="700" cy="200" r="25" fill="#F1F1F1" opacity="0.2" />
               <circle cx="150" cy="450" r="18" fill="#F1F1F1" opacity="0.2" />
            </svg>

            {/* Content */}
            <div className="flex flex-col gap-2 items-center justify-center z-[5]">
               <h3 className="text-white text-2xl font-bold">
                  Collaborate With Us
               </h3>
               <p className="text-center text-white/80 ">
                  Learn more and contribute to shaping this narrative. Every voice
                  matters, every insight adds to our shared heritage.
               </p>
               <div className="w-[164px] mt-4 z-[5]">
                  <Link href="https://forms.gle/rXvQy25pqEagxHoq9">
                     <Button variant={'white'}>Register today</Button>
                  </Link>
               </div>
            </div>
         </section>
      </div>
   );
}
