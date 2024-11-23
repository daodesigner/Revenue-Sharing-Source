'use client';
import React from 'react';
import { ConnectKitButton, useModal } from 'connectkit';
import { useAccount } from 'wagmi';

export default function ConnectWalletPrompt() {
   const { address } = useAccount(); // Get connected wallet address
   const { open, setOpen } = useModal(); // Access ConnectKit modal state

   // Show modal programmatically if no wallet is connected
   React.useEffect(() => {
      if (!address) {
         setOpen(true); // Open ConnectKit modal
      }
   }, [address, setOpen]);

   return (
      <div>
         {!address ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white p-6 rounded-md w-96 shadow-lg">
                  <h2 className="text-xl font-bold mb-4 text-center">
                     Connect Your Wallet
                  </h2>
                  <p className="mb-6 text-gray-600 text-center">
                     Please connect your wallet to continue.
                  </p>
                  <div className="flex justify-center">
                     <ConnectKitButton /> {/* Connect Wallet Button */}
                  </div>
               </div>
            </div>
         ) : (
            <p className="text-green-600 mt-4 text-center">
               Wallet Connected: {address}
            </p>
         )}
      </div>
   );
}
