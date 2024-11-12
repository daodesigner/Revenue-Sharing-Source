'use client';
import React, { useState, useEffect } from 'react';
import {
   calculateTimeLeft,
   isCountdownComplete,
   TimeLeft,
} from '@/functonality/countdownTimer';
import TicketPurchaseComponent from '@/functonality/ticketpurchasecomponent';
import Link from 'next/link';
import useTicketCount from '@/lib/getTickets';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Buttons from '@/app/components/button/Butons';
import { ButtonConfig, TicketPurchaseUIProps } from '@/utils/dev/frontEndInterfaces'; 


const ResponsiveVideo: React.FC = () => {

   const [isMobile, setIsMobile] = useState(false);

   // Function to check window width
   const handleResize = () => {
      if (window.innerWidth <= 768) {
         setIsMobile(true); // Mobile version if width is 768px or less
      } else {
         setIsMobile(false); // Desktop version if width is greater than 768px
      }
   };

   // Add event listener for window resize
   useEffect(() => {
      handleResize(); // Check screen size on initial render
      window.addEventListener('resize', handleResize); // Re-check on resize
      return () => window.removeEventListener('resize', handleResize); // Clean up listener
   }, []);

   return (
      <div className="absolute inset-0 pointer-events-none">
         {isMobile ? (
            <iframe
               className="w-full h-full"
               src="https://www.youtube.com/embed/Tbfj5gDttxA?autoplay=1&mute=1&loop=1&playlist=Tbfj5gDttxA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
            ></iframe>
         ) : (
            <iframe
               className="w-full h-full"
               src="https://www.youtube.com/embed/yEPtzznNCN0?autoplay=1&mute=1&loop=1&playlist=yEPtzznNCN0&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
            ></iframe>
         )}
         {/* Overlay to make text more readable */}
         <div className="absolute inset-0 bg-black/50"></div>
      </div>
   );
};

