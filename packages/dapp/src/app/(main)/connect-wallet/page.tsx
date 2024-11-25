'use client';

import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import ConnectWalletPrompt from '@/utils/methods/ticketPurchase/connectModal';

export default function ConnectWallet() {
   const { address } = useAccount();
   const router = useRouter();

   useEffect(() => {
      if (address) {
         const timer = setTimeout(() => {
            router.push('/exhibit');
         }, 2000);

         return () => clearTimeout(timer);
      }
   }, [address, router]);

   return (
      <div className="h-screen flex items-center justify-center">
         <ConnectWalletPrompt />
      </div>
   );
}
