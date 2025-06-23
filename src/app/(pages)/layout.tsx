"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  IconHome,
  IconSettings,
  IconUser,
  IconAward,
} from "@tabler/icons-react";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";


const navItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
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

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      
        <FloatingNav
          navItems={navItems}
          rightItems={
            <>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Log out"
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                className=" h-5 w-5"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          }
        />
        {children}
        <div className="antialiased inset-0 fixed bottom-0 left-0 right-0 -z-50">
          <BackgroundBeams />
        </div>
   
    </>
  );
}
