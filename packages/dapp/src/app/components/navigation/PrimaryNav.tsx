'use client';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../button/Button';
import { useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { UserCircle } from 'lucide-react';

/**
 * PrimaryNav component represents the main navigation bar for the application.
 * It includes navigation links, action buttons, and a responsive menu for smaller screens.
 */

const PrimaryNav: React.FC = () => {
   const router = useRouter();
   const session = useSession();

   const handleAuthClick = async () => {
      if (session.status === 'authenticated') {
         await signOut();
         router.push('/auth-sign-in');
         return;
      } else {
         router.push('/auth-sign-in');
         return;
      }
      return;
   };

   // Navigation items for the main nav bar
   const items: { name: string; link: string }[] = [
      { name: 'Exhibit', link: '/exhibit' },
      { name: 'Blog', link: '/blog' },
      // { name: 'Partners', link: '/partners' },
      { name: 'Support Us', link: '/donate' },
      { name: 'Insights', link: '/distribution' },
      { name: 'Help', link: '/help' },
   ];

   // Menu items for the responsive nav menu
   const menuItems: {
      title: string;
      items: { name: string; link: string }[];
   }[] = [
      {
         title: 'Pages',
         items: [
            { name: 'Exhibit', link: '/exhibit' },
            { name: 'Blog', link: '/blog' },
            { name: 'Support Us', link: '/donate' },
         ],
      },
      {
         title: 'Help',
         items: [{ name: 'Help', link: '/help' }],
      },
      {
         title: 'Dashboard',
         items: [{ name: 'Insights', link: '/distribution' }],
      },
      {
         title: 'Settings',
         items: [
            { name: 'Profile', link: '/profile' },
            {
               name: session?.status === 'authenticated' ? 'Log Out' : 'Log In',
               link:
                  session?.status === 'authenticated'
                     ? '/auth-sign-in'
                     : '/auth-sign-in',
            },
         ],
      },
   ];

   // State to manage the open/close state of the responsive menu
   const [openMenu, setOpenMenu] = useState<boolean>(false);

   const pathname = usePathname();
   const { address } = useAccount();

   return (
      <nav className="w-full">
         <ul className="fixed top-0 inset-x-0 px-6 py-4 lg:px-28 lg:py-6 flex flex-row justify-between items-center border-b border-primary-900-5 text-primary-900 z-10 bg-white">
            <li>
               <Link href="/">
                  <h1>
                     <span className="text-orange-500">Summit</span>Share
                  </h1>
               </Link>
            </li>
            <li className="sm:block hidden md:hidden lg:block">
               <ul className="flex flex-row gap-6 text-p1-m text-primary-100">
                  {items.map((item, index) => (
                     <li
                        key={index}
                        className={`hover:text-primary-600  hover:underline underline-offset-[0.625rem] cursor-pointer ${
                           pathname === item.link &&
                           'text-primary-600 underline underline-offset-[0.625rem] '
                        }`}
                     >
                        <a href={item.link}>{item.name}</a>
                     </li>
                  ))}
               </ul>
            </li>
            <li className="sm:block hidden md:hidden lg:block w-fit">
               <ul className="flex flex-row gap-4 items-center">
                  <li>
                  <ConnectKitButton.Custom>
                        {({ show }) => (
                           <Button onClick={show}>
                              Connect Wallet
                           </Button>
                        )}
                     </ConnectKitButton.Custom>
                  </li>
                  <li>
                     <div onClick={handleAuthClick}>
                        <Button variant={'outline'}>
                           {session.status === 'authenticated'
                              ? 'Sign Out'
                              : 'Sign In'}
                        </Button>
                     </div>
                  </li>
                  <li>
                     {session.status === 'authenticated' ? (
                        <Link href={'/profile'}>
                           <UserCircle className="w-8 h-8 text-neutral-500 hover:text-orange-500" />
                        </Link>
                     ) : (
                        <></>
                     )}
                  </li>
               </ul>
            </li>
            <li onClick={() => setOpenMenu(!openMenu)} className="lg:hidden">
               <Bars3Icon className="w-4" />
            </li>
            <nav
               className={`fixed inset-y-0 left-0 w-[70%] md:w-[40%] bg-white z-50 transform border-r border-primary-900-5 ${
                  openMenu ? 'translate-x-0' : '-translate-x-full'
               } transition-transform duration-300 ease-in-out`}
            >
               <div className="border-b border-primary-900-5 py-4">
                  <div className="px-6 flex flex-row justify-between text-primary-900">
                     <h2 className="text-primary-400">Menu</h2>
                     <XMarkIcon
                        onClick={() => setOpenMenu(!openMenu)}
                        className="w-4 cursor-pointer"
                     />
                  </div>
               </div>
               <ul className="px-6 py-4 mt-12 max-h-[80%] flex flex-col gap-12 justify-between overflow-y-auto">
                  {menuItems.map((menu, index) => (
                     <li
                        key={index}
                        className={`space-y-4 py-2 ${
                           index !== menuItems.length - 1
                              ? 'border-b border-primary-900-5'
                              : ''
                        }`}
                     >
                        <h4 className="font-normal text-primary-100">
                           {menu.title}
                        </h4>
                        <ul className="space-y-1">
                           {menu.items.map((subItem, subIndex) => (
                              <li
                                 key={subIndex}
                                 className={`text-[1.25rem] text-primary-700 font-normal ${
                                    pathname === subItem.link &&
                                    'text-primary-400'
                                 }`}
                              >
                                 <a href={subItem.link}>{subItem.name}</a>
                              </li>
                           ))}
                        </ul>
                     </li>
                  ))}
                  <li>
                     <ConnectKitButton />
                  </li>
               </ul>
            </nav>
         </ul>
      </nav>
   );
};

export default PrimaryNav;
