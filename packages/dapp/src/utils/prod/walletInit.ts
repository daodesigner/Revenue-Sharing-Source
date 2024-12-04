/*
Category: Blockchain Interaction Layer
Purpose: Wallet Initialisation within the prod env
*/

import { ethers } from 'ethers';

interface JsonRpcConnectionInfo {
   url: string;
   skipFetchSetup?: boolean;
   headers?: Record<string, string>;
 }

// Initialize provider and signer from user's wallet
export const initializeUserWallet = () => {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   return { provider, signer };
};

export const initializeDevWallet = () => {
    // initialization requirements
   const devPrivateKey = process.env.PROD_PRIVATE_KEY;
   const rpcUrl = process.env.PROD_RPC_URL;
   

   if (!devPrivateKey || !rpcUrl) {
      throw new Error('Missing environment variables');
   }

   const connection: JsonRpcConnectionInfo = {
      url: rpcUrl,
      skipFetchSetup: true,
      headers: {
         'Content-Type': 'application/json',
      }
   };

   const provider = new ethers.providers.StaticJsonRpcProvider(connection, {
      chainId: 10,
      name: 'optimism'
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

