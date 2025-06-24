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
import { AuthCard } from "@/components/ui/auth-card";

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
      console.error("Error sending reset email:", error);
      toast.error("Something went wrong. Please try again later.");
    }
    setSubmitting(false);
  };

  return (
    <AuthCard
      title="Forgot your password?"
      subtitle={
        <p className="mb-4 text-base text-muted-foreground font-semibold">
          Enter your email and we will send you instructions to reset your
          password.
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
          <Button type="submit" disabled={submitting} className="w-full">
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
