'use client'
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from '@/redux/provider';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//    title: 'SummitShare',
//    description:
//       'A pioneering digital platform dedicated to the repatriation of African cultural artifacts. ',
// };

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className="bg-primary-600">
         <SessionProvider>
            <Providers>
           
            {children}
            
               </Providers>
               </SessionProvider>
         </body>
      </html>
   );
}
