'use client';
import SummitShareCanvas from '@/app/components/3DCanvas/3dCanvas';
import { data } from './data';
import { Button } from '@/app/components/button/Button';
import { X } from 'lucide-react';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

// Fetch the data based on the slug
const getData = (slug: string) => {
   return data.find(
      (item) => item.title.toLowerCase().replace(/ /g, '-') === slug
   );
};

interface PageProps {
   params: { slug: string };
}

const Page = ({ params }: { params: { slug: string } }) => {
   const router = useRouter();
   const [currentIndex, setCurrentIndex] = useState(() =>
      data.findIndex(
         (item) => item.title.toLowerCase().replace(/ /g, '-') === params.slug
      )
   );

   const figure = data[currentIndex];

   if (!figure) {
      return <div>Figure not found</div>;
   }

   const handleBack = () => {
      if (currentIndex > 0) {
         setCurrentIndex(currentIndex - 1);
         window.scrollTo(0, 0);
      }
   };

   const handleNext = () => {
      if (currentIndex < data.length - 1) {
         setCurrentIndex(currentIndex + 1);
         window.scrollTo(0, 0);
      }
   };

   const handleClose = () => {
      router.push('/exhibit');
   };

   return (
      <div className="space-y-12 mx-6 my-28 lg:mx-[15%] relative mt-40">
        
<div className='w-full flex justify-between items-center'>
<h2>{figure.title}</h2>
<button
            onClick={handleClose}
            className=" "
            aria-label="Close and return to exhibit"
         >
           <p className='text-neutral-900 hover:text-orange-600 hover:underline'>Close</p>
         </button>
</div>
      
         <article className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 gap-6 w-full">
            <SummitShareCanvas>{figure.object_URL}</SummitShareCanvas>

            <div className="absolute left-7 left-1/2 transform -translate-y-1/2">
               <a
                  href={figure.object_address}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-gray-700 px-4 py-1 rounded-full text-xs border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
               >
                  Explorer
               </a>
            </div>

            <ul className="flex flex-col gap-3">
               <h2>About the {figure.object_name}</h2>
               <div className="h-1 w-24 bg-orange-500 mt-3" />
               {figure.Object_description.map((desc, index) => (
                  <li key={index}>
                     <p>{desc}</p>
                  </li>
               ))}
            </ul>
         </article>

         <ul className="space-y-3">
            <h2>Biography</h2>
            <div className="h-1 w-24 bg-orange-500 mt-3" />

            <ul className="space-y-3">
               <li>
                  <ul className="space-y-4 ">
                     {figure.figure_details.map((desc, index) => (
                        <li key={index}>
                           <p className="text-primary-100">{desc}</p>
                        </li>
                     ))}
                  </ul>
               </li>
            </ul>
            {figure.figure_biography.map((bio, index) => (
               <li key={index}>
                  <p>{bio}</p>
               </li>
            ))}
         </ul>

         <div className="space-y-3">
            <h2>References</h2>
            <ul className="space-y-2">
               {figure.figure_references.map((refArray, index) => (
                  <li key={index}>
                     {refArray.map((ref, subIndex) => (
                        <a
                           key={subIndex}
                           href={ref}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-block bg-white text-gray-800 border border-gray-300 rounded-full px-3 py-1 text-sm font-medium shadow-sm"
                        >
                           {ref}
                        </a>
                     ))}
                  </li>
               ))}
            </ul>
         </div>


      </div>
   );
};

export default Page;
