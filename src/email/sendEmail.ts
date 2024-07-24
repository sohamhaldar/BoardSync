import { Resend } from "resend";
import email_template from "@/email/email_template";

interface ApiResponse{
  success:Boolean;
  message:string;
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  otp: string
): Promise<ApiResponse> {
  const resend=new Resend(process.env.RESEND_API_KEY);
  console.log(email);
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'BoardSync Onboarding Verification Code',
      react: email_template({ username, otp }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}