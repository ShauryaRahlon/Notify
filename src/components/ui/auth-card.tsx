import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  logoSrc?: string;
  children: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export function AuthCard({
  title,
  logoSrc = "/logo_bg.png",
  children,
  subtitle,
  className,
}: AuthCardProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      <div
        className={cn(
          "flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-card border rounded-xl shadow-lg",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Image src={logoSrc} alt="Logo" width={32} height={32} />
            </div>
            <span className="sr-only">Notify</span>
          </a>
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <div className="text-center text-sm">{subtitle}</div>}
        </div>
        {children}
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 mt-2">
          By clicking continue, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}
