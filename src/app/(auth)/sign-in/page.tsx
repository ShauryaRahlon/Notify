"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

const Page = () => {
  const [Submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setSubmitting(true);
    const res = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (res?.error) {
      toast.error("Invalid credentials. Please try again.");
    } else {
      toast.success("Successfully signed in!");
    }
    if (res?.url) {
      router.replace("/dashboard");
    }
    setSubmitting(false);
  };

  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      <div
        className={cn(
          "flex flex-col gap-6 w-full max-w-md mx-auto p-6 bg-card border rounded-xl shadow-lg"
        )}
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Image
                    src="/logo_bg.png"
                    alt="Notify Logo"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="sr-only">Notify</span>
              </a>
              <h1 className="text-xl font-bold">Welcome to Notify</h1>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="underline underline-offset-4  text-blue-400"
                >
                  Sign up
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="identifier">Email or Username</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email or username"
                  {...form.register("identifier")}
                  disabled={Submitting}
                  autoComplete="username"
                  required
                />
                {form.formState.errors.identifier && (
                  <span className="text-xs text-destructive">
                    {form.formState.errors.identifier.message as string}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...form.register("password")}
                  disabled={Submitting}
                  autoComplete="current-password"
                  required
                />
                {form.formState.errors.password && (
                  <span className="text-xs text-destructive">
                    {form.formState.errors.password.message as string}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={Submitting}>
                {Submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
        </form>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 mt-2">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
        <div className="text-center text-xs mt-2">
          <Link
            href="/forgot-pass"
            className="underline underline-offset-4 text-blue-400"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
