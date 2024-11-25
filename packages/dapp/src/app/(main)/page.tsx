import {Button} from '../components/button/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/heroSection';
import Partners from './partners/page';
import { useRouter } from 'next/navigation';
import BlogList from '../components/BlogList';

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
      <HeroSection/>

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
            <div className="flex  gap-2">
               <div>
                  <Link href={'/donate'}>
                     <Button variant={"default"} >
                        Donate
                     </Button>
                  </Link>
               </div>
               <div>
                  <Link href={'https://github.com/summitshare'}>
                     {' '}
                     <Button variant={"outline"} >
                        Star repo
                     </Button>
                  </Link>
               </div>
            </div>
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
    <h3 className="text-white text-2xl font-bold">Collaborate With Us</h3>
    <p className="text-center text-white/80 ">
      Learn more and contribute to shaping this narrative. Every voice matters, every insight adds to our shared heritage.
    </p>
    <div className="w-[164px] mt-4 z-[5]">
    <Link href="https://forms.gle/rXvQy25pqEagxHoq9">
      <Button variant={"white"}>Register today</Button>
    </Link>
  </div>
         
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

      <Partners/>
      </div>
   );
}
