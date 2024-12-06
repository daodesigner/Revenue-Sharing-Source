// ticketPurchaseLogic.ts
import {
   contracts,
   estimateGas,
   CONTRACT_ADDRESSES,
} from '@/utils/prod/contractInit';
import { PurchaseHandlerProps } from '@/utils/dev/frontEndInterfaces';
import { handleContractError } from '@/utils/dev/handleContractError';
import axios from 'axios';
import { validateTicket } from './ticketService';

export const handleTicketPurchase = async ({
   provider,
   ticketPrice,
   eventId,
   user_id,
   address,
   setStatus,
   setIsProcessing,
   setButtonText,
   setPurchaseSuccessful,
   setShowSuccessMessage,
   setHasTicket,
   setButtonType,
}: PurchaseHandlerProps) => {
   if (!provider) {
      setStatus('Web3 provider is not initialized.');
      return;
   }

   try {
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      const usdtContract = contracts.getUSDT();
      const museumContract = contracts.getMuseum();

      setStatus('Approving token transfer...');
      setIsProcessing(true);
      setButtonText('processing...');

      const balance = await usdtContract.balanceOf(userAddress);
      console.log({
         userAddress,
         balance: balance.toString(),
         requiredAmount: ticketPrice,
         network: (await provider.getNetwork()).name,
      });

      // Add balance check before approve
      if (balance < BigInt(ticketPrice)) {
         setStatus('Insufficient USDT balance');
         setButtonText('Insufficient USDT balance');
         setIsProcessing(false);
         return;
      }

      // Token approval
      const gasLimitApprove = await estimateGas(usdtContract, 'approve', [
         CONTRACT_ADDRESSES.MuseumAdd,
         ticketPrice,
      ]);
      const approveTx = await usdtContract.approve(
         CONTRACT_ADDRESSES.MuseumAdd,
         ticketPrice,
         {
            gasLimit: gasLimitApprove,
         }
      );
      await approveTx.wait(1);

      // Purchase ticket
      setStatus('Purchasing ticket...');
      const gasLimitPurchase = await estimateGas(
         museumContract,
         'purchaseTicket',
         [eventId, ticketPrice]
      );

      const purchaseTx = await museumContract.purchaseTicket(
         eventId,
         ticketPrice,
         {
            gasLimit: gasLimitPurchase,
         }
      );
      const receipt = await purchaseTx.wait(2);

      // Handle success
      await createTicketRecord(receipt, user_id);
      setPurchaseSuccessful(true);
      setShowSuccessMessage(true);
      setStatus('Ticket purchased successfully!');
      setIsProcessing(false);

      // Update ticket state
      setHasTicket(true);
      setButtonType('secondary');
      setButtonText('Ticket Purchased ✓');

      try {
         await validateTicket(
            address,
            eventId,
            user_id,
            setHasTicket,
            setButtonType,
            setButtonText
         );
      } catch (error) {
         console.error('Validation error:', error);
         // Don't change success state even if validation fails
      }
   } catch (error: any) {
      console.error('Smart Contract Interaction Failed:', error);
      const friendlyMessage = handleContractError(error);
      setStatus(friendlyMessage);
      setButtonText('Pay');
   }
};

const createTicketRecord = async (receipt: any, userId: string) => {
   const HOST = process.env.NEXT_PUBLIC_HOST;
   const userTicketData = {
      wallet_address: receipt.from,
      event_id: '419a0b2d-dee9-4782-9cff-341c5f8343a6',
      user_id: userId,
      eventLink: `${HOST}/exhibit`,
      transaction_id: receipt.transactionHash,
   };

   try {
      const response = await axios.post(
         'api/v1/events/tickets/create',
         userTicketData
      );
      if (response.status !== 200) {
         console.error('Failed to create ticket record:', response.data.message);
      }
   } catch (error) {
      console.error('Failed to create ticket record:', error);
   }
};
