/*
Category: Blockchain Interaction Layer
Purpose: Wallet Initialisation within the dev env
*/

import { ethers } from 'ethers';

// Initialize provider and signer from user's wallet
export const initializeUserWallet = () => {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   return { provider, signer };
};

export const initializeDevWallet = () => {
   const devPrivateKey = process.env.DEV_PRIVATE_KEY;
   const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || process.env.RPC_URL;

   if (!devPrivateKey || !rpcUrl) {
      throw new Error('Missing environment variables');
   }

   const connection: Record<string, any> = {
      url: rpcUrl,
      skipFetchSetup: true,
      fetchFunc: (body: string) => {
         return fetch(rpcUrl, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body
         });
      }
   };

   const provider = new ethers.providers.StaticJsonRpcProvider(connection, {
      chainId: 11155420,
      name: 'op-sepolia'
   });

   const wallet = new ethers.Wallet(devPrivateKey, provider);
   return { provider, wallet };
};
// Test Wallets - Should have Sepolia/OP Sepolia
export const testWallets = [
   process.env.araragi,
   process.env.shinobu,
   process.env.hanekawa,
   process.env.oshino,
];
