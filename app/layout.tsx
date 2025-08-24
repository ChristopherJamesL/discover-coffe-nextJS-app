import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Coffee Shop Locator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} antialiased`}>
      <body>
        {children}
        <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4">
          © {new Date().getFullYear()} Coffee Connoisseur. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
