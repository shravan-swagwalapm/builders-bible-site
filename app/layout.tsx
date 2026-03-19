import type { Metadata } from "next";
import { dmSans, spaceGrotesk, geistMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { EmailGateProvider } from "@/components/providers/email-gate-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Builder's Bible",
  description:
    "From zero to shipping AI-powered products. 34 chapters, 700+ pages, completely free.",
  openGraph: {
    title: "The Builder's Bible",
    description:
      "From zero to shipping AI-powered products. 34 chapters, 700+ pages, completely free.",
    type: "website",
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
        className={`${dmSans.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <EmailGateProvider>{children}</EmailGateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
