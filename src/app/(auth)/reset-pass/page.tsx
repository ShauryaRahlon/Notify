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
  resetCode: z.string({ required_error: "OTP is required" }),
  newPassword: z.string({ required_error: "New password is required" }),
});

const Page = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof forgotPassSchema>>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: "",
      resetCode: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPassSchema>) => {
    setSubmitting(true);
    const res = await fetch("/api/reset-pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        resetCode: data.resetCode,
        newPassword: data.newPassword,
      }),
    });
    const result = await res.json();
    setSubmitting(false);
    if (result.success) {
      toast.success(result.message || "Password reset successful");
      router.replace("/sign-in");
    } else {
      toast.error(result.message || "Failed to authenticate");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-10">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-2xl border border-primary/40 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Almost There
          </h1>
          <p className="mb-4 text-lg text-muted-foreground font-semibold">
            Enter your email and the verification code sent on your email.
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
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col justify-center items-start text-sm font-medium text-muted-foreground mb-2 bg-center">
                    OTP
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the OTP sent to your account"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col justify-center items-start text-sm font-medium text-muted-foreground mb-2 bg-center">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
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
                "Reset Password"
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