export default function Cya() {
   const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
   const [isClient, setIsClient] = useState(false);
   const [isComplete, setIsComplete] = useState(false);
   const ticketCount = useTicketCount();
   const router = useRouter();
   const {data: session} = useSession();

   // Check if we are running in the browser
   useEffect(() => {
      setIsClient(true); // Hydrate the client
      const timer = setInterval(() => {
         setTimeLeft(calculateTimeLeft());
         setIsComplete(isCountdownComplete()); // updated completion indicator
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   interface buttonType{
   buttonType: 'primary' | 'secondary' | 'tartary' | 'subTartary';
   setButtonType: (
      type: 'primary' | 'secondary' | 'tartary' | 'subTartary'
   ) => void;
   buttonText: string;
   buttonConfig: ButtonConfig;
   isProcessing: boolean; 
}

   // Function to check if the user is signed in
   const isSignedIn = () => session?.user.status === 'authenticated'

   // Handle ticket purchase
   const handleTicketPurchase = () => {
      // Redirect to authentication if not signed in
      if (!isSignedIn()) {
         router.push('/auth-register');
         return null;
      }

      // Render the TicketPurchaseComponent if signed in
      return <TicketPurchaseComponent userAddress={''} user_id={''} />
   };

const buttonConfig: ButtonConfig = {
   text: 'Purchase',
   action: handleTicketPurchase,
   type: 'primary',

};

   return (
      <main className="relative h-screen overflow-hidden mt-12 mb-20 z-0">
         {/* YouTube Video Background */}
         <ResponsiveVideo />

         {/* Content */}
         <div className="relative h-full flex flex-col items-center justify-center text-white z-10 px-4 py-8">
            <div className="mt-20 md:mt-0">
               {' '}
               {/* Added margin top for mobile */}
               <h1 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-brown tracking-wide text-center text-white">
                  {isComplete ? 'Coming Soon...' : 'Welcome!'}
               </h1>
               <div className="text-center max-w-2xl mb-8 md:mb-12 px-4">
                  <p className=" md:text-xl text-white mb-2 leading-relaxed">
                     Prepare to experience the &ldquo;Leading Ladies&ldquo;. An
                     educational and interactive experience, one of the first of
                     its kind...
                  </p>
               </div>
            </div>
            {/* Countdown Timer */}
            {timeLeft ? (
               <div className="grid grid-cols-4 gap-6 mb-12">
                  <div className="flex flex-col items-center">
                     <div className="text-5xl font-bold mb-2 text-white">
                        {timeLeft.days}
                     </div>
                     <div className="text-sm uppercase text-white">Days</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-5xl font-bold mb-2 text-white">
                        {timeLeft.hours}
                     </div>
                     <div className="text-sm uppercase text-white">Hours</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-5xl font-bold mb-2 text-white">
                        {timeLeft.minutes}
                     </div>
                     <div className="text-sm uppercase text-white">Minutes</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-5xl font-bold mb-2 text-white">
                        {timeLeft.seconds}
                     </div>
                     <div className="text-sm uppercase text-white">Seconds</div>
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-4 gap-6 mb-12">
                  <div className="flex flex-col items-center">
                     <div className="text-5xl font-bold mb-2 animate-pulse text-amber-800 ">
                        00
                     </div>
                     <div className="text-sm uppercase text-white">Days</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-5xl font-bold mb-2 animate-pulse text-amber-800">
                        00
                     </div>
                     <div className="text-sm uppercase text-white">Hours</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-5xl font-bold mb-2 animate-pulse text-amber-800">
                        00
                     </div>
                     <div className="text-sm uppercase text-white">Minutes</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <div className="text-5xl font-bold mb-2 animate-pulse text-amber-800">
                        00
                     </div>
                     <div className="text-sm uppercase text-white">Seconds</div>
                  </div>
                  <div
                     className="absolute w-full text-center"
                     style={{ top: '-2rem' }}
                  >
                     <span className="inline-block animate-pulse text-amber-800 font-bold text-xl">
                        Exhibit Now Open!
                     </span>
                  </div>
               </div>
            )}

            {/* Ticket Purchase Section */}
            <div className="z-10 relative mb-8">
               
            <Buttons
               type={buttonConfig.type}
               size="large"
               onClick={buttonConfig.action}
               disabled={false}
               //@ts-ignore
               style={{
                  border: '2px solid white', // White edges
                  backgroundColor: 'transparent', // Optional: make the background transparent
                  color: 'white', // Text color
                  padding: '16px 32px', // Increased padding for a bigger button
                  fontSize: '1.5rem', // Increased font size for better visibility
                  borderRadius: '8px', // Rounded corners
                  transition: 'background-color 0.3s, transform 0.3s', // Smooth transitions
                  cursor: 'pointer', // Pointer cursor on hover
                  display: 'flex', // Use flexbox to align text
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                  textAlign: 'center', // Center text
               }}
               onMouseEnter={(e: {
                  currentTarget: {
                     style: { backgroundColor: string; transform: string };
                  };
               }) => {
                  e.currentTarget.style.backgroundColor =
                     'rgba(255, 255, 255, 0.2)'; // Change background on hover
                  e.currentTarget.style.transform = 'scale(1.05)'; // Slightly enlarge button on hover
               }}
               onMouseLeave={(e: {
                  currentTarget: {
                     style: { backgroundColor: string; transform: string };
                  };
               }) => {
                  e.currentTarget.style.backgroundColor = 'transparent'; // Reset background
                  e.currentTarget.style.transform = 'scale(1)'; // Reset size
               }}
            >
               Purchase
            </Buttons>
            </div>

            <div className="flex flex-col items-center mt-12">
               <div className="grid grid-cols-3 gap-8 text-center">
                  {/* First section: 6 Unique Stories and Artifacts Preserved */}
                  <div className="flex flex-col items-center">
                     <div className="text-6xl font-bold">6</div>
                     <div className="text-lg text-gray-300">
                     Stories
                     </div>
                  </div>

                  {/* Second section: Incrementing Tickets Sold */}
                  <div className="flex flex-col items-center">
                     <div className="text-6xl font-bold">{ticketCount}</div>
                     <div className="text-lg text-gray-300">Tickets Sold</div>
                  </div>

                  {/* Third section: 1 Collective Legacy */}
                  <div className="flex flex-col items-center">
                     <div className="text-6xl font-bold">1</div>
                     <div className="text-lg text-gray-300">
                      Legacy
                     </div>
                  </div>
               </div>
            </div>

            {/*  Different color */}
             <Link
               href="https://summitshare.co/blog/SJZH2lwwA"
               className="text-lg text-white underline hover:text-gray-300 transition-colors mt-10 md:mt-6"
               target="_blank"
               rel="noopener noreferrer"
            >
               learn more here
            </Link> 
         </div>
      </main>
   );
}
