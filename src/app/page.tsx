"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShinyButton } from "@/components/magicui/shiny-button";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/magicui/terminal";
import Link from "next/link";
import { BoxReveal } from "@/components/magicui/box-reveal";
import InstallPWAButton from "@/components/PWA";
export default function Page() {
  return (
    <>
      <div className="flex flex-col min-h-screen  md:flex-row items-center justify-around p-6 gap-10">
        <div className="size-full p-4 border max-w-lg items-center justify-center overflow-hidden pt-8 backdrop-blur-sm shadow-sm rounded-2xl ">
          <BoxReveal boxColor={"#f88600"} duration={0.5}>
            <p className="text-[3.5rem] font-semibold">
              Notify<span className="text-[#f88600]">.</span>
            </p>
          </BoxReveal>

          <BoxReveal boxColor={"#f88600"} duration={0.5}>
            <h2 className="mt-[.5rem] text-[1rem]">
              Never miss another contest — built for{" "}
              <span className="text-[#f88600]">CPers</span>
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={"#f88600"} duration={0.5}>
            <div className="mt-6">
              <p>
                -&gt; Stay updated with all major contests from{" "}
                <span className="font-semibold text-[#f88600]">Codeforces</span>
                , <span className="font-semibold text-[#f88600]">LeetCode</span>
                , and{" "}
                <span className="font-semibold text-[#f88600]">CodeChef</span>.{" "}
                <br />
                -&gt; Powered by{" "}
                <span className="font-semibold text-[#f88600]">
                  Next.js
                </span>,{" "}
                <span className="font-semibold text-[#f88600]">TypeScript</span>
                ,{" "}
                <span className="font-semibold text-[#f88600]">
                  Tailwind CSS
                </span>{" "}
                — lightning fast and installable. <br />
              </p>
            </div>
          </BoxReveal>

          <div className="flex  items-center justify-center md:justify-start gap-4">
            <BoxReveal boxColor={"#f88600"} duration={0.5}>
              <Link href="/dashboard">
                <ShinyButton className="mt-[1.6rem] bg-[#f88600] text-black">
                  <span className="text-black">Get Started</span>
                </ShinyButton>
              </Link>
            </BoxReveal>
            <BoxReveal boxColor={"#f88600"} duration={0.5}>
              <InstallPWAButton />
            </BoxReveal>
          </div>
        </div>
        <div className="max-w-2xl w-full md:w-fit">
          <Terminal>
            <TypingAnimation>
              &gt; git clone https://github.com/BoGeYmAn04/Contest-Tracker.git
            </TypingAnimation>
            <AnimatedSpan delay={1200} className="text-green-500">
              <span>✔ Repository cloned.</span>
            </AnimatedSpan>
            <TypingAnimation delay={1800}>&gt; cd Notify</TypingAnimation>
            <TypingAnimation delay={2200}>&gt; npm install</TypingAnimation>
            <AnimatedSpan delay={3000} className="text-green-500">
              <span>✔ Dependencies installed.</span>
            </AnimatedSpan>
            <TypingAnimation delay={3500}>
              &gt; cp .env.sample .env
            </TypingAnimation>
            <AnimatedSpan delay={4000} className="text-green-500">
              <span>✔ Environment file created.</span>
            </AnimatedSpan>
            <TypingAnimation delay={4500}>&gt; npm run dev</TypingAnimation>
            <AnimatedSpan delay={5200} className="text-green-500">
              <span>
                ✔ Development server started at http://localhost:3000
              </span>
            </AnimatedSpan>
            <TypingAnimation delay={6000} className="text-muted-foreground">
              Project is ready! Open in your browser to get started.
            </TypingAnimation>
            <TypingAnimation delay={7000} className="text-blue-500">
              Need Docker? Try:
            </TypingAnimation>
            <TypingAnimation delay={7500}>
              &gt; docker build -t notify-app .
            </TypingAnimation>
            <AnimatedSpan delay={8000} className="text-green-500">
              <span>✔ Docker image built.</span>
            </AnimatedSpan>
            <TypingAnimation delay={8500}>
              &gt; docker run -p 3000:3000 --env-file .env notify-app
            </TypingAnimation>
            <AnimatedSpan delay={9000} className="text-green-500">
              <span>✔ App running in Docker at http://localhost:3000</span>
            </AnimatedSpan>
          </Terminal>
        </div>
        <div className="absolute top-10 right-10">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
