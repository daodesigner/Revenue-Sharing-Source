import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { initializeDevWallet } from '@/utils/dev/walletInit';
import { contracts } from '@/utils/dev/contractInit'

// production values:
// import { initializeDevWallet } from '@/utils/prod/walletInit';
// import { contracts } from '@/utils/prod/contractInit';

const USDT_AMOUNT = ethers.utils.parseUnits('5', 6); // USDT decimals = 6
const MUSDC_AMOUNT = ethers.utils.parseUnits('5', 18) // MOCK decimals = 18
const ETH_AMOUNT = ethers.utils.parseEther('0.00000606'); 

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        const { recipient } = await req.json();
        
        if (!ethers.utils.isAddress(recipient)) {
            return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
        }

        // initialize dev wallet 
        const { provider, wallet } = initializeDevWallet();
        // intialize dev mock USDC contract 
        const usdtContract = contracts.getMUSDC();

        // initalize OP USDT contract
        // const usdtContract = contracts.getUSDT();

        // wallet balance check 
        const [usdtBalance, ethBalance, feeData] = await Promise.all([
            usdtContract.balanceOf(wallet.address),
            provider.getBalance(wallet.address),
            provider.getFeeData()
        ]);

        if (!feeData.maxFeePerGas || !feeData.maxPriorityFeePerGas) {
            throw new Error('Could not estimate gas fees');
        }
      //   PROD:
      //   if (usdtBalance.lt(USDT_AMOUNT)) {
      //       return NextResponse.json({ error: 'Insufficient USDT' }, { status: 400 });
      //   }

      //   DEV:
        if (usdtBalance.lt(MUSDC_AMOUNT)) {
         return NextResponse.json({ error: 'Insufficient USDT' }, { status: 400 });
     }

        if (ethBalance.lt(ETH_AMOUNT)) {
            return NextResponse.json({ error: 'Insufficient ETH' }, { status: 400 });
        }

        const nonce = await wallet.getTransactionCount();
        const txParams = {
            gasLimit: 100000,
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
        };

        const [usdtTx, ethTx] = await Promise.all([
            usdtContract.transfer(recipient, USDT_AMOUNT, {
                ...txParams,
                nonce
            }),
            wallet.sendTransaction({
                to: recipient,
                value: ETH_AMOUNT,
                ...txParams,
                gasLimit: 50000,
                nonce: nonce + 1
            })
        ]);

        const [usdtReceipt, ethReceipt] = await Promise.all([
            usdtTx.wait(1),
            ethTx.wait(1)
        ]);

        return NextResponse.json({
            success: true,
            usdtTxHash: usdtReceipt.transactionHash,
            ethTxHash: ethReceipt.transactionHash
        });

    } catch (error: any) {
        console.error('Distribution error:', error);
        return NextResponse.json({
            error: 'Distribution failed',
            details: error.message
        }, { status: 500 });
    }
}