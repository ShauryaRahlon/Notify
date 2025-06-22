import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  IconHome,
  IconSettings,
  IconUser,
  IconAward,
} from "@tabler/icons-react";
import React from "react";
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
      <FloatingNav navItems={navItems} />
      {children}
    </>
  );
}
