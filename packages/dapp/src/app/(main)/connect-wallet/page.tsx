'use client';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import ConnectWalletPrompt from '@/utils/methods/ticketPurchase/connectModal';

export default function ConnectWallet() {
   const { address } = useAccount();
   const router = useRouter(); //
   const [redirectUrl, setRedirectUrl] = useState('/');

   useEffect(() => {
      // Extract the redirect URL from query parameters
      const params = new URLSearchParams(window.location.search);
      setRedirectUrl(params.get('redirect') || '/exhibit');
   }, []);

   useEffect(() => {
      // Redirect once wallet is connected
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