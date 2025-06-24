"use client";

import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";



export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      
       
        {children}
        <div className="antialiased inset-0 fixed bottom-0 left-0 right-0 -z-50">
          <BackgroundBeams />
        </div>
   
    </>
  );
}
