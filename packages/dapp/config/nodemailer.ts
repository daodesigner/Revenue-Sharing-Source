
import nodemailer from 'nodemailer';

export const emailServer = process.env.PROD_SEMAIL;
const password = process.env.PROD_S_APP_PASSWORD;
const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT;

export const transporter = nodemailer.createTransport({
   // @ts-ignore
   host: host, // Use the correct SMTP server
   port: port,
   secure: false, // Set to false for TLS
   auth: {
      user: emailServer, // Your email address
      pass: password, // App-specific password
   },
});

// export const mailOptions = {
//     from: emailServer,
//     to: newemail,
// }
