/*
Category: Blockchain Interaction Layer
Purpose: Provides utility functions for initializing and interacting with smart contracts on the blockchain using ethers.js. Includes contract address management and ABI imports for seamless integration within the application.
*/

import { ethers } from 'ethers';
import { initializeDevWallet, initializeUserWallet } from './walletInit';

import EventOrganizerServiceABI from '../prod/abis/EventOrganizerService.json';
import MuseumABI from '../prod/abis/Museum.json';
import ArtifactNFTABI from '../prod/abis/ArtifactNFT.json';
import EventEscrowABI from '../prod/abis/EventEscrow.json';
import ExhibitNFTABI from '../prod/abis/ExhibitNFT.json';
import USDTABI from '../prod/abis/usdtoptimism.json';

export const CONTRACT_ADDRESSES = {
   EventOrganizerServiceAdd: '0x662388C92915aD4be269452E7069d4AC56b07e82',
   USDTAdd: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
   MuseumAdd: '0x3935e5BED378aCeD49655b3E1fA8c0e68550fbaa',
   EscrowAdd: '0xf38bfab9369664537c0dd3c56deed489c530e6e7',
   exhibitId: '0xbf41a8ff480edc10f5d65a9bf7ccc8b36ec1dd38',
   eventId: 'LLE1',
};

// Export ABIs directly
export const ABIs = {
   EventOrganizerServiceABI,
   MuseumABI,
   ArtifactNFTABI,
   EventEscrowABI,
   USDTABI,
   ExhibitNFTABI,
};

export const contracts = {
   getEventOrganizerService: () => {
      const { wallet } = initializeDevWallet();
      return new ethers.Contract(
         CONTRACT_ADDRESSES.EventOrganizerServiceAdd,
         EventOrganizerServiceABI as ethers.ContractInterface, // `unknown` operator is used to dodge a type issue which can also be solved by removing the outer tags of the contract ABI
         wallet
      );
   },

   getArtifactNFT: (address: string) => {
      // Accepting dynamic address for flexibility
      const { wallet } = initializeDevWallet();
      return new ethers.Contract(
         address, // Using a dynamic address for ArtifactNFT instances
         ArtifactNFTABI as ethers.ContractInterface,
         wallet
      );
   },

   getEventEscrow: () => {
      if (typeof window === 'undefined') {
         throw new Error('initializeUserWallet cannot be used server-side');
      }

      const { signer } = initializeUserWallet();
      return new ethers.Contract(
         CONTRACT_ADDRESSES.EscrowAdd,
         EventEscrowABI as ethers.ContractInterface,
         signer
      );
   },

   getUSDT: () => {
      const { wallet } = initializeDevWallet();
      return new ethers.Contract(
         CONTRACT_ADDRESSES.USDTAdd,
         USDTABI as ethers.ContractInterface,
         wallet
      );
   },

   getMuseum: () => {
      if (typeof window === 'undefined') {
         throw new Error('initializeUserWallet cannot be used server-side');
      }
      
      const { signer } = initializeUserWallet();
      return new ethers.Contract(CONTRACT_ADDRESSES.MuseumAdd, MuseumABI, signer);
   },

   getExhibitNFT: (address: string) => {
      // Accepting dynamic address for flexibility
      const { wallet } = initializeDevWallet();
      return new ethers.Contract(
         address, // Using a dynamic address for ArtifactNFT instances
         ExhibitNFTABI as ethers.ContractInterface,
         wallet
      );
   },
};

export async function estimateGas(
   contract: ethers.Contract,
   method: string,
   args: any[]
): Promise<bigint> {
   try {
      const estimatedGas = await contract.estimateGas[method](...args);
      // Add a buffer to the estimated gas (e.g., 20% more)
      return BigInt(Math.floor(Number(estimatedGas) * 1.2));
   } catch (error) {
      console.error(`Error estimating gas for ${method}:`, error);
      throw error;
   }
}
