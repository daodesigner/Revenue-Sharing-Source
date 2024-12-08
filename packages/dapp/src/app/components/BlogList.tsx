import { fetchAllTeamNotes } from '@/lib/hackMD';
import { Note } from '@/utils/dev/frontEndInterfaces';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './button/Button';

const getExcerpt = (content: string, length: number = 100): string => {
   return content.length > length
      ? content.substring(0, length) + '...'
      : content;
};

const BlogList = async () => {
   try {
      const notes: Note[] = await fetchAllTeamNotes();

      return (
         <div className="container mx-auto px-4 py-12">
            <ul className="w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
               {notes.map((note) => (
                  <li key={note.shortId} className={`
                     relative w-full p-8
                     border-2 border-orange-600/50 
                     bg-white hover:bg-neutral-50
                     transform hover:-translate-y-1 transition-all duration-300 ease-in-out
                     shadow-[4px_4px_0px_0px_rgba(234,88,12,0.2)]
                     hover:shadow-[6px_6px_0px_0px_rgba(234,88,12,0.3)]
                  `}>
                     {/* Sharp corner decorations */}
                     {/* <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500" />
                     <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500" />
                     <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500" />
                     <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500" /> */}

                     <div className="relative flex flex-col gap-6 z-10">
                        <div className='space-y-2'>
                           <h3 className="text-2xl font-bold text-neutral-800">{note.title}</h3>
                           <p className="text-neutral-600 leading-relaxed">
                              {getExcerpt(note.content)}
                           </p>
                        </div>
                        <Link href={`/blog/${note.shortId}`}>
                           <Button className='flex gap-2 border border-orange-600 bg-orange-600 text-white hover:bg-orange-600/95 focus:ring-orange-600'>
                              Read More 
                              <ArrowRightIcon className='w-4 h-4' />
                           </Button>
                        </Link>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      );
   } catch (error) {
      console.error('Error in Blog component:', error);
      return (
         <div className="w-full h-full text-center bg-red-100 text-red-500 py-2">
            Error loading blog posts... Please Refresh...
         </div>
      );
   }
};

export default BlogList;