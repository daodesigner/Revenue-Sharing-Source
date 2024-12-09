import { Button } from '../components/button/Button';
import Link from 'next/link';
import { Metadata } from 'next';
import HeroSection from '../components/heroSection';
import Partners from './partners/page';
import BlogList from '../components/BlogList';
import InfoGrid from '../components/InfoCard';
import IntegrationGrid from '../components/IntegrationCard';
import LeadingLaides from '../components/leadingLaides';
import WhatIsSummitShare from '../components/whatIsSummitShare';
import ProblemSection from '../components/problemSection';
import CollaborateWithUs from '../components/collaborateWithUs';

const metadata: Metadata = {
  title: 'SummitShare',
  description:
    'A pioneering digital platform dedicated to the repatriation of African cultural artifacts. ',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero - Full width, no top margin */}
      <HeroSection />
      
      {/* Main content sections with consistent spacing */}
      <div className="flex flex-col space-y-32 md:space-y-48">
        {/* Container sections */}
        <div className="mt-16 md:mt-24">
          <WhatIsSummitShare />
        </div>

        <div>
          <ProblemSection />
        </div>

        {/* Solutions section */}
        <div className="bg-neutral-50 py-16 md:py-24 w-full">
          <InfoGrid />
        </div>

        {/* Implementation section */}
        <div>
          <IntegrationGrid />
        </div>

        {/* Updates section */}
        <div>
          <BlogList />
        </div>

        {/* Partners section - different background */}
        <div className=" py-16 md:py-24 w-full">
          <Partners />
        </div>

        {/* Call to action - more compact spacing */}
        <div className="mb-16 md:mb-24">
          <CollaborateWithUs />
        </div>
      </div>
    </main>
  );
}
