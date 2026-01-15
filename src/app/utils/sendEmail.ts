import nodemailer from 'nodemailer';
import { ENV } from '../config/ENV';

export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV.NODE_MAILER.SENDER_EMAIL,
      pass: ENV.NODE_MAILER.SENDER_PASSWORD,
    },
  });

  const htmlTemplate = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #4A90E2; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset Request</h1>
      </div>
      <div style="padding: 30px; color: #333; line-height: 1.6;">
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">We received a request to reset the password for your <strong>Storage Management</strong> account. You can reset your password by clicking the button below:</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #4A90E2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">Reset Password</a>
        </div>

        <p style="font-size: 14px; color: #666;">This link will expire in <strong>15 minutes</strong> for security reasons.</p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">

        <p style="font-size: 13px; color: #999; font-style: italic;">
          <strong>Security Note:</strong> If you did not request a password reset, please ignore this email or contact support if you have concerns. Your password will remain unchanged.
        </p>
      </div>
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #aaa;">
        © 2026 Storage Management System. All rights reserved.
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: '"Storage Management" <support@storage-mgmt.com>',
    to,
    subject: 'Action Required: Reset Your Password',
    text: `Please reset your password using this link: ${resetLink}`,
    html: htmlTemplate,
  });
};
