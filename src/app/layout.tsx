import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Health Insurance by Daniel",
  description:
    "I'm Daniel — a licensed independent broker helping self-employed professionals and families find better health insurance. Free quotes, no obligation.",
  verification: {
    google: "mfxa2bYZyAXaklYPnZjaWgxoeAexVe5bA3Txq5vPMHg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
