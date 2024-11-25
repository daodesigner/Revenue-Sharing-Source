import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { initializeDevWallet } from '@/utils/prod/walletInit';
import { contracts } from '@/utils/prod/contractInit';

// Constants
const USDT_AMOUNT = ethers.utils.parseUnits('5', 6); // 5 USDT (6 decimals)
const ETH_AMOUNT = ethers.utils.parseEther('0.00000606'); // 0.00000606 ETH (assuming 1 ETH = $3300)

// API Handler
export default async function handler(req: Request) {
   if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
   }

   try {
      const requestBody = await req.json();
      const { recipient }: { recipient: string } = requestBody;

      // Validate recipient address - low chance of bad addresses as they'll be pulled from session but just incase
      if (!ethers.utils.isAddress(recipient)) {
         return NextResponse.json(
            { error: 'Invalid Ethereum address' },
            { status: 400 }
         );
      }

      const { provider, wallet } = initializeDevWallet();
      const usdtContract = contracts.getUSDT();

      const [usdtBalance, ethBalance] = await Promise.all([
         usdtContract.balanceOf(wallet.address),
         provider.getBalance(wallet.address),
      ]);

      // Check if sufficient balances are available
      if (usdtBalance.lt(USDT_AMOUNT)) {
         return NextResponse.json(
            { error: 'Insufficient USDT balance' },
            { status: 400 }
         );
      }

      if (ethBalance.lt(ETH_AMOUNT)) {
         return NextResponse.json(
            { error: 'Insufficient ETH balance' },
            { status: 400 }
         );
      }

      // Send USDT and ETH transactions
      const [usdtTx, ethTx] = await Promise.all([
         usdtContract.transfer(recipient, USDT_AMOUNT),
         wallet.sendTransaction({
            to: recipient,
            value: ETH_AMOUNT,
         }),
      ]);

      // Wait for confirmations
      const [usdtReceipt, ethReceipt] = await Promise.all([
         usdtTx.wait(2),
         ethTx.wait(2),
      ]);

      return NextResponse.json(
         {
            success: true,
            usdtTxHash: usdtReceipt.transactionHash,
            ethTxHash: ethReceipt.transactionHash,
         },
         { status: 200 }
      );
   } catch (error: any) {
      console.error('Distribution error:', error);
      return NextResponse.json(
         {
            error: 'Distribution failed',
            details: error.message,
         },
         { status: 500 }
      );
   }
}
