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
            {/* OTP 6-box input */}
            <FormField
              control={form.control}
              name="resetCode"
              render={() => (
                <FormItem>
                  <div className="flex items-center justify-center gap-x-4 mb-2">
                    <FormLabel className="text-center text-sm font-medium text-muted-foreground mb-0 whitespace-nowrap">
                      OTP
                    </FormLabel>
                    <div className="flex gap-2">
                      {otp.map((digit, idx) => (
                        <Input
                          key={idx}
                          ref={otpRefs[idx]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className={`w-10 h-10 text-center text-lg font-bold border border-primary/60 rounded focus:ring-2 focus:ring-primary transition-all bg-background
                            ${digit ? "animate-otp-bounce" : ""} focus:animate-otp-focus`}
                          style={{
                            animationDuration: "0.25s",
                            animationTimingFunction:
                              "cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          autoComplete="one-time-code"
                        />
                      ))}
                    </div>
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

/* Add custom keyframes for animations at the bottom of the file (or in a global CSS if preferred)
If using Tailwind, add these to your globals.css or tailwind config:
@layer utilities {
  @keyframes otp-bounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
  .animate-otp-bounce {
    animation: otp-bounce 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes otp-focus {
    0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.5); }
    100% { box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.2); }
  }
  .focus\:animate-otp-focus:focus {
    animation: otp-focus 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
*/
