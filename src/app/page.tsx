import { FlickeringGrid } from "@/components/magicui/flickering-grid";

import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/magicui/terminal";
import Image from "next/image";
import Link from "next/link";

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
     
      <main className="relative z-10 flex flex-1 flex-col md:flex-row items-center justify-center text-center px-4 py-24 w-full max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left">
          <Image
            src="/logo_bg_192.png"
            alt="Notify Logo"
            width={96}
            height={96}
            className="mx-auto md:mx-0 mb-6 drop-shadow-xl animate-fade-in"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#f5be23] via-[#fa9f2f] to-[#ff6a00] bg-clip-text text-transparent animate-gradient-x">
            Notify
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-muted-foreground max-w-2xl animate-fade-in">
            Never miss a coding contest again. Track, discover, and get notified
            about upcoming programming contests from Codeforces, CodeChef,
            LeetCode, and more.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up">
            <Link href="/contests">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#fa9f2f] to-[#f5be23] text-black font-semibold shadow-lg hover:scale-105 transition-transform">
                View Contests
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="px-8 py-3 rounded-lg border border-[#fa9f2f] text-[#fa9f2f] font-semibold bg-black/70 hover:bg-[#fa9f2f] hover:text-black shadow-lg transition-all">
                Get Started
              </button>
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl animate-fade-in-up">
            <div className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2 text-[#fa9f2f]">
                All Contests, One Place
              </h3>
              <p className="text-muted-foreground">
                Aggregates contests from top platforms so you never miss out.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2 text-[#fa9f2f]">
                Personalized Reminders
              </h3>
              <p className="text-muted-foreground">
                Set email reminders and get notified before your favorite
                contests.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2 text-[#fa9f2f]">
                Beautiful & Responsive
              </h3>
              <p className="text-muted-foreground">
                Modern UI, dark/light themes, and PWA support for all devices.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0 md:ml-12 w-full max-w-lg">
          <Terminal className="text-left ">
            <TypingAnimation>&gt; notify init</TypingAnimation>
            <AnimatedSpan delay={1200} className="text-green-500">
              <span>
                ✔ Aggregating contests from Codeforces, CodeChef, LeetCode...
              </span>
            </AnimatedSpan>
            <AnimatedSpan delay={2000} className="text-green-500">
              <span>✔ Setting up personalized reminders.</span>
            </AnimatedSpan>
            <AnimatedSpan delay={2600} className="text-green-500">
              <span>✔ Enabling beautiful, responsive UI.</span>
            </AnimatedSpan>
            <TypingAnimation delay={3200} className="text-muted-foreground">
              Success! Welcome to Notify.
            </TypingAnimation>
          </Terminal>
        </div>
      </main>
      <footer className="relative z-10 text-center py-6 text-muted-foreground text-sm">
        Made with <span className="text-[#fa9f2f]">♥</span> by Shaurya Rahlon,
        Vansh Arora, and Himanshu Singh
      </footer>
    </div>
  );
}
