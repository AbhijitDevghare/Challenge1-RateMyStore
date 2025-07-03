require('dotenv').config();
import { createTransport } from 'nodemailer';

const sendEmail = async (options) => {
  // Create a transporter
  let transporter = createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com", // SMTP server address
    port: process.env.SMTP_PORT || 587, // SMTP server port
    secure: false, // false for STARTTLS (port 587)
    auth: {
      user: process.env.EMAIL_USER , // Your email address
      pass: process.env.EMAIL_PASS  // Your email password or API key
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Set up email options
  let mailOptions = {
    from: "kishordevghare6@gmail.com", // Sender address
    to: options.to, // List of recipients
    subject: options.subject, // Subject line
    text: options.text, // Plain text body
    html: options.html // HTML body
  };

  // Send the email
  return transporter.sendMail(mailOptions);
};

export default sendEmail;
