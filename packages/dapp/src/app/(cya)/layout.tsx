'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from '@/redux/provider';
import { SessionProvider } from 'next-auth/react';
import Footer from '../components/navigation/footer';
import PrimaryNav from '../components/navigation/PrimaryNav';
import { Web3Provider } from '@/functonality/Web3Provider';
import { ApolloWrapper } from '../(main)/apolloWrapper';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
   title: 'SummitShare',
   description:
      'A pioneering digital platform dedicated to the repatriation of African cultural artifacts. ',
   icons: {
      icon: '/favicon.ico',
   },
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={``}>
            <metadata>
               <SessionProvider>
                  <ApolloWrapper>
                     <Web3Provider>
                        <Providers>
                           <div className="">{children} </div>
                        </Providers>
                     </Web3Provider>
                  </ApolloWrapper>
               </SessionProvider>
            </metadata>
         </body>
      </html>
   );
}