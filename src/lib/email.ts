
'use server';

// Explicitly load environment variables from .env file
// This is crucial for server environments where .env might not be loaded automatically
import 'dotenv/config';
import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Sends an email using Nodemailer.
 * Requires email server credentials to be set in environment variables.
 */
export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const {
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
    EMAIL_FROM,
    EMAIL_FROM_NAME,
  } = process.env;

  // Gracefully handle missing environment variables in production.
  // This prevents the application from crashing if email is not configured.
  if (
    !EMAIL_SERVER_HOST ||
    !EMAIL_SERVER_PORT ||
    !EMAIL_SERVER_USER ||
    !EMAIL_SERVER_PASSWORD ||
    !EMAIL_FROM ||
    !to
  ) {
    console.warn(
      'Email server environment variables are not fully configured. ' +
      'Skipping email notification. Please check your .env file. ' +
      'Required variables: EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM.'
    );
    // We return success=true here to avoid showing an error to the user
    // if the main action (saving to DB) was successful. The email is a
    // secondary, non-critical action in this flow.
    return { success: true, message: "Email server not configured." };
  }
  
  const transporter = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: parseInt(EMAIL_SERVER_PORT, 10),
    secure: parseInt(EMAIL_SERVER_PORT, 10) === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
    // Enable verbose logging to help diagnose connection issues
    logger: true,
    debug: true, 
  });

  try {
    const fromName = EMAIL_FROM_NAME || 'Dropbox Draughtsman';
    const mailOptions = {
        from: `"${fromName}" <${EMAIL_FROM}>`,
        to: to,
        subject: subject,
        html: html,
    };
    
    // The logger option above will provide verbose output to the console
    await transporter.sendMail(mailOptions);

    console.log('[Email Service] Nodemailer transport successful.');
    return { success: true };
  } catch (error) {
    console.error('[Email Service] Failed to send email. Nodemailer error:', error);
    // Important: Do not block the user's request if email fails.
    // The main action (e.g., saving data to Firestore) should still succeed.
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, message: `Failed to send email: ${errorMessage}` };
  }
}
