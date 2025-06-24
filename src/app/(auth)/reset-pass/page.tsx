"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState, useRef } from "react";
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
import { AuthCard } from "@/components/ui/auth-card";

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

  // OTP state for 6 digits
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Update OTP state and move focus
  const handleOtpChange = (idx: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    // Move to next input if value entered
    if (value && idx < 5) {
      otpRefs[idx + 1].current?.focus();
    }
    // Update form value
    form.setValue("resetCode", newOtp.join(""));
  };

  // Handle backspace to move focus
  const handleOtpKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
  };

  return (
    <AuthCard
      title="Almost There"
      subtitle={
        <p className="mb-4 text-base text-muted-foreground font-semibold">
          Enter your email and the verification code sent on your email.
        </p>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
          {/* OTP 6-box input */}
          <FormField
            control={form.control}
            name="resetCode"
            render={() => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <div className="flex gap-2 justify-center flex-wrap max-w-full overflow-x-auto mb-2">
                  {otp.map((digit, idx) => (
                    <Input
                      key={idx}
                      ref={otpRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-10 h-10 text-center text-lg font-bold border border-primary/60 rounded focus:ring-2 focus:ring-primary transition-all bg-background"
                      style={{
                        animationDuration: "0.25s",
                        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      autoComplete="one-time-code"
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
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
          <Button type="submit" disabled={submitting} className="w-full">
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
            className="underline underline-offset-4 text-blue-400"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default Page;
