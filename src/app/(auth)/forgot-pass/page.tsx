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
import { ThemeToggle } from "@/components/theme-toggle";

const forgotPassSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const Page = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof forgotPassSchema>>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPassSchema>) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/forgot-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message || "Password reset email sent!");
        router.replace("/reset-pass");
      } else {
        toast.error(result.message || "Failed to send reset email.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-10">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-2xl border border-primary/40 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Forgot your password?
          </h1>
          <p className="mb-4 text-lg text-muted-foreground font-semibold">
            Enter your email and we'll send you instructions to reset your
            password.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col justify-center items-start text-sm font-medium text-muted-foreground mb-2 bg-center">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link
              href="/sign-in"
              className="text-pink-500 font-semibold hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute top-10 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Page;
