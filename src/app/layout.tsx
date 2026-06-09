import type { Metadata } from "next";
import { DM_Sans, Lora, Fira_Code } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://qawithshalu.com"
  ),
  title: {
    default: "QA With Shalu — Real QA Lessons from Real Testing Scenarios",
    template: "%s | QA With Shalu",
  },
  description:
    "Helping QA engineers learn through real bugs, practical testing techniques, ISTQB concepts, AI-powered testing insights, and automation journeys.",
  keywords: [
    "QA testing",
    "ISTQB",
    "manual testing",
    "automation testing",
    "Playwright",
    "API testing",
    "QA career",
    "software testing",
  ],
  authors: [{ name: "Shalu Sharma" }],
  creator: "Shalu Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "QA With Shalu",
    title: "QA With Shalu — Real QA Lessons from Real Testing Scenarios",
    description:
      "Helping QA engineers learn through real bugs, practical testing techniques, ISTQB concepts, and automation journeys.",
  },
  twitter: {
    card: "summary_large_image",
    title: "QA With Shalu",
    description:
      "Real QA lessons from a certified QA engineer — bugs, test cases, ISTQB, automation, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${lora.variable} ${firaCode.variable}`}
    >
      <body className="antialiased bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
