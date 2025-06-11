import MyEmail from '@/emails/my-email';
import { Resend } from 'resend';

export async function POST() {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'gustavofantinbarros@gmail.com',
    subject: 'Contact Us message from Daisuki!',
    react: MyEmail(),
});
}