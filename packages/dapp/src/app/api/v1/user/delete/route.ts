import { NextResponse } from 'next/server';
import prisma from '../../../../../../config/db';
import { emailServer, transporter } from '../../../../../../config/nodemailer';
import * as fs from 'fs/promises';
import * as path from 'path';

async function sendDeletionConfirmationEmail(email: string) {
   try {
      // Read HTML template
      async function readHtmlTemplate(filePath: string): Promise<string> {
         try {
            const htmlContent = await fs.readFile(filePath, 'utf-8');
            return htmlContent;
         } catch (error) {
            console.error('Error reading HTML template:', error);
            throw new Error('Error reading HTML template');
         }
      }

      const templatePath = path.join(
         process.cwd(),
         'src/functionality/emailNewsletter/main.html'
      );
      let htmlTemplate = await readHtmlTemplate(templatePath);

      // Replace template placeholders
      htmlTemplate = htmlTemplate.replace(
         '{{title}}',
         'Account Deletion Confirmation'
      );
      htmlTemplate = htmlTemplate.replace(
         '{{subtitle}}',
         'Your account has been successfully deleted'
      );
      htmlTemplate = htmlTemplate.replace(
         '{{message}}',
         `
            <p>We're sorry to see you go. Your account and all associated data have been successfully deleted.</p>
            <p>If you didn't request this deletion, please contact our support team immediately.</p>
            <p>Thank you for being a part of our community.</p>
            `
      );

      const mailOptions = {
         from: emailServer,
         to: email,
         subject: 'Account Deletion Confirmation',
         html: htmlTemplate,
      };

      await transporter.sendMail(mailOptions);
   } catch (error) {
      console.error('Error sending deletion confirmation email:', error);
      // Do NOT throw error here as email sending shouldn't block account deletion
   }
}

export async function DELETE(req: Request) {
   try {
      const body = await req.json();
      const { userId, email } = body;

      if (!userId || !email) {
         return NextResponse.json(
            { message: 'User ID and email are required' },
            { status: 400 }
         );
      }

      // transaction for clearing all user data
      const deletedUser = await prisma.$transaction(async (prisma) => {
         await prisma.password_reset_tokens.deleteMany({
            where: { user_id: userId },
         });

         // Finally, delete the user
         const user = await prisma.users.delete({
            where: { id: userId },
         });

         return user;
      });

      if (!deletedUser) {
         return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      // Send confirmation email
      await sendDeletionConfirmationEmail(email);

      return NextResponse.json(
         { message: 'account successfully deleted from db' },
         { status: 200 }
      );
   } catch (error) {
      console.error('delete account error:', error);
      return NextResponse.json(
         { message: 'Failed to delete account' },
         { status: 500 }
      );
   }
}
