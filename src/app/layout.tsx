import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  IconHome,
  IconSettings,
  IconUser,
  IconAward,
} from "@tabler/icons-react";
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
            {/* <Navbar /> removed: now only in (pages) layout */}
            <FloatingNav navItems={navItems} />
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

const navItems = [
  {
    name: "Dashboard",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contests",
    link: "/contests",
    icon: <IconAward className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <IconSettings className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
