import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Vanguarde Calibre 01 | The Art of Precision",
  description: "Experience the pinnacle of mechanical watchmaking. A digital interactive exploration of the Vanguarde Calibre 01.",
  icons: {
    icon: "/vanguarde-calibre-01/icon.png?v=2",
    apple: "/vanguarde-calibre-01/icon.png?v=2",
  },
};

import ToastContainer from "@/components/ToastContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#FBFBFB] text-[#1A1A1A] antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
