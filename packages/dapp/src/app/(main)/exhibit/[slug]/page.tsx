'use client';
import DynamicCanvas from '@/app/components/3DCanvas/3dCanvas';
import { data } from './data';
import { Button } from '@/app/components/button/Button';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface PageProps {
   params: { slug: string };
}

const Page = ({ params }: PageProps) => {
   const router = useRouter();
   const [currentIndex, setCurrentIndex] = useState<number>(-1);
   const [isImageLoading, setIsImageLoading] = useState(true);

   useEffect(() => {
      const index = data.findIndex(
         (item) => item.title.toLowerCase().replace(/ /g, '-') === params.slug
      );

      if (index === -1) {
         router.push('/exhibit');
         return;
      }

      setCurrentIndex(index);
      // Reset image loading state when changing figures
      setIsImageLoading(true);
   }, [params.slug, router]);

   if (currentIndex === -1) {
      return (
         <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse text-lg font-medium text-gray-700">
               Loading...
            </div>
         </div>
      );
   }

   const figure = data[currentIndex];
   if (!figure) {
      return (
         <div className="w-full h-full flex items-center justify-center">
            <div className="text-lg font-medium text-gray-700">
               Figure not found
            </div>
         </div>
      );
   }

   const handleBack = () => {
      if (currentIndex > 0) {
         const prevSlug = data[currentIndex - 1].title.toLowerCase().replace(/ /g, '-');
         router.push(`/exhibit/${prevSlug}`);
         window.scrollTo(0, 0);
      }
   };

   const handleNext = () => {
      if (currentIndex < data.length - 1) {
         const nextSlug = data[currentIndex + 1].title.toLowerCase().replace(/ /g, '-');
         router.push(`/exhibit/${nextSlug}`);
         window.scrollTo(0, 0);
      }
   };

   const handleClose = () => {
      router.push('/exhibit');
   };

   return (
      <div className="space-y-12 mx-6 my-28 lg:mx-[15%] relative mt-40">
         <div className="w-full flex justify-between items-center">
            <h2>{figure.title}</h2>
            <button
               onClick={handleClose}
               className="text-neutral-900 hover:text-orange-600 hover:underline"
               aria-label="Close and return to exhibit"
            >
               Close
            </button>
         </div>

         <article className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 gap-6 w-full relative">
            <DynamicCanvas>{figure.object_URL}</DynamicCanvas>

            <div className="absolute top-0 left-7 transform -translate-y-1/2">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
               <div className="order-2 md:order-1 space-y-6">
                  <ul className="space-y-4">
                     {figure.figure_details.map((desc, index) => (
                        <li key={index}>
                           <p className="text-primary-100">{desc}</p>
                        </li>
                     ))}
                  </ul>
                  {figure.figure_biography.map((bio, index) => (
                     <p key={index}>{bio}</p>
                  ))}
               </div>

               <div className="order-1 md:order-2">
                  <div className="relative md:h-[600px] h-[365px] py-4 w-full">
                     {isImageLoading && (
                        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
                     )}
                     <Image
                        src={figure.image}
                        alt={figure.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-lg"
                        priority={true}
                        quality={90}
                        onLoad={() => setIsImageLoading(false)}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0FFRUVHSIeHhUVHiIYGBUVFRUYGBUWFhoaIRwUJCoeJCQqLCwsGiYzOi0uOiouLCz/2wBDAREVFRgYGBwgHBwsLCYqLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                     />
                  </div>
               </div>
            </div>
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

         <div className="flex gap-2">
            <Button onClick={handleBack} variant={'outline'}>
               Previous Artifact
            </Button>
            <Button onClick={handleNext}>Next Artifact</Button>
         </div>
      </div>
   );
};

export default Page;