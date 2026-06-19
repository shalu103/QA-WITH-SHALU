import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { contactDetails } from "@/lib/contact";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parseResult = contactSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Please complete all fields with a valid email address." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parseResult.data;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailFrom = process.env.EMAIL_FROM ?? `QA With Shalu <${smtpUser ?? "no-reply@example.com"}>`;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.error("SMTP configuration missing:", { smtpHost, smtpPort, smtpUser });
    return NextResponse.json(
      { error: "Email server is not configured. Please contact the administrator." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: smtpPort === "465",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
    rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: emailFrom,
      to: process.env.SMTP_USER, // Send to the configured SMTP user (your email)
      replyTo: email,
      subject: `QA With Shalu contact form: ${subject}`,
      text: `New contact message from ${name} <${email}>:\n\nSubject: ${subject}\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    console.log("Email sent successfully:", info.messageId);
    return NextResponse.json({ message: "Your message has been sent successfully." }, { status: 200 });
  } catch (error: any) {
    console.error("Contact form email error:", error?.message || error);
    console.error("Full error:", error);
    return NextResponse.json(
      { error: `Unable to send message: ${error?.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
