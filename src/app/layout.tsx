import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "coWORX – Premium Coworking Space in Global City, Virar West",
  description: "Join coWORX – Premium Coworking Space in Global City, Virar West. 100 Mbps WiFi | Unlimited Coffee | Meeting Room | Power Backup. Work Smart. Grow Together.",
  keywords: ["coWORX", "Coworking Space", "Virar West", "Global City", "Office Space", "Hot Desk", "Private Office"],
  authors: [{ name: "coWORX Team" }],
  openGraph: {
    title: "coWORX – Premium Coworking Space",
    description: "Work Smart. Grow Together. Join coWORX in Global City, Virar West.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "coWORX – Premium Coworking Space",
    description: "Work Smart. Grow Together. Join coWORX in Global City, Virar West.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
