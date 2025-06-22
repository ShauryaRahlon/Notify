"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/magicui/terminal";
import Image from "next/image";
import Link from "next/link";
import DecryptedText from "@/components/ui/DecryptedText";

function FlickeringGridBackground() {
  // Fix: Use absolute and -z-10 so it stays behind everything, including navbar
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <FlickeringGrid
        className="w-full h-full [mask-image:radial-gradient(850px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#fa9f2f"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
    </div>
  );
}

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#f5be23]/10 via-[#fa9f2f]/10 to-[#1a1a1a] overflow-hidden">
      <FlickeringGridBackground />
      {/* Responsive main layout with glassmorphism */}
      <main className="relative z-10 flex flex-1 flex-col md:flex-row items-center justify-center text-center md:text-left px-4 sm:px-8 py-16 md:py-24 w-full max-w-7xl mx-auto gap-12 md:gap-0">
        {/* Left section with glassmorphism card */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left bg-white/10 dark:bg-black/30 rounded-3xl shadow-2xl backdrop-blur-lg border border-white/20 p-6 sm:p-10 md:p-12 max-w-2xl mx-auto animate-fade-in-up">
          <Image
            src="/logo_bg_192.png"
            alt="Notify Logo"
            width={96}
            height={96}
            className="mx-auto md:mx-0 mb-6 drop-shadow-2xl animate-fade-in"
            priority
          />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#f5be23] via-[#fa9f2f] to-[#ff6a00] bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_16px_rgba(250,159,47,0.5)]">
            Notify
          </h1>
          <DecryptedText
            text="Never miss a coding contest again. Track, discover, and get notified about upcoming programming contests from Codeforces, CodeChef, LeetCode, and more. \n\nEffortlessly browse all major contests in one place, set personalized reminders, and stay ahead with real-time updates. Whether you're a beginner or a seasoned coder, Notify helps you focus on what matters—practicing and competing—while we handle the scheduling and notifications for you."
            speed={100}
            maxIterations={20}
            characters="ABCD1234!?"
            className="revealed"
            parentClassName="all-letters m-2"
            encryptedClassName="encrypted"
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center md:justify-start animate-fade-in-up">
            <Link href="/contests" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#fa9f2f] to-[#f5be23] text-black font-semibold shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#fa9f2f]/60">
                View Contests
              </button>
            </Link>
            <Link href="/sign-up" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl border border-[#fa9f2f] text-[#fa9f2f] font-semibold bg-black/70 hover:bg-[#fa9f2f] hover:text-black shadow-xl hover:shadow-2xl active:scale-95 transition-all text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#fa9f2f]/60">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        {/* Right section with modern terminal card */}
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 md:ml-12 w-full max-w-md sm:max-w-lg">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg bg-white/10 dark:bg-black/40 rounded-2xl shadow-xl border border-white/20 backdrop-blur-lg p-4 sm:p-6 animate-fade-in-up">
            <Terminal className="text-left w-full">
              <TypingAnimation>&gt; notify init</TypingAnimation>
              <AnimatedSpan delay={1200} className="text-green-400">
                <span>
                  ✔ Aggregating contests from Codeforces, CodeChef, LeetCode...
                </span>
              </AnimatedSpan>
              <AnimatedSpan delay={2000} className="text-green-400">
                <span>✔ Setting up personalized reminders.</span>
              </AnimatedSpan>
              <AnimatedSpan delay={2600} className="text-green-400">
                <span>✔ Enabling beautiful, responsive UI.</span>
              </AnimatedSpan>
              <TypingAnimation delay={3200} className="text-muted-foreground">
                Success! Welcome to Notify.
              </TypingAnimation>
            </Terminal>
          </div>
        </div>
      </main>
      {/* Footer always at bottom, consistent style, animated heart */}
      <footer className="relative z-10 text-center text-xs sm:text-sm py-4 text-muted-foreground w-full bg-black/10 backdrop-blur-md mt-auto flex flex-col items-center gap-1">
        Made with{" "}
        <span className="text-[#fa9f2f] animate-pulse inline-block">♥</span> by
        <span className="font-semibold text-white/90"> Shaurya Rahlon</span>,
        <span className="font-semibold text-white/90"> Vansh Arora</span>, and
        <span className="font-semibold text-white/90"> Himanshu Singh</span>
      </footer>
    </div>
  );
}
