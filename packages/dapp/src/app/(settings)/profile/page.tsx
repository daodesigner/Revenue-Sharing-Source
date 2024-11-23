'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@/app/components/Container';
import Line from '@/app/components/Line';
import Buttons from '@/app/components/button/Butons';
import { Trash, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export default function ProfileSettings() {
   const router = useRouter();
   const { data: session } = useSession();
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);

   const userId = session?.user?.id || '';
   const userEmail = session?.user?.email || '';
   const user_name = session?.user?.username || '';

   // Handle account deletion
   const handleDeleteAccount = async () => {
      try {
         setIsDeleting(true);
         const response = await fetch('api/v1/user/delete', {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               userId: userId,
               email: userEmail,
            }),
         });

         if (!response.ok) {
            throw new Error('Failed to delete account');
         }

         toast.success('Account successfully deleted');
         router.push('/');
      } catch (error) {
         console.error('Error deleting account:', error);
         toast.error('Failed to delete account');
      } finally {
         setIsDeleting(false);
         setIsDeleteDialogOpen(false);
      }
   };

   return (
      <Container>
         <div className="relative min-h-screen pb-20 flex flex-col items-center">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 py-4 mb-6 w-full px-4">
               <h2 className="text-2xl font-semibold">Account Settings</h2>
            </div>

            <div className="space-y-8 w-full max-w-3xl px-6">
               {/* Profile Section */}
               <div className="space-y-4">
                  <section className="space-y-6 bg-white p-6 rounded-md shadow-md">
                     <div className="space-y-1">
                        <h3 className="font-inter text-xl font-medium">
                           Your Profile
                        </h3>
                        <p className="text-gray-600">
                           Manage your account settings.
                        </p>
                     </div>

                     {/* Email Display */}
                     <div className="space-y-2">
                        <label className="block text-sm font-medium">
                           Account Email
                        </label>
                        <div className="p-2 bg-gray-50 rounded-md text-gray-600">
                           {userEmail}
                        </div>
                     </div>

                     {/* Username Display */}
                     <div className="space-y-2">
                        <label className="block text-sm font-medium">
                           Username
                        </label>
                        <div className="p-2 bg-gray-50 rounded-md text-gray-600">
                           {user_name}
                        </div>
                     </div>

                     {/* Password Change Button */}
                     <div className="space-y-2">
                        <label className="block text-sm font-medium">
                           Password
                        </label>
                        <Buttons
                           type="secondary"
                           size="small"
                           onClick={() => router.push('/account/forgot-request')}
                        >
                           Change Password
                        </Buttons>
                     </div>
                  </section>
               </div>

               <Line />

               {/* Danger Zone */}
               <div className="space-y-4 bg-white p-6 rounded-md shadow-md">
                  <div className="space-y-1">
                     <h3 className="text-xl font-medium text-red-600">
                        Danger Zone
                     </h3>
                     <p className="text-gray-600">
                        Once you delete your account, there is no going back.
                        Please be certain.
                     </p>
                  </div>
                  <div className="w-fit">
                     <Buttons
                        type="secondary"
                        size="small"
                        onClick={() => setIsDeleteDialogOpen(true)}
                     >
                        Delete my account
                     </Buttons>
                  </div>
               </div>
            </div>

            {/* Custom Modal */}
            {isDeleteDialogOpen && (
               <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-md p-6 space-y-4 shadow-lg max-w-md w-full mx-4">
                     {/* Modal Header */}
                     <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                           <Trash className="w-5 h-5" />
                           Delete Account
                        </h3>
                        <button
                           onClick={() => setIsDeleteDialogOpen(false)}
                           className="text-gray-600 hover:text-gray-900 transition"
                        >
                           <XCircle className="w-6 h-6" />
                        </button>
                     </div>

                     {/* Modal Content */}
                     <p className="text-gray-600">
                        This action cannot be undone. This will permanently delete
                        your account and remove all associated data from our
                        servers.
                     </p>

                     {/* Modal Footer */}
                     <div className="flex justify-end gap-4">
                        <button
                           onClick={() => setIsDeleteDialogOpen(false)}
                           className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
                           disabled={isDeleting}
                        >
                           No, keep my account
                        </button>
                        <button
                           onClick={handleDeleteAccount}
                           className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
                           disabled={isDeleting}
                        >
                           {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </Container>
   );
}
