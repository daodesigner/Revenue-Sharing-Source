'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, RefCallback } from 'react';
import Image from 'next/image';
import { validatePageAccess } from '@/utils/methods/ticketPurchase/ticketService';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingDots from './loadingDots';
import { Button } from '@/app/components/button/Button';
import CollaborateWithUs from '@/app/components/collaborateWithUs';

interface WomanData {
   name: string;
   image: string;
   video: string;
   link: string;
   artifact: string;
}

interface VideoRefs {
   [key: string]: HTMLVideoElement | null;
}

export default function Home(): JSX.Element {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [loadingItem, setLoadingItem] = useState<string | null>(null);
   const videoRefs = useRef<VideoRefs>({});

   const { address } = useAccount();
   const router = useRouter();
   const session = useSession();

   const setVideoRef: RefCallback<HTMLVideoElement> = (element) => {
      if (element) {
         const name = element.getAttribute('data-name');
         if (name) {
            videoRefs.current[name] = element;
         }
      }
   };

   useEffect(() => {
      const validateAccess = async (): Promise<void> => {
         setIsLoading(true);
         if (!address) {
            router.push('/connect-wallet');
            return;
         }

         try {
            const { hasAccess } = await validatePageAccess(address, router, session);
            if (!hasAccess) {
               // Handle no access case if needed
            }
         } catch (error) {
            console.error('Access validation error:', error);
         } finally {
            setIsLoading(false);
         }
      };

      session.status === 'authenticated' ? validateAccess() : setIsLoading(false);
   }, [address, router, session]);

   const handleMouseEnter = (name: string): void => {
      const video = videoRefs.current[name];
      if (video) {
         video.play().catch((err: Error) => console.log("Autoplay prevented:", err));
      }
   };

   const handleMouseLeave = (name: string): void => {
      const video = videoRefs.current[name];
      if (video) {
         video.pause();
         video.currentTime = 0;
      }
   };

   const handleCardClick = (name: string, link: string): void => {
      setLoadingItem(name);
      router.push(link);
   };

   const women: WomanData[] = [{
      name: 'Mwenye',
      image: "https://s3.tebi.io/summitshare-previews/1.png",
      video: 'https://s3.tebi.io/summitshare-videos/01_Drum_Preview.mp4',
      link: '/exhibit/julia-chikamoneka',
      artifact: 'Double Sided Drum',
   }, {
      name: 'Mwape',
      image: "https://s3.tebi.io/summitshare-previews/2.png",
      video: 'https://s3.tebi.io/summitshare-videos/02_Girdle_Belt_Preview.mp4',
      link: '/exhibit/mwenya-mukulu',
      artifact: 'Cowry Beads',
   }, {
      name: 'Lueji Wa Nkonde',
      image: "https://s3.tebi.io/summitshare-previews/3.png",
      video: 'https://s3.tebi.io/summitshare-videos/03_Snuff%20Box_Preview.mp4',
      link: '/exhibit/mwape',
      artifact: 'Snuff Cup',
   }, {
      name: 'Julia Chikamoneka',
      image: "https://s3.tebi.io/summitshare-previews/4.png",
      video: 'https://s3.tebi.io/summitshare-videos/04_Headrest_Preview%20%281%29.mp4',
      link: '/exhibit/lueji-wa-nkonde',
      artifact: 'Headrest',
   }, {
      name: 'Mukwae',
      image: "https://s3.tebi.io/summitshare-previews/5.png",
      video: 'https://s3.tebi.io/summitshare-videos/05_Calabash_Preview.mp4',
      link: '/exhibit/mukwae',
      artifact: 'Calabash',
   }, {
      name: 'Loongo',
      image: "https://s3.tebi.io/summitshare-previews/6.png",
      video: 'https://s3.tebi.io/summitshare-videos/06_Mask__Preview%20%281%29.mp4',
      link: '/exhibit/loongo',
      artifact: 'Luvale Mask',
   }];

   if (isLoading) {
      return (
         <div className="h-screen w-full flex items-center justify-center">
            <p>Loading...</p>
         </div>
      );
   }

   return (
      <div className="min-h-screen">
         <section className="relative w-full h-screen overflow-hidden">
            <Image
               src="https://s3.tebi.io/summitshare-images/WHM%20Baskets.jpg"
               alt="WHM Baskets"
               fill
               className="object-cover object-left-top"
               sizes="(max-width: 768px) 100vw, 100vw"
               priority
               quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

            <div className="relative h-full z-[3] container px-4 md:px-[15%]">
               <div className="h-full flex items-end md:items-center pb-16 md:pb-0">
                  <div className="w-full md:max-w-2xl">
                     <div className="backdrop-blur-sm bg-white/75 p-8 md:p-10 rounded-xl shadow-2xl border border-white/20">
                        <div className="space-y-8">
                           <div className="space-y-6">
                              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight leading-tight">
                                 The Leading Ladies of Zambia
                              </h1>
                              <p className="text-neutral-700 md:text-xl leading-relaxed">
                                 Those who walked before us and those to come. Those who wore red
                                 clay masks and rested their heads on bended knees. Those who
                                 washed the cowry bead and swung the snuff cup. Those who weaved
                                 the baskets and wrapped the cloth. Those who fought for peace
                                 and danced to the drum.
                              </p>
                           </div>
                           <div className="flex gap-2">
                              <Link href="https://oncyber.io/spaces/89cp8FpYgF5hgrHk1i3N">
                                 <Button>Enter Exhibit</Button>
                              </Link>
                              <Link href="/distribution">
                                 <Button variant="white">Learn more</Button>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="w-full px-6 md:px-[15%] py-24 max-w-[1920px] mx-auto">
            <div className="space-y-4 mb-10">
               <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight relative after:content-[''] after:block after:w-24 after:h-1 after:bg-orange-500 after:mt-4">
                  Artifacts
               </h2>
               <p className="text-lg md:text-xl leading-relaxed text-neutral-700 max-w-2xl">
                  Explore the lives of the leading ladies through their cherished
                  artifacts, digitally restored and viewable in stunning detail from all angles.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 auto-rows-fr">
               {women.map((item) => (
                  <div
                     key={item.name}
                     onClick={() => handleCardClick(item.name, item.link)}
                     className="group bg-nutral-100 relative flex flex-col gap-6 justify-end h-64 rounded-lg p-4 overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
                     onMouseEnter={() => handleMouseEnter(item.name)}
                     onMouseLeave={() => handleMouseLeave(item.name)}
                  >
                     {loadingItem === item.name ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 z-30">
                           Loading...
                        </div>
                     ) : (
                        <>
                           <div className="absolute inset-0 bg-primary-900/35 z-[4] rounded-lg" />

                           <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover z-[2] md:transition-opacity md:duration-300 md:group-hover:opacity-0"
                           />

                           <video
                              ref={setVideoRef}
                              data-name={item.name}
                              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1] hidden md:block"
                              src={item.video}
                              muted
                              playsInline
                              loop
                           />

                           <div className="z-[5] space-y-2 relative">
                              <div className="space-y-1">
                                 <p className="text-white text-lg font-medium">{item.artifact}</p>
                                 <p className="text-white/80 text-sm">{item.name}</p>
                              </div>
                              <div className="w-[66px]">
                                 <Button variant="white" size="small">View</Button>
                              </div>
                           </div>
                        </>
                     )}
                  </div>
               ))}
            </div>
         </section>

         <CollaborateWithUs />
      </div>
   );
}