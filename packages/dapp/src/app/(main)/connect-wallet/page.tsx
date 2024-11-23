'use client';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter, useSearchParams } from 'next/navigation';
import ConnectWalletPrompt from '@/utils/methods/ticketPurchase/connectModal';

export default function ConnectWallet() {
   const { address } = useAccount();
   const router = useRouter();
   const searchParams = useSearchParams();

   const redirectUrl = searchParams.get('redirect') || '/';

   useEffect(() => {
      if (address) {
         router.push(redirectUrl);
      }
   }, [address, redirectUrl, router]);

   return (
      <React.Suspense fallback={<p>Loading...</p>}>
         <div className="h-screen flex items-center justify-center">
            <ConnectWalletPrompt />
         </div>
      </React.Suspense>
   );
}
