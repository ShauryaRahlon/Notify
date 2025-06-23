import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ContestProvider } from "@/context/ContestProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notify | Coding Contest Notifications",
  description: "Never miss any Coding Contest.",
  manifest: "/manifest.json",
  themeColor: "#f5be23",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Notify",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: "/logo_bg_192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo_bg_512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/logo_bg_192.png", sizes: "192x192", type: "image/png" }],
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
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ContestProvider>
              {/* <Navbar /> removed: now only in (pages) layout */}

              {children}
              <Toaster richColors position="top-right" />
            </ContestProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
