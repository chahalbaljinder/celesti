import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celesti - Premium Web Development Agency",
  description: "Celesti - Crafting elegant digital experiences with our signature pastel touch. Premium web development and design services for modern businesses.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Celesti - Web Development & Design",
    description: "Elegant digital experiences with our signature pastel aesthetic.",
    images: [
      {
        url: '/celesti-gold-logo.svg',
        width: 160,
        height: 50,
        alt: 'Celesti Logo',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
