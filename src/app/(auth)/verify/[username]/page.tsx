"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthCard } from "@/components/ui/auth-card";

const Page = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      setSubmitting(true);
      console.log(data);
      const response = await axios.post(`/api/verify-code`, {
        username: param.username,
        verifyCode: data.code,
      });
      if (response.data.success) {
        toast.success("Verification successful!");
        router.replace("/sign-in");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        toast.error(axiosError.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
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
    form.setValue("code", newOtp.join(""));
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
      title="Verify Your Account"
      subtitle={
        <p className="mb-2 text-base text-muted-foreground font-semibold">
          Please enter the verification code sent to your email.
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={() => (
              <FormItem>
                <FormLabel className="block text-center text-base font-medium text-muted-foreground mb-2">
                  Verification Code
                </FormLabel>
                <div className="flex gap-2 justify-center mb-2 flex-wrap max-w-full overflow-x-auto">
                  {otp.map((digit, idx) => (
                    <Input
                      key={idx}
                      ref={otpRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-10 h-12 md:w-12 text-center text-xl font-bold border border-primary/60 rounded-lg focus:ring-2 focus:ring-primary transition-all bg-background shadow-sm"
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
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default Page;
