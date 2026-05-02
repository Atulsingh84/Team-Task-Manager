import axios from "axios";

const MAILTRAP_API_URL = "https://send.api.mailtrap.io/api/send";
const MAILTRAP_API_TOKEN = process.env.MAILTRAP_API_TOKEN;

async function sendMailtrapEmail(to, subject, html) {
  if (!MAILTRAP_API_TOKEN) {
    console.log("ℹ️ MAILTRAP_API_TOKEN not configured - email skipped for:", to);
    return;
  }

  try {
    const response = await axios.post(
      MAILTRAP_API_URL,
      {
        from: {
          email: "hello@demomailtrap.co",
          name: "Project Desk"
        },
        to: [
          {
            email: to
          }
        ],
        subject: subject,
        html: html,
        category: "ProjectDesk"
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    console.log("✅ Email sent successfully to:", to, "| Response ID:", response.data.success);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to send email to:", to);
    console.error("Error message:", error.response?.data?.message || error.message);
    console.error("Error status:", error.response?.status);
    throw error;
  }
}

export async function sendVerificationEmail(user, token) {
  const appUrl = process.env.APP_URL || "http://localhost:5173";
  const verifyUrl = `${appUrl}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #5b3df5 0%, #7c5cef 100%); padding: 40px 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Project Desk</h1>
      </div>

      <div style="background: #f9fafb; padding: 40px 20px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 20px 0; font-size: 16px;">Hi <strong>${user.name}</strong>,</p>

        <p style="margin: 0 0 30px 0; font-size: 15px; color: #6b7280;">
          Thank you for signing up! Please verify your email address to activate your account and get started with managing your projects.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyUrl}" style="display: inline-block; background: #5b3df5; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Verify Email Address
          </a>
        </div>

        <p style="margin: 30px 0 0 0; font-size: 14px; color: #9ca3af;">
          Or copy and paste this link in your browser:
        </p>
        <p style="margin: 10px 0 0 0; font-size: 13px; color: #5b3df5; word-break: break-all;">
          ${verifyUrl}
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">

        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
          This verification link will expire in 1 hour. If you didn't create this account, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  try {
    await sendMailtrapEmail(user.email, "Verify Your Project Desk Account", html);
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
  }
}

export async function sendPasswordResetEmail(user, token) {
  const appUrl = process.env.APP_URL || "http://localhost:5173";
  const resetUrl = `${appUrl}/reset-password?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #5b3df5 0%, #7c5cef 100%); padding: 40px 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
      </div>

      <div style="background: #f9fafb; padding: 40px 20px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 20px 0; font-size: 16px;">Hi <strong>${user.name}</strong>,</p>

        <p style="margin: 0 0 30px 0; font-size: 15px; color: #6b7280;">
          We received a request to reset your password. Click the button below to create a new password.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="display: inline-block; background: #5b3df5; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Reset Password
          </a>
        </div>

        <p style="margin: 30px 0 0 0; font-size: 14px; color: #9ca3af;">
          Or copy and paste this link in your browser:
        </p>
        <p style="margin: 10px 0 0 0; font-size: 13px; color: #5b3df5; word-break: break-all;">
          ${resetUrl}
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">

        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
          This reset link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your account will remain secure.
        </p>
      </div>
    </div>
  `;

  try {
    await sendMailtrapEmail(user.email, "Reset Your Project Desk Password", html);
  } catch (error) {
    console.error("Failed to send password reset email:", error.message);
  }
}
