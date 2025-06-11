import MyEmail from '@/emails/my-email';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const { fullName, email, phone, message } = await req.json() 

    await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'gustavofantinbarros@gmail.com',
    subject: 'Contact Us message from Daisuki!',
    react: MyEmail({ fullName, email, phone, message }),
});
}