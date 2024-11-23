'use client';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import ConnectWalletPrompt from '@/utils/methods/ticketPurchase/connectModal';

export default function ConnectWallet() {
   const { address } = useAccount(); // Get the connected wallet address
   const router = useRouter();

   // Get the redirect URL from query parameters
   const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/';

   useEffect(() => {
      // If the wallet is connected, redirect to the original page
      if (address) {
         router.push(redirectUrl);
      }
   }, [address, redirectUrl, router]);

   return (
      <div className="h-screen flex items-center justify-center">
         <ConnectWalletPrompt />
      </div>
   );
}
