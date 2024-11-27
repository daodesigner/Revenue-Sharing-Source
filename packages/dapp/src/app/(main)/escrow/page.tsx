'use client'
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import EventEscrowComponent from '@/functonality/eventEscrowComponent';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AUTHORIZED_WALLET = process.env.AUTHORIZED_WALLET ?? '';
const AUTHORIZED_USER_ID = process.env.AUTHORIZED_USER_ID ?? '';


const FundDistributionPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { address } = useAccount();

  // Handle loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Handle unauthenticated state
  if (status === 'unauthenticated') {
    router.push('/auth-sign-in');
    return null;
  }

  // Check wallet and user ID
  const hasValidWallet = address?.toLowerCase() === AUTHORIZED_WALLET.toLowerCase();
  const hasValidUserId = session?.user?.id === AUTHORIZED_USER_ID;

  // Show error if permissions are invalid
  if (!hasValidWallet || !hasValidUserId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Access denied. You do not have the required permissions to access this page.
            {!hasValidWallet && " Invalid wallet address."}
            {!hasValidUserId && " Invalid user ID."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Fund Distribution Dashboard</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <EventEscrowComponent userAddress={address} />
      </div>
    </div>
  );
};

export default FundDistributionPage;