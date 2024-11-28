import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Partner {
   name: string;
   logo: string;
   website: string;
}

const partners: Partner[] = [
   {
      name: "Women's History Museum of Zambia",
      logo: 'https://s3.tebi.io/summitshare-images/whmzacc.png',
      website: 'https://www.whmzambia.org/',
   },
   {
      name: 'Ethereum Foundation',
      logo: 'https://s3.tebi.io/summitshare-images/EF.png',
      website: 'https://ethereum.foundation/',
   },
   {
      name: 'Octant',
      logo: 'https://s3.tebi.io/summitshare-images/octant.png',
      website: 'https://octant.app/',
   },
];

const Partners: React.FC = () => {
   return (
      <div className="flex flex-col items-center p-8 mt-24">
        
            <h1 className="text-3xl font-bold mb-12">
               Our Partners and Supporters
            </h1>
    

         {/* Staggered Grid */}
         <div className="grid gap-6 grid-cols-3">
            {/* Row 1 */}
            {partners.slice(0, 3).map((partner, index) => (
               <div key={index} className="flex justify-center">
                  <Link
                     href={partner.website}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={120}
                        className="rounded-full object-contain"
                     />
                  </Link>
               </div>
            ))}

            {/* Row 2 */}
            <div className="col-span-3 flex justify-center gap-12">
               {partners.slice(3, 5).map((partner, index) => (
                  <div key={index} className="flex justify-center">
                     <Link
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <Image
                           src={partner.logo}
                           alt={partner.name}
                           width={120}
                           height={120}
                           className="rounded-full object-contain"
                        />
                     </Link>
                  </div>
               ))}
            </div>

            {/* Row 3 */}
            {partners.slice(5, 8).map((partner, index) => (
               <div key={index} className="flex justify-center">
                  <Link
                     href={partner.website}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={120}
                        className="rounded-full object-contain"
                     />
                  </Link>
               </div>
            ))}
         </div>

         <p className="text-center max-w-3xl mt-12">
            SummitShare is a collaborative initiative focused on reshaping the
            narrative around repatriation and reclaiming history, with the support
            of dedicated partners who help bring its vision to life.
         </p>

         <div className="mt-12">
            <Link
               href="https://summitshare.co/blog/BkntmFS8R"
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center text-blue-500 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
               Read more about our them
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
               </svg>
            </Link>
         </div>
      </div>
   );
};

export default Partners;
