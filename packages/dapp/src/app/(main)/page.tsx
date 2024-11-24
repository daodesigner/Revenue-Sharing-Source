import Buttons from '../components/button/Butons';
import BlogList from '../(test)/test/page';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';

const metadata: Metadata = {
   title: 'SummitShare',
   description:
      'A pioneering digital platform dedicated to the repatriation of African cultural artifacts. ',
   icons: {
      icon: '/favicon.ico',
   },
};

export default function Home() {
   const partners = [
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

   return (
      <div className=" space-y-24 mx-6 my-28 lg:mx-[15%]">
         <section className="border-b md:border-b-0 border-primary-900-5 space-y-[48px] pb-6 md:flex md:flex-row md:gap-4">
            <div className="w-full md:w-[45%] h-[342px] rounded-[0.5rem] overflow-hidden bg-[url('/all-women.png')] bg-cover bg-primary-50 bg-center"></div>
            <div className="space-y-6 md:space-y-0 md:w-[45%] md:flex md:flex-col md:justify-between">
               <div className="space-y-2">
                  <h2>The Leading Ladies</h2>
                  <p>
                     Those who walked before us and those to come. Those who wore
                     red clay masks and rested their heads on bended knees. Those
                     who washed the cowry bead and swung the snuff cup.Those who
                     weaved the baskets and wrapped the cloth. Those who fought
                     for peace and danced to the drum.
                  </p>
               </div>
               <div>
                  <Link href={'/cya'}>
                     <Buttons type="primary" size="large">
                        Enter
                     </Buttons>
                  </Link>
               </div>
            </div>
         </section>

         <section className="space-y-8">
            <div className="space-y-2">
               <h2>What Is SummitShare?</h2>
               <p>
                  {' '}
                  SummitShare stands as a pioneering digital platform dedicated to
                  the repatriation of African cultural artifacts. Bridging the
                  past and present, it serves as a beacon of hope and a testament
                  to the resilience of African heritage, utilizing the power of
                  blockchain technology to reclaim, celebrate, and share the rich
                  tapestry of Africa&apos;s history with the world. Check our
                  blogs to find out more.
               </p>
            </div>
            <div className="space-y-4 md:flex md:flex-row md:gap-4 md:w-[50%] md:items-center md:space-y-0">
               <div>
                  <Link href={'/donate'}>
                     <Buttons type="primary" size="large">
                        Donate
                     </Buttons>
                  </Link>
               </div>
               <div>
                  <Link href={'https://github.com/summitshare'}>
                     {' '}
                     <Buttons type="secondary" size="large">
                        Star repo
                     </Buttons>
                  </Link>
               </div>
            </div>
         </section>

         <section className="space-y-8">
            <div className="space-y-2 text-center">
               <h2>Our Partners</h2>
               <p>
                  Explore the incredible organizations supporting SummitShare&apos;s
                  mission to reclaim and celebrate African heritage.
               </p>
            </div>
            <div className="flex justify-center space-x-8 mb-12">
               {partners.map((partner, index) => (
                  <div key={index} className="relative group">
                     <div className="w-32 h-32 rounded-full overflow-hidden">
                        <Image
                           src={partner.logo}
                           alt={partner.name}
                           width={128}
                           height={128}
                           className="object-cover"
                        />
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                           href={partner.website}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="bg-white px-3 py-1 rounded-full text-sm flex items-center"
                        >
                           Go to website
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-1"
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
               ))}
            </div>
            {/* "See All" Button */}
            <div className="flex justify-center">
               <Link
                  href="/partners"
                  className="flex items-center text-blue-500 font-bold text-base bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all"
               >
                  See All
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
         </section>

         <section className="bg-primary-400 rounded-[0.5rem] w-full h-[21.375rem] flex flex-col items-center px-[2.813rem] justify-center space-y-12 ">
            <div className="space-y-2 text-center">
               <h3 className="text-white">Collaborate With Us</h3>
               <p className="text-center text-white">
                  Learn more and contribute to shaping this narrative. Every voice
                  matters, every insight adds to our shared heritage.
               </p>
            </div>
            <div className="w-[164px]">
               <Link href="https://forms.gle/rXvQy25pqEagxHoq9">
                  <Buttons type="tartary" size="large">
                     Register today
                  </Buttons>
               </Link>
            </div>
         </section>

         <section className="w-full space-y-6">
            <div className="sapce-y-2">
               <h2>Get updates</h2>
               <p>
                  {' '}
                  Read more about the project and the core team&apos;s updates{' '}
               </p>
            </div>
            <BlogList />
         </section>

         <section className="bg-primary-400 rounded-[0.5rem] w-full h-[21.375rem] flex flex-col items-center px-[2.813rem] justify-center space-y-12 ">
            <div className="space-y-2 text-center">
               <h3 className="text-white">Our Partners</h3>
               <p className="text-center text-white">
                  Come read and learn about our partners aiding us in the creation
                  of this canvas for where your contributions[brush strokes] are
                  to rest.
               </p>
            </div>
            <div className="w-[164px]">
               <Link href="partners">
                  <Buttons type="tartary" size="large">
                     Learn more
                  </Buttons>
               </Link>
            </div>
         </section>
      </div>
   );
}
