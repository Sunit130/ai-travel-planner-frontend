import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const recipientEmail = process.env.NEXT_PUBLIC_DEV_EMAIL;

    if (!recipientEmail) {
      return NextResponse.json({ error: "Recipient email not set" }, { status: 500 });
    }

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipientEmail,
      subject: "TravelTales - User Comment",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f8f8;">
          <div style="max-width: 600px; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="border-bottom: 2px solid #007BFF; padding-bottom: 10px;">Contact Us Submission</h2>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="background: #f1f1f1; padding: 10px; border-left: 4px solid #007BFF; margin-top: 15px;">
              <strong>Message:</strong>
              <p>${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
