import Link from 'next/link';
import React from 'react';
import { Button } from './button/Button';

function HeroSection() {
   return (
      <section className="bg-gradient-to-r from-orange-400 via-orange-600 to-orange-700 rounded-xl p-8 border-b md:border-b-0 border-primary-900-5 space-y-8 pb-10 md:flex md:flex-row md:gap-8">
         <div className="w-full md:w-1/2 h-[342px] rounded-lg overflow-hidden bg-[url('/all-women.png')] bg-cover bg-center bg-primary-50/25 "></div>
         <div className="space-y-6 md:w-1/2 flex flex-col justify-between">
            <div className="space-y-4">
               <h1 className="text-primary-50  font-bold">The Leading Ladies</h1>
               <p className="text-primary-50/80 leading-relaxed">
                  Those who walked before us and those to come. Those who wore red
                  clay masks and rested their heads on bended knees. Those who
                  washed the cowry bead and swung the snuff cup. Those who weaved
                  the baskets and wrapped the cloth. Those who fought for peace
                  and danced to the drum.
               </p>
            </div>
            <div className="flex gap-2">
               <Link href={'/cya'}>
                  <Button>Enter Exhibiit </Button>
               </Link>
               <Link href={'/distribution'}>
                  <Button variant="white">Learn more</Button>
               </Link>
            </div>
         </div>
      </section>
   );
}

export default HeroSection;
