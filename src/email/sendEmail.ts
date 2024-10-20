import { Resend } from "resend";
import { render } from '@react-email/components';
import email_template from "@/email/email_template";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import postmark from 'postmark';

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
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || '',
  });

  const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY||'');


  const recipients = [new Recipient(email, username)];
  const sentFrom = new Sender(process.env.MAILERSEND_EMAIL_DOMAIN||'', "BoardSync");
  
  const emailTemplate=render(email_template({ username, otp }),{
    pretty:true
  })
  try {
    // const emailParams = new EmailParams()
    //       // .setFrom(sentFrom)
    //       .setTo(recipients)
    //       .setSubject("BoardSync Onboarding Verification Code")
    //       .setHtml(emailTemplate)

    // mailerSend.email.send(emailParams);

    // const options = {
    //   From: 'you@example.com',
    //   To: email,
    //   Subject: "BoardSync Onboarding Verification Code",
    //   HtmlBody: emailTemplate,
    // };
    
    // await client.sendEmail(options);
    await resend.emails.send({
      from: 'BoardSync <onboarding@resend.dev>',
      to: email,
      subject: "BoardSync Onboarding Verification Code",
      html: emailTemplate,
    });


    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}