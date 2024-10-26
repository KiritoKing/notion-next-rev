import "./globals.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

import type { Metadata } from "next";

import NavBar from "@/components/common/NavBar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
      <body className="max-w-full overflow-x-hidden antialiased">
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
