import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import {
   fetchAllTeamNotes,
   fetchNoteContent,
   parseNoteContent,
} from '@/lib/hackMD';
import Image from 'next/image';

const Note = async ({ params }: { params: { id: string } }) => {
   const noteId = params.id;

   // Log the noteId to ensure it is correctly captured -- only for dev
   // //console.log('Fetching note with ID---:', noteId);

   try {
      const note = await fetchNoteContent(noteId);
      const parsedNote = parseNoteContent(note.content);

      const processedContent = await unified()
         .use(remarkParse)
         .use(remarkGfm)
         .use(remarkHtml, { sanitize: false })
         .process(parsedNote.content);
      const contentHtml = processedContent.toString();

      return (
         <div className="relative min-h-screen w-full overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
               <div className="relative w-[150%] aspect-square">
                  <Image
                     src="https://summitshare3.s3.eu-north-1.amazonaws.com/IMG_3157.PNG"
                     alt="Watermark"
                     fill
                     className="object-contain rounded-full"
                  />
               </div>
            </div>

            {/* Content */}
            <div className="relative space-y-24 mx-6 my-28 lg:mx-[15%]">
               <h1>{parsedNote.data.title}</h1>
               <div
                  className="space-y-6 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
               />
            </div>
         </div>
      );
   } catch (error) {
      console.error('Error fetching note content:', error);
      return <div>Error loading note</div>;
   }
};

export default Note;
