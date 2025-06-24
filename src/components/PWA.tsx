"use client";

import { useEffect, useState } from "react";
import { ShinyButton } from "@/components/magicui/shiny-button";
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      console.log("[PWA] beforeinstallprompt event captured");
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log("[PWA] Install prompt not available yet");
      alert("Install prompt not available. Try refreshing or check if PWA is already installed.");
      return;
    }

    console.log("[PWA] Triggering install prompt");
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User responded with: ${outcome}`);

    if (outcome === "accepted") {
      console.log("[PWA] App installed successfully");
    } else {
      console.log("[PWA] User dismissed the install prompt");
    }

    setDeferredPrompt(null);
    setCanInstall(false);
  };

  return (
    <ShinyButton className="mt-[1.6rem] dark:text-white text-black "
   

      
      
      onClick={handleInstall}
      
    
    >
      Install App
   </ShinyButton>
  );
}
