
'use server';

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
      'Skipping email notification. Please check your .env file.'
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
  });

  try {
    await transporter.sendMail({
      from: `Dropbox Draughtsman <${EMAIL_FROM}>`,
      to: to,
      subject: subject,
      html: html,
    });
    console.log('Admin notification email sent successfully to', to);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    // Important: Do not block the user's request if email fails.
    // The main action (e.g., saving data to Firestore) should still succeed.
    return { success: false, message: `Failed to send email: ${error}` };
  }
}
