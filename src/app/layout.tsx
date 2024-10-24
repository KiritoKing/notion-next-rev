import "./globals.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import NavBar from "@/components/common/NavBar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ChlorineC's Blog",
  description: "ChlorineC's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-full overflow-x-hidden antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar title="ChlorineC's Blog" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
