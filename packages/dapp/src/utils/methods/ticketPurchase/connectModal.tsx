'use client';
import React from 'react';
import { ConnectKitButton, useModal } from 'connectkit';
import { useAccount } from 'wagmi';
import WalletStatus from '@/functonality/walletStatus';

export default function ConnectWalletPrompt() {
   const { address } = useAccount(); // Get connected wallet address

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
               Your connected address: <WalletStatus />
            </p>
         )}
      </div>
   );
}