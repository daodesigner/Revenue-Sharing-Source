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
   EventOrganizerServiceAdd: '',
   USDTAdd: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
   MuseumAdd: '0xA23Cd2AD1966b17cae9442410eE13A01f58358FF',
   EscrowAdd: '0x1a46734b26591ec4c023111d6f5785ae1a229d5f',
   exhibitId: '0xf2a23b768ff33701fa41a0e359782bbc74d44b2c',
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
      const { signer } = initializeUserWallet();
      return new ethers.Contract(
         CONTRACT_ADDRESSES.EscrowAdd,
         EventEscrowABI as ethers.ContractInterface,
         signer
      );
   },

   getUSDT: () => {
      const { signer } = initializeUserWallet();
      return new ethers.Contract(
         CONTRACT_ADDRESSES.USDTAdd,
         USDTABI as ethers.ContractInterface,
         signer
      );
   },

   getMuseum: () => {
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
