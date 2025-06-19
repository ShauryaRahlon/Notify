"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";

const Page = () => {
  const [Submitting, setSubmitting] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
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
    console.log(res);
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-background p-10">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-2xl border border-primary/40 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Welcome Back to Contest Tracker!
          </h1>
          <p className="mb-4 text-lg text-muted-foreground font-semibold">
            Sign in and never miss a coding contest again. Compete. Track. Win.{" "}
            <span role="img" aria-label="rocket">
              🚀
            </span>
          </p>
        </div>
        <div className="flex justify-end mb-4"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email or username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={Submitting}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              {Submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            New to Contest Tracker?{" "}
            <Link
              href="/sign-up"
              className="text-pink-500 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Can't remember your password?{" "}
            <Link
              href="/forgot-pass"
              className="text-pink-500 font-semibold hover:underline"
            >
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
      {/* Collapsible Features Box */}
      <div className="w-full max-w-md mt-4">
        <button
          onClick={() => setFeaturesOpen((open) => !open)}
          className="flex items-center w-full justify-between px-6 mt-2 bg-card border-x border border-primary/40 rounded-xl shadow-md py-4 animate-fade-in text-foreground font-bold text-lg"
        >
          <span>Features</span>
          <span
            className={`transform transition-transform duration-300 ${
              featuresOpen ? "rotate-90" : "rotate-0"
            }`}
            aria-label={featuresOpen ? "Collapse" : "Expand"}
          >
            ▶
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            featuresOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          } bg-card border-x border border-primary/40 rounded-2xl shadow-md px-6 ${
            featuresOpen ? "py-4 mt-3" : "py-0 mt-0"
          }`}
          style={{ pointerEvents: featuresOpen ? "auto" : "none" }}
        >
          <ul className="space-y-2 text-base mb-6">
            <li className="flex items-center gap-2">
              <span role="img" aria-label="lock">
                🔒
              </span>{" "}
              Passwordless login without captcha
            </li>
            <li className="flex items-center gap-2">
              <span role="img" aria-label="attendance">
                📊
              </span>{" "}
              Real-time Contest Updates
            </li>
            <li className="flex items-center gap-2">
              <span role="img" aria-label="exam">
                📝
              </span>{" "}
              Schedule Reminders
            </li>
            <li className="flex items-center gap-2">
              <span role="img" aria-label="grades">
                📈
              </span>{" "}
              Add contest to google/ios calendar
            </li>
          </ul>
          <div className="mb-2 font-bold text-lg">Installation Guide</div>
          <ul className="text-base space-y-1">
            <li>
              <span className="font-bold">Android:</span> Press menu → Add to
              home screen
            </li>
            <li>
              <span className="font-bold">iOS:</span> Share → Add to home screen
            </li>
            <li>
              <span className="font-bold">Windows:</span> Click install icon in
              URL bar
            </li>
          </ul>
        </div>
      </div>
      <div className="absolute top-10 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Page;
